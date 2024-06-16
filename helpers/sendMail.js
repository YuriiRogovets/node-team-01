import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
    secure: true, // upgrade later with STARTTLS
  auth: {
    user: "sopinskaya10475@ukr.net",
    pass: "tL9HBwKzHQgtSmgj",
  },
});

export async function sendMail({ to, html }) {
  await transporter.sendMail({
    from: "sopinskaya10475@ukr.net",
    to: to,
    html: html,
  });
}

