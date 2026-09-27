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
    additionalRequirements: order.additional_requirements,
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

router.patch("/orders/:id/status", async (req, res) => {
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
});

router.get("/stats", async (req, res) => {
  try {
    // Start of today
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const startISO = start.toISOString();

    const [
      pageViewsResult,
      whatsappClicksResult,
      ordersResult,
    ] = await Promise.all([
      // Get today's page views + visitor IDs
      supabase
        .from("analytics_events")
        .select("id, visitor_id", {
          count: "exact",
        })
        .eq("type", "page_view")
        .gte("created_at", startISO),

      // Count today's WhatsApp clicks
      supabase
        .from("analytics_events")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("type", "whatsapp_click")
        .gte("created_at", startISO),

      // Get orders
      supabase
        .from("orders")
        .select("id,status,estimated_price"),
    ]);

    if (pageViewsResult.error) {
      throw pageViewsResult.error;
    }

    if (whatsappClicksResult.error) {
      throw whatsappClicksResult.error;
    }

    if (ordersResult.error) {
      throw ordersResult.error;
    }

    // ------------------------------
    // REAL UNIQUE VISITORS
    // ------------------------------

    const pageViewEvents =
      pageViewsResult.data || [];

    const uniqueVisitorIds = new Set(
      pageViewEvents
        .map((event) => event.visitor_id)
        .filter(
          (visitorId) =>
            visitorId &&
            visitorId.trim() !== ""
        )
    );

    const visitorsToday =
      uniqueVisitorIds.size;

    const pageViewsToday =
      pageViewsResult.count || 0;

    const whatsappClicksToday =
      whatsappClicksResult.count || 0;

    // ------------------------------
    // ORDER STATS
    // ------------------------------

    const orders =
      ordersResult.data || [];

    const newOrders = orders.filter(
      (order) =>
        order.status === "New Order"
    ).length;

    const pendingOrders =
      orders.filter((order) =>
        [
          "New Order",
          "Client Discussion",
          "Payment Pending",
          "Follow-Up",
        ].includes(order.status)
      ).length;

    const completedOrders =
      orders.filter(
        (order) =>
          order.status === "Completed"
      ).length;

    const activeOrders =
      orders.filter(
        (order) =>
          order.status !== "Cancelled"
      );

    const estimatedOrderValue =
      activeOrders.reduce(
        (total, order) =>
          total +
          Number(
            order.estimated_price || 0
          ),
        0
      );

    // ------------------------------
    // SEND REAL STATS
    // ------------------------------

    res.json({
      visitorsToday,
      pageViewsToday,
      whatsappClicksToday,
      newOrders,
      pendingOrders,
      completedOrders,
      totalOrders: orders.length,
      estimatedOrderValue,
    });
  } catch (error) {
    console.error(
      "Stats error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;