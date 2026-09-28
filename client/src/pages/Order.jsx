import React, { useMemo, useState } from "react";

import PhoneInput, {
  isValidPhoneNumber,
} from "react-phone-number-input";

import "react-phone-number-input/style.css";

import TrackPageView from "../components/TrackPageView";
import { trackEvent } from "../lib/analytics";

const PACKAGE_QUANTITIES = [
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000,
  1500,
  2000,
  2500,
  3000,
  4000,
  5000,
];

const initial = {
  name: "",
  email: "",
  whatsapp: "",

  country: "USA",
  stateProvince: "",
  city: "",
  postalCode: "",

  propertyType: "",
  service: "Lead Generation + Skip Tracing",

  quantity: 100,

  addColdCalling: false,

  additionalRequirements: "",
};

export default function Order() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const api =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  const wa =
    import.meta.env.VITE_WHATSAPP_NUMBER || "";

  // ---------------------------------
  // LOCATION LABELS
  // ---------------------------------

  const locationLabels = useMemo(() => {
    if (form.country === "Canada") {
      return {
        region: "Province",
        city: "City",
        postal: "Postal Code",

        regionPlaceholder: "Ontario",
        cityPlaceholder: "Toronto",
        postalPlaceholder: "M5V 3A8",
      };
    }

    if (form.country === "UK") {
      return {
        region: "County / Region",
        city: "City / Town",
        postal: "Postcode",

        regionPlaceholder: "Greater London",
        cityPlaceholder: "London",
        postalPlaceholder: "SW1A 1AA",
      };
    }

    return {
      region: "State",
      city: "City",
      postal: "ZIP Code",

      regionPlaceholder: "Texas",
      cityPlaceholder: "Dallas",
      postalPlaceholder: "75201",
    };
  }, [form.country]);

  // ---------------------------------
  // PRICE CALCULATION
  // ---------------------------------

  const estimate = useMemo(() => {
    const q = Number(form.quantity) || 0;

    if (
      form.service ===
      "Lead Generation + Skip Tracing"
    ) {
      const leadsPrice =
        (q / 100) * 20;

      const callingPrice =
        form.addColdCalling
          ? (q / 100) * 30
          : 0;

      return leadsPrice + callingPrice;
    }

    if (form.service === "Cold Calling") {
      return (q / 100) * 30;
    }

    if (
      form.service ===
      "Qualified Appointment Setting"
    ) {
      return q * 50;
    }

    return 0;
  }, [
    form.quantity,
    form.service,
    form.addColdCalling,
  ]);

  // ---------------------------------
  // NORMAL INPUT
  // ---------------------------------

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---------------------------------
  // COUNTRY CHANGE
  // ---------------------------------

  const changeCountry = (e) => {
    setForm((prev) => ({
      ...prev,

      country: e.target.value,

      stateProvince: "",
      city: "",
      postalCode: "",
    }));
  };

  // ---------------------------------
  // SERVICE CHANGE
  // ---------------------------------

  const changeService = (e) => {
    const service = e.target.value;

    setForm((prev) => ({
      ...prev,

      service,

      quantity:
        service ===
        "Qualified Appointment Setting"
          ? 1
          : 100,

      addColdCalling:
        service ===
        "Lead Generation + Skip Tracing"
          ? prev.addColdCalling
          : false,
    }));
  };

  // ---------------------------------
  // SUBMIT
  // ---------------------------------

  const submit = async (e) => {
    e.preventDefault();

    setResult(null);

    // WhatsApp validation
    if (
      !form.whatsapp ||
      !isValidPhoneNumber(form.whatsapp)
    ) {
      setResult({
        error:
          "Please enter a valid WhatsApp number with country code.",
      });

      return;
    }

    const q = Number(form.quantity);

    // Leads / Calls packages
    if (
      form.service !==
      "Qualified Appointment Setting"
    ) {
      if (
        q < 100 ||
        q % 100 !== 0
      ) {
        setResult({
          error:
            "Lead Generation and Cold Calling start from 100 and are available in packages of 100.",
        });

        return;
      }
    }

    // Appointment validation
    if (
      form.service ===
        "Qualified Appointment Setting" &&
      q < 1
    ) {
      setResult({
        error:
          "Please select at least 1 appointment.",
      });

      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${api}/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...form,
            estimatedPrice: estimate,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Order failed"
        );
      }

      setResult(data);

      // Track order
      trackEvent(
        "order_submit",
        "/order",
        {
          orderNumber:
            data.order.orderNumber,

          service:
            form.service,

          estimatedPrice:
            estimate,
        }
      );

      const coldCallingText =
        form.service ===
        "Lead Generation + Skip Tracing"
          ? form.addColdCalling
            ? "Yes - Included"
            : "No"
          : "N/A";

      const quantityLabel =
        form.service ===
        "Qualified Appointment Setting"
          ? "Appointments"
          : form.service ===
              "Cold Calling"
            ? "Calls"
            : "Leads";

      const msg = `Hi Mudasir, I have placed ${data.order.orderNumber} on your website.

Service: ${form.service}
${quantityLabel}: ${form.quantity}
Cold Calling Add-on: ${coldCallingText}

Target Market:
Country: ${form.country}
${locationLabels.region}: ${form.stateProvince}
${locationLabels.city}: ${form.city}
${locationLabels.postal}: ${form.postalCode}

Property Type: ${form.propertyType}

Estimated Total: $${estimate}

I would like to discuss the campaign and payment method.`;

      if (wa) {
        trackEvent(
          "whatsapp_click",
          "/order",
          {
            source:
              "order_submission",
          }
        );

        setTimeout(() => {
          window.open(
            `https://wa.me/${wa}?text=${encodeURIComponent(
              msg
            )}`,
            "_blank"
          );
        }, 400);
      }
    } catch (err) {
      setResult({
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section container page-top">

      <TrackPageView />

      <div className="section-head">

        <span className="eyebrow">
          Order request
        </span>

        <h1>
          Tell us exactly where and what
          you want to target.
        </h1>

        <p>
          Your order is reviewed before
          payment. After submission,
          WhatsApp opens with your order
          summary.
        </p>

      </div>

      <div className="order-layout">

        <form
          className="form-card"
          onSubmit={submit}
        >

          <div className="form-grid two">

            {/* NAME */}

            <label>
              Full Name*

              <input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Enter your full name"
                required
              />
            </label>

            {/* EMAIL */}

            <label>
              Email*

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                placeholder="Enter your email address"
                required
              />
            </label>

            {/* WHATSAPP */}

            <label>
              WhatsApp Number*

              <PhoneInput
                international
                defaultCountry="US"

                value={form.whatsapp}

                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,

                    whatsapp:
                      value || "",
                  }))
                }

                placeholder="Enter WhatsApp number"
              />

              <small>
                Select your country code
                and enter your active
                WhatsApp number.
              </small>
            </label>

            {/* COUNTRY */}

            <label>
              Target Country*

              <select
                name="country"
                value={form.country}
                onChange={changeCountry}
                required
              >
                <option value="USA">
                  United States
                </option>

                <option value="Canada">
                  Canada
                </option>

                <option value="UK">
                  United Kingdom
                </option>
              </select>
            </label>

            {/* REGION */}

            <label>
              {locationLabels.region}*

              <input
                name="stateProvince"
                value={form.stateProvince}
                onChange={update}
                placeholder={
                  locationLabels.regionPlaceholder
                }
                required
              />
            </label>

            {/* CITY */}

            <label>
              {locationLabels.city}*

              <input
                name="city"
                value={form.city}
                onChange={update}
                placeholder={
                  locationLabels.cityPlaceholder
                }
                required
              />
            </label>

            {/* POSTAL */}

            <label>
              {locationLabels.postal}*

              <input
                name="postalCode"
                value={form.postalCode}
                onChange={update}
                placeholder={
                  locationLabels.postalPlaceholder
                }
                required
              />
            </label>

            {/* PROPERTY */}

            <label>
              Property Type / Niche*

              <select
                name="propertyType"
                value={form.propertyType}
                onChange={update}
                required
              >
                <option value="">
                  Select
                </option>

                <option>
                  Single-Family
                </option>

                <option>
                  Multifamily
                </option>

                <option>
                  Mobile Home Parks
                </option>

                <option>
                  RV Parks
                </option>

                <option>
                  Self-Storage
                </option>

                <option>
                  Vacant Land
                </option>

                <option>
                  Commercial
                </option>

                <option>
                  Hotels / Motels
                </option>

                <option>
                  Retail
                </option>

                <option>
                  Industrial / Warehouse
                </option>

                <option>
                  Other
                </option>
              </select>
            </label>

            {/* SERVICE */}

            <label>
              Service*

              <select
                name="service"
                value={form.service}
                onChange={changeService}
                required
              >
                <option>
                  Lead Generation + Skip Tracing
                </option>

                <option>
                  Cold Calling
                </option>

                <option>
                  Qualified Appointment Setting
                </option>
              </select>
            </label>

            {/* QUANTITY */}

            <label>

              {form.service ===
              "Qualified Appointment Setting"
                ? "Number of Appointments*"
                : form.service ===
                    "Cold Calling"
                  ? "Number of Calls*"
                  : "Number of Leads*"}

              {form.service ===
              "Qualified Appointment Setting" ? (

                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  min="1"
                  step="1"
                  onChange={update}
                  required
                />

              ) : (

                <select
                  name="quantity"
                  value={form.quantity}
                  onChange={update}
                  required
                >

                  {PACKAGE_QUANTITIES.map(
                    (qty) => (

                      <option
                        key={qty}
                        value={qty}
                      >
                        {qty.toLocaleString()}
                      </option>

                    )
                  )}

                </select>

              )}

            </label>

          </div>

          {/* COLD CALLING ADD-ON */}

          {form.service ===
            "Lead Generation + Skip Tracing" && (

            <label className="checkbox-option">

              <input
                type="checkbox"

                checked={
                  form.addColdCalling
                }

                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,

                    addColdCalling:
                      e.target.checked,
                  }))
                }
              />

              <span>

                <strong>
                  Add Cold Calling
                </strong>

                <br />

                +$30 per 100 leads/calls

              </span>

            </label>

          )}

          {/* REQUIREMENTS */}

          <label>
            Additional Requirements

            <textarea
              name="additionalRequirements"

              value={
                form.additionalRequirements
              }

              onChange={update}

              rows="5"

              placeholder="Example: absentee owners, 80+ units, specific asset criteria, seller type, exclusions, target counties, etc."
            />
          </label>

          {/* PRICE */}

          <div className="estimate">

            <span>
              Estimated starting total
            </span>

            <strong>
              ${estimate}
            </strong>

          </div>

          <p className="small">
            Final scope is confirmed after
            review. Larger or unusual
            campaigns may receive a custom
            quote.
          </p>

          {/* SUBMIT */}

          <button
            className="btn btn-full"
            disabled={loading}
          >

            {loading
              ? "Submitting..."
              : "Place Order & Continue to WhatsApp"}

          </button>

         {result?.order && (
  <div className="order-success-card">

    <div className="success-icon">
      ✓
    </div>

    <div>
      <span className="eyebrow">
        Order Submitted Successfully
      </span>

      <h3>
        Your campaign request has been received.
      </h3>

      <p>
        Your order is waiting for review.
        Continue on WhatsApp to confirm the
        campaign details and payment method.
      </p>
    </div>

    <div className="success-details">

      <div>
        <span>Order Number</span>
        <strong>
          {result.order.orderNumber}
        </strong>
      </div>

      <div>
        <span>Service</span>
        <strong>
          {form.service}
        </strong>
      </div>

      <div>
        <span>
          {form.service ===
          "Qualified Appointment Setting"
            ? "Appointments"
            : form.service ===
                "Cold Calling"
              ? "Calls"
              : "Leads"}
        </span>

        <strong>
          {form.quantity}
        </strong>
      </div>

      <div>
        <span>Estimated Total</span>
        <strong>
          ${estimate}
        </strong>
      </div>

      <div>
        <span>Status</span>
        <strong>
          Awaiting Discussion
        </strong>
      </div>

    </div>

    <p className="small">
      WhatsApp should open automatically.
      If it does not open, use the WhatsApp
      button on the website.
    </p>

  </div>
)}

          {result?.error && (

            <div className="error">
              {result.error}
            </div>

          )}

        </form>

        {/* SIDE CARD */}

        <aside className="side-card">

          <h3>
            What happens next?
          </h3>

          <ol>

            <li>
              You submit your campaign
              details.
            </li>

            <li>
              Your request is reviewed.
            </li>

            <li>
              WhatsApp opens with your
              order summary.
            </li>

            <li>
              Scope and payment method
              are confirmed.
            </li>

            <li>
              Work starts after payment
              confirmation.
            </li>

          </ol>

          <div className="notice compact">

            Payment is discussed based on
            the client's preferred workable
            method. Never send raw credit or
            debit card details through
            WhatsApp.

          </div>

        </aside>

      </div>

    </main>
  );
}