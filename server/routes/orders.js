import express from "express";
import { supabase } from "../lib/supabase.js";

const router = express.Router();

function calculatePrice(service, quantity, addColdCalling = false) {
  const q = Number(quantity);

  if (service === "Lead Generation + Skip Tracing") {
    const leadsPrice = Math.ceil(q / 100) * 20;

    const callingPrice = addColdCalling
      ? Math.ceil(q / 100) * 30
      : 0;

    return leadsPrice + callingPrice;

  }

  if (service === "Cold Calling") {
    return Math.ceil(q / 100) * 30;
  }

  if (service === "Qualified Appointment Setting") {
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
        message: "Please complete all required fields.",
      });
    }

   const estimatedPrice = calculatePrice(
  service,
  quantity,
  addColdCalling
);

    const orderNumber = `RE-${Date.now()
      .toString()
      .slice(-8)}`;

    const { data, error } = await supabase
  .from("orders")
  .insert([
    {
      order_number: orderNumber,
      name,
      email,
      whatsapp,
      country,
      state_province: stateProvince,
      city,
      postal_code: postalCode,
      property_type: propertyType,
      service,
      quantity: Number(quantity),

      add_cold_calling: Boolean(addColdCalling),

      estimated_price: estimatedPrice,
      additional_requirements: additionalRequirements || "",
      payment_status: "Not Discussed",
      status: "New Order",
    },
  ])
  .select()
  .single();
    if (error) {
      throw error;
    }

    res.status(201).json({
      message: "Order created successfully.",
      order: {
        id: data.id,
        orderNumber: data.order_number,
        status: data.status,
        estimatedPrice: data.estimated_price,
      },
    });
  } catch (error) {
    console.error("Order error:", error);

    res.status(500).json({
      message: "Could not create order.",
      detail: error.message,
    });
  }
});

export default router;