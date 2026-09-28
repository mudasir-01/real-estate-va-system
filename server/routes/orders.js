import express from "express";
import { supabase } from "../lib/supabase.js";

const router = express.Router();

const allowedCountries = [
  "USA",
  "Canada",
  "UK",
];

const allowedServices = [
  "Lead Generation + Skip Tracing",
  "Cold Calling",
  "Qualified Appointment Setting",
];

function calculatePrice(
  service,
  quantity,
  addColdCalling = false
) {
  const q = Number(quantity);

  // Lead Generation
  if (
    service ===
    "Lead Generation + Skip Tracing"
  ) {
    const leadsPrice =
      (q / 100) * 20;

    const callingPrice =
      addColdCalling
        ? (q / 100) * 30
        : 0;

    return Math.round(
      (leadsPrice + callingPrice) * 100
    ) / 100;
  }

  // Cold Calling
  if (service === "Cold Calling") {
    return Math.round(
      ((q / 100) * 30) * 100
    ) / 100;
  }

  // Appointment Setting
  if (
    service ===
    "Qualified Appointment Setting"
  ) {
    return q * 50;
  }

  return 0;
}

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      whatsapp,
      country,
      stateProvince,
      city,
      postalCode,
      propertyType,
      service,
      quantity,
      addColdCalling,
      additionalRequirements,
    } = req.body;

    // --------------------------------
    // REQUIRED FIELDS
    // --------------------------------

    if (
      !name ||
      !email ||
      !whatsapp ||
      !country ||
      !stateProvince ||
      !city ||
      !postalCode ||
      !propertyType ||
      !service ||
      !quantity
    ) {
      return res.status(400).json({
        message:
          "Please complete all required fields.",
      });
    }

    // --------------------------------
    // COUNTRY VALIDATION
    // --------------------------------

    if (
      !allowedCountries.includes(country)
    ) {
      return res.status(400).json({
        message:
          "Please select a valid target country.",
      });
    }

    // --------------------------------
    // SERVICE VALIDATION
    // --------------------------------

    if (
      !allowedServices.includes(service)
    ) {
      return res.status(400).json({
        message:
          "Please select a valid service.",
      });
    }

    // --------------------------------
    // WHATSAPP VALIDATION
    // E.164 format
    // +17065551234
    // +447911123456
    // +923001234567
    // --------------------------------

    const whatsappRegex =
      /^\+[1-9]\d{7,14}$/;

    if (
      !whatsappRegex.test(
        String(whatsapp).trim()
      )
    ) {
      return res.status(400).json({
        message:
          "Please enter a valid WhatsApp number with country code.",
      });
    }

    // --------------------------------
    // QUANTITY VALIDATION
    // --------------------------------

    const q = Number(quantity);

    if (
      !Number.isInteger(q) ||
      q < 1
    ) {
      return res.status(400).json({
        message:
          "Please enter a valid quantity.",
      });
    }

    // Lead Generation
    // Minimum 100
    // 100, 150, 275, 500 etc allowed
    if (
      service ===
        "Lead Generation + Skip Tracing" &&
      q < 100
    ) {
      return res.status(400).json({
        message:
          "Lead Generation requires at least 100 leads.",
      });
    }

    // Cold Calling
    // Minimum 100
    // 100, 150, 275, 500 etc allowed
    if (
      service === "Cold Calling" &&
      q < 100
    ) {
      return res.status(400).json({
        message:
          "Cold Calling requires at least 100 calls.",
      });
    }

    // Appointment Setting
    if (
      service ===
        "Qualified Appointment Setting" &&
      q < 1
    ) {
      return res.status(400).json({
        message:
          "At least 1 appointment is required.",
      });
    }

    // --------------------------------
    // COLD CALLING ADD-ON
    // Only available with Lead Generation
    // --------------------------------

    const coldCallingAddon =
      service ===
      "Lead Generation + Skip Tracing"
        ? Boolean(addColdCalling)
        : false;

    // --------------------------------
    // PRICE CALCULATION
    // --------------------------------

    const estimatedPrice =
      calculatePrice(
        service,
        q,
        coldCallingAddon
      );

    // --------------------------------
    // ORDER NUMBER
    // --------------------------------

    const orderNumber =
      `RE-${Date.now()
        .toString()
        .slice(-8)}`;

    // --------------------------------
    // SAVE TO SUPABASE
    // --------------------------------

    const { data, error } =
      await supabase
        .from("orders")
        .insert([
          {
            order_number:
              orderNumber,

            name:
              String(name).trim(),

            email:
              String(email)
                .trim()
                .toLowerCase(),

            whatsapp:
              String(whatsapp).trim(),

            country,

            state_province:
              String(
                stateProvince
              ).trim(),

            city:
              String(city).trim(),

            postal_code:
              String(
                postalCode
              ).trim(),

            property_type:
              propertyType,

            service,

            quantity: q,

            add_cold_calling:
              coldCallingAddon,

            estimated_price:
              estimatedPrice,

            additional_requirements:
              additionalRequirements
                ? String(
                    additionalRequirements
                  ).trim()
                : "",

            payment_status:
              "Not Discussed",

            status:
              "New Order",
          },
        ])
        .select()
        .single();

    if (error) {
      throw error;
    }

    // --------------------------------
    // SUCCESS
    // --------------------------------

    return res.status(201).json({
      message:
        "Order created successfully.",

      order: {
        id: data.id,

        orderNumber:
          data.order_number,

        status:
          data.status,

        estimatedPrice:
          data.estimated_price,
      },
    });

  } catch (error) {
    console.error(
      "Order error:",
      error
    );

    return res.status(500).json({
      message:
        "Could not create order.",

      detail:
        error.message,
    });
  }
});

export default router;