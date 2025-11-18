import mongoose from "mongoose";
import Student from "../models/student.model.js";

mongoose.connect("mongodb://localhost:27017/coaching");

const data = [
  { name: "Aryan", phone: "9876543210", batch_id: "B1", fees: 5000, due_amount: 1000 },
  { name: "Ram", phone: "9801234567", batch_id: "A2", fees: 4000, due_amount: 500 },
  { name: "Hari", phone: "9801234367", batch_id: "C2", fees: 97687, due_amount: 500 },
  { name: "Gopi", phone: "98035234567", batch_id: "A1", fees: 3462, due_amount: 500 },
  { name: "Krishna", phone: "9885434567", batch_id: "B2", fees: 4563, due_amount: 500 },
  { name: "hari Sham", phone: "9800944567", batch_id: "D2", fees: 43223, due_amount: 500 },
  { name: "Chhotu", phone: "98014567", batch_id: "E2", fees: 63344, due_amount: 500 },
  { name: "Bantha", phone: "98012567", batch_id: "B1", fees: 463, due_amount: 500 },
  { name: "lalu", phone: "9801234322", batch_id: "C1", fees: 345, due_amount: 500 },
  { name: "Ram Charan", phone: "980123354", batch_id: "D1", fees: 3325, due_amount: 500 },
];

async function seed() {
  await Student.deleteMany({});
  await Student.insertMany(data);
  console.log("Seeding Done");
  process.exit();
}

seed();