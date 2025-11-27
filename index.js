const functions = require('firebase-functions');
const admin = require('firebase-admin');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

admin.initializeApp();
const mg = new Mailgun(formData);
const mailgun = mg.client({username: 'api', key: process.env.MAILGUN_API_KEY}); // set as env var
const MAIL_DOMAIN = process.env.MAILGUN_DOMAIN; // set as env var
const NOTIFY_TO = 'daquanrogers235@gmail.com';

exports.onOrderCreated = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const order = snap.data();
    const html = `
      <h2>New DMR Order</h2>
      <p><strong>Order ID:</strong> ${context.params.orderId}</p>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Contact:</strong> ${order.contact}</p>
      <p><strong>Category:</strong> ${order.category}</p>
      <p><strong>Idea:</strong> ${order.idea}</p>
      <p><strong>Size:</strong> ${order.size}</p>
      <p><strong>Total:</strong> $${order.total}</p>
      <p><strong>Message:</strong> ${order.message || '—'}</p>
    `;
    try {
      const res = await mailgun.messages.create(MAIL_DOMAIN, {
        from: `DMR Orders <orders@${MAIL_DOMAIN}>`,
        to: [NOTIFY_TO],
        subject: `New DMR Order — ${order.name} — $${order.total}`,
        html
      });
      console.log('Mailgun sent', res);
      return null;
    } catch (err){
      console.error('Mailgun error', err);
      return null;
    }
  });
