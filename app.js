const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact" });
});

app.get("/experience", (req, res) => {
    res.render("experience", { title: "Professional Experience" });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      throw new Error("Environment variables missing");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL}>`,  // ✅ Important fix
      replyTo: email,                                      // ✅ Safe reply handling
      to: process.env.EMAIL,
      subject: `New message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.send("Message sent successfully 🚀");

  } catch (err) {
    console.error("MAIL ERROR:", err);
    res.send("Error sending message");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});