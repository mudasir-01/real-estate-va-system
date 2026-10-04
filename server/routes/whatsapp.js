import express from "express";

const router = express.Router();

// Meta webhook verification
router.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    console.log("WhatsApp webhook verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Incoming WhatsApp messages/events
router.post("/webhook", (req, res) => {
  console.log(
    "WhatsApp event:",
    JSON.stringify(req.body, null, 2)
  );

  return res.sendStatus(200);
});

export default router;