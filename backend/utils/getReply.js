import { detectIntent } from "./intentService.js";

export const getReply = (msg) => {
  const intent = detectIntent(msg);

  // ❌ Not allowed query
  const allowed =
    intent.isDoctorInfo ||
    intent.isPayment ||
    intent.isTiming ||
    intent.isAddress;

  if (!allowed) {
    return "I only help with doctor appointment related queries.";
  }

  // 💳 PAYMENT
  if (intent.isPayment) {
    return `
💳 Payment Methods:
- UPI (Google Pay, PhonePe)
- Debit/Credit Card
- Cash after visit
    `;
  }

  // ⏰ TIMING
  if (intent.isTiming) {
    return `
⏰ Appointment Slots:
- 10 AM - 1 PM
- 5 PM - 8 PM
    `;
  }

  // 📍 ADDRESS
  if (intent.isAddress) {
    return `
📍 Clinic Locations:
- Hazratganj
- Gomti Nagar
    `;
  }

  return null;
};