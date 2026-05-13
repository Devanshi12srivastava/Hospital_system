export const detectIntent = (msg) => {
  msg = msg.toLowerCase();

  return {
    isDoctorInfo:
      msg.includes("doctor") ||
      msg.includes("available") ||
      msg.includes("general physician") ||
      msg.includes("neurologist") ||
      msg.includes("cardiologist") ||
      msg.includes("dermatologist") ||
      msg.includes("pediatrician") ||
      msg.includes("orthopedic") ||
      msg.includes("gynecologist") ||
      msg.includes("ent specialist") ||
      msg.includes("psychiatrist") ||
      msg.includes("dentist") ||
      msg.includes("urologist") ||
      msg.includes("oncologist") ||
      msg.includes("ophthalmologist") ||
      msg.includes("radiologist") ||
      msg.includes("pulmonologist") ||
      msg.includes("gastroenterologist") ||
      msg.includes("endocrinologist") ||
      msg.includes("nephrologist") ||
      msg.includes("surgeon") ||
      msg.includes("physiotherapist"),

      isPayment:
      msg.includes("payment") ||
      msg.includes("pay") ||
      msg.includes("fees"),


    isTiming:
      msg.includes("time") ||
      msg.includes("timing") ||
      msg.includes("slot"),

    isAddress:
      msg.includes("address") ||
      msg.includes("location") ||
       msg.includes("clinic"),
  };
};