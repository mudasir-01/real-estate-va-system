import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { supabase } from "../lib/supabase.js";

const router = express.Router();

router.use(adminAuth);

function mapOrder(order) {
  return {
    _id: order.id,
    id: order.id,
    orderNumber: order.order_number,
    name: order.name,
    email: order.email,
    whatsapp: order.whatsapp,
    country: order.country,
    stateProvince: order.state_province,
    city: order.city,
    postalCode: order.postal_code,
    propertyType: order.property_type,
    service: order.service,
    quantity: order.quantity,
    estimatedPrice: order.estimated_price,
    additionalRequirements:
      order.additional_requirements,
    paymentStatus: order.payment_status,
    status: order.status,
    notes: order.notes,
    createdAt: order.created_at,
  };
}

router.get("/orders", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    res.json((data || []).map(mapOrder));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch(
  "/orders/:id/status",
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowed = [
        "New Order",
        "Client Discussion",
        "Payment Pending",
        "Paid",
        "In Progress",
        "Delivered",
        "Completed",
        "Follow-Up",
        "Cancelled",
      ];

      if (!allowed.includes(status)) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", req.params.id)
        .select()
        .single();

      if (error) throw error;

      res.json(mapOrder(data));
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get("/stats", async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const startISO = start.toISOString();

    const [
      pageViews,
      whatsappClicks,
      ordersResult,
    ] = await Promise.all([
      supabase
        .from("analytics_events")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("type", "page_view")
        .gte("created_at", startISO),

      supabase
        .from("analytics_events")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("type", "whatsapp_click")
        .gte("created_at", startISO),

      supabase
        .from("orders")
        .select(
          "id,status,estimated_price"
        ),
    ]);

    if (ordersResult.error) {
      throw ordersResult.error;
    }

    const orders = ordersResult.data || [];

    const newOrders = orders.filter(
      (o) => o.status === "New Order"
    ).length;

    const pendingOrders = orders.filter((o) =>
      [
        "New Order",
        "Client Discussion",
        "Payment Pending",
        "Follow-Up",
      ].includes(o.status)
    ).length;

    const completedOrders = orders.filter(
      (o) => o.status === "Completed"
    ).length;

    const activeOrders = orders.filter(
      (o) => o.status !== "Cancelled"
    );

    const estimatedOrderValue =
      activeOrders.reduce(
        (total, order) =>
          total +
          Number(order.estimated_price || 0),
        0
      );

    res.json({
      visitorsToday: pageViews.count || 0,
      pageViewsToday: pageViews.count || 0,
      whatsappClicksToday:
        whatsappClicks.count || 0,
      newOrders,
      pendingOrders,
      completedOrders,
      totalOrders: orders.length,
      estimatedOrderValue,
    });
  } catch (error) {
    console.error("Stats error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;