import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  whatsapp: { type: String, required: true, trim: true },
  country: { type: String, enum: ["USA", "Canada"], required: true },
  stateProvince: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  propertyType: { type: String, required: true },
  service: {
    type: String,
    enum: ["Lead Generation + Skip Tracing", "Cold Calling", "Qualified Appointment Setting"],
    required: true
  },
  quantity: { type: Number, required: true, min: 1 },
  estimatedPrice: { type: Number, required: true, min: 0 },
  additionalRequirements: { type: String, default: "" },
  paymentStatus: {
    type: String,
    enum: ["Not Discussed", "Pending", "Paid", "Partial", "Refunded"],
    default: "Not Discussed"
  },
  status: {
    type: String,
    enum: ["New Order", "Client Discussion", "Payment Pending", "Paid", "In Progress", "Delivered", "Completed", "Follow-Up", "Cancelled"],
    default: "New Order"
  },
  notes: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
