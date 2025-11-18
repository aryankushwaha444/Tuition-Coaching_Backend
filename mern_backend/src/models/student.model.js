import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    batch_id: { type: String, required: true },
    fees: { type: Number, required: true },
    due_amount: { type: Number, default: 0 },
    join_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
