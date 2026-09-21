import mongoose from "mongoose";

const analyticsEventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["page_view", "service_click", "whatsapp_click", "order_submit"],
    required: true
  },
  page: { type: String, default: "" },
  visitorId: { type: String, default: "" },
  meta: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

export default mongoose.model("AnalyticsEvent", analyticsEventSchema);
