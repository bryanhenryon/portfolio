const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

router.post("/send", (req, res) => {
  async function main() {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "lastlifeblog@gmail.com",
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: `${req.body.name} <${req.body.email}>`,
      replyTo: req.body.email,
      to: "b.henryon@outlook.fr",
      subject: "Portfolio ⁠– Nouveau message",
      html: `<p>${req.body.message}</p>`,
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
});

router.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

module.exports = router;
