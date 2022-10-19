const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const sessionId = req.query.session_id;

  const session = await stripe.checkout.sessions.listLineItems(sessionId);

  res.status(200).json({ session });
}
