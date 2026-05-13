import { detectIntent } from "../services/intentService.js";
import { generateGeminiResponse } from "../services/geminiService.js";
import { searchDoctors } from "../services/doctorService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const msg = message.toLowerCase();
    const intent = detectIntent(msg);

    // 👨‍⚕️ DOCTOR INFO (FIXED ✔️)
    if (intent.isDoctorInfo) {
      const doctors = await searchDoctors(msg); // ✅ FIX HERE

      if (!doctors.length) {
        return res.json({ reply: "No doctors available" });
      }

      const reply = doctors
        .map(
          (d) => `
👨‍⚕️ ${d.name}
🏥 ${d.speciality}
💰 ₹${d.fees}
🧠 ${d.experience} yrs
📍 ${d.address}
          `
        )
        .join("\n");

      return res.json({ reply });
    }

    // 💳 PAYMENT
    if (intent.isPayment) {
      return res.json({
        reply: `
💳 Payment Methods:
- UPI (Google Pay, PhonePe)
- Debit/Credit Card
- Cash after visit
        `,
      });
    }

    // ⏰ TIMING
    if (intent.isTiming) {
      return res.json({
        reply: `
⏰ Appointment Slots:
- 10 AM - 1 PM
- 5 PM - 8 PM
- Sunday: Emergency only
        `,
      });
    }

    // 📍 ADDRESS (optional same as doctor)
    if (intent.isAddress) {
      const doctors = await searchDoctors(msg);

      if (!doctors.length) {
        return res.json({ reply: "No clinic data available" });
      }

      const reply = doctors
        .map(
          (d) => `
📍 ${d.name}
🏥 ${d.address}
          `
        )
        .join("\n");

      return res.json({ reply });
    }

    // 🤖 AI FALLBACK
    const reply = await generateGeminiResponse(message);

    return res.json({ reply });
  } catch (error) {
    console.log("Controller Error:", error);
    return res.status(500).json({
      reply: "Server error. Please try again later.",
    });
  }
};