// import { connectDB } from "../lib/db.js";
// import ContactForm from "../model/ContactForm.js";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Only POST allowed" });
//   }

//   try {
//     await connectDB();
//     const newEntry = new ContactForm(req.body);
//     await newEntry.save();

//     res.status(200).json({ success: true, message: "✅ Form saved to MongoDB" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "❌ Failed to save form" });
//   }
// }





import { connectDB } from "../lib/db.js";
import ContactForm from "../model/ContactForm.js";

export default async function handler(req, res) {
  // 🔓 CORS
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://aditienterprises.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    await connectDB();
    await ContactForm.create(req.body);

    res.status(200).json({
      success: true,
      message: "✅ Contact form saved",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "❌ Failed to save contact form",
    });
  }
}
