const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: { type: String, enum: ["BEGINNER", "INTERMEDIATE", "EXPERT"], required: true },
  candidates: [{ type: String }],
  endDate: { type: Date, required: true },
  // companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});
module.exports = mongoose.model("Job", jobSchema);