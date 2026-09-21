import React from "react";
import { useMemo, useState } from "react";
import TrackPageView from "../components/TrackPageView";

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
  additionalRequirements: ""
};

export default function Order() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const api = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const wa = import.meta.env.VITE_WHATSAPP_NUMBER || "";

  const locationLabels = useMemo(() => {
    if (form.country === "Canada") return { region: "Province", postal: "Postal Code" };
    return { region: "State", postal: "ZIP Code" };
  }, [form.country]);

  const estimate = useMemo(() => {
  const q = Number(form.quantity) || 0;

  if (form.service === "Lead Generation + Skip Tracing") {
    const leadsPrice = Math.ceil(q / 100) * 20;
    const callingPrice = form.addColdCalling
      ? Math.ceil(q / 100) * 30
      : 0;

    return leadsPrice + callingPrice;
  }

  if (form.service === "Cold Calling") {
    return Math.ceil(q / 100) * 30;
  }

  if (form.service === "Qualified Appointment Setting") {
    return q * 50;
  }

  return 0;
}, [form.quantity, form.service, form.addColdCalling]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${api}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estimatedPrice: estimate })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");
      setResult(data);

      fetch(`${api}/analytics/event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "order_submit", page: "/order", meta: { orderNumber: data.order.orderNumber } })
      }).catch(() => {});

     const coldCallingText =
  form.service === "Lead Generation + Skip Tracing"
    ? form.addColdCalling
      ? "Yes - Included"
      : "No"
    : "N/A";

const msg = `Hi Mudasir, I have placed ${data.order.orderNumber} on your website.

Service: ${form.service}
Quantity: ${form.quantity}
Cold Calling Add-on: ${coldCallingText}
Target: ${form.city}, ${form.stateProvince}, ${form.postalCode}, ${form.country}
Property Type: ${form.propertyType}
Estimated Total: $${estimate}

I would like to discuss the campaign and payment method.`;
      if (wa) {
        setTimeout(() => window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, "_blank"), 400);
      }
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section container page-top">
      <TrackPageView page="/order" />
      <div className="section-head">
        <span className="eyebrow">Order request</span>
        <h1>Tell us exactly where and what you want to target.</h1>
        <p>Your order is reviewed before payment. After submission, WhatsApp opens with your order summary.</p>
      </div>

      <div className="order-layout">
        <form className="form-card" onSubmit={submit}>
          <div className="form-grid two">
            <label>Full Name*
              <input name="name" value={form.name} onChange={update} required />
            </label>
            <label>Email*
              <input type="email" name="email" value={form.email} onChange={update} required />
            </label>
            <label>WhatsApp Number*
              <input name="whatsapp" value={form.whatsapp} onChange={update} placeholder="+1..." required />
            </label>
            <label>Country*
              <select name="country" value={form.country} onChange={update} required>
                <option>USA</option>
                <option>Canada</option>
              </select>
            </label>
            <label>{locationLabels.region}*
              <input name="stateProvince" value={form.stateProvince} onChange={update} required />
            </label>
            <label>City*
              <input name="city" value={form.city} onChange={update} required />
            </label>
            <label>{locationLabels.postal}*
              <input name="postalCode" value={form.postalCode} onChange={update} required />
            </label>
            <label>Property Type / Niche*
              <select name="propertyType" value={form.propertyType} onChange={update} required>
                <option value="">Select</option>
                <option>Single-Family</option>
                <option>Multifamily</option>
                <option>Mobile Home Parks</option>
                <option>RV Parks</option>
                <option>Self-Storage</option>
                <option>Vacant Land</option>
                <option>Commercial</option>
                <option>Hotels / Motels</option>
                <option>Retail</option>
                <option>Industrial / Warehouse</option>
                <option>Other</option>
              </select>
            </label>
            <label>Service*
              <select name="service" value={form.service} onChange={update} required>
                <option>Lead Generation + Skip Tracing</option>
                <option>Cold Calling</option>
                <option>Qualified Appointment Setting</option>
              </select>
            </label>
            <label>{form.service === "Qualified Appointment Setting" ? "Number of Appointments*" : "Quantity*"}
              <input min="1" type="number" name="quantity" value={form.quantity} onChange={update} required />
            </label>
          </div>

          {form.service === "Lead Generation + Skip Tracing" && (
  <label className="checkbox-option">
    <input
      type="checkbox"
      checked={form.addColdCalling}
      onChange={(e) =>
        setForm({
          ...form,
          addColdCalling: e.target.checked,
        })
      }
    />

    <span>
      <strong>Add Cold Calling</strong>
      <br />
      +$30 per 100 leads/calls
    </span>
  </label>
)}

          <label>Additional Requirements
            <textarea name="additionalRequirements" value={form.additionalRequirements} onChange={update} rows="5" placeholder="Example: absentee owners, 80+ units, specific asset criteria, seller type, exclusions, etc." />
          </label>

          <div className="estimate">
            <span>Estimated starting total</span>
            <strong>${estimate}</strong>
          </div>
          <p className="small">Final scope is confirmed after review. Larger or unusual campaigns may receive a custom quote.</p>

          <button className="btn btn-full" disabled={loading}>{loading ? "Submitting..." : "Place Order & Continue to WhatsApp"}</button>

          {result?.order && <div className="success">Order created: <strong>{result.order.orderNumber}</strong>. WhatsApp should open automatically.</div>}
          {result?.error && <div className="error">{result.error}</div>}
        </form>

        <aside className="side-card">
          <h3>What happens next?</h3>
          <ol>
            <li>You submit the campaign details.</li>
            <li>The order appears in the admin dashboard.</li>
            <li>WhatsApp opens with your order summary.</li>
            <li>Scope and payment method are discussed.</li>
            <li>After payment confirmation, work starts.</li>
          </ol>
          <div className="notice compact">
            Payment can be discussed based on the client's preferred workable method. Raw card details should never be sent through WhatsApp.
          </div>
        </aside>
      </div>
    </main>
  );
}
