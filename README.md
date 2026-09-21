# Mudasir Real Estate VA — Client Acquisition System

A full-stack starter for a real-estate virtual assistant business serving the USA and Canada.

## Core features
- Public service website
- Lead Generation + Skip Tracing pricing
- Cold Calling pricing
- Qualified Appointment pricing
- Order form with required location targeting
- USA: Country, State, City, ZIP Code
- Canada: Country, Province, City, Postal Code
- WhatsApp handoff after order submission
- Inquiry/contact form
- Admin dashboard
- Order statuses:
  - New Order
  - Client Discussion
  - Payment Pending
  - Paid
  - In Progress
  - Delivered
  - Completed
  - Follow-Up
  - Cancelled
- Analytics events:
  - page_view
  - service_click
  - whatsapp_click
  - order_submit
- Dashboard cards for visitors, page views, WhatsApp clicks, inquiries, orders, pending, completed
- MongoDB + Express API

## Pricing configured
- 100 Verified Leads + Skip Tracing: $20
- 100 Cold Calls: $40
- 1 Qualified Appointment: $60

## Setup

### 1) Server
```bash
cd server
npm install
copy .env.example .env
npm run dev
```

### 2) Client
Open a second terminal:
```bash
cd client
npm install
copy .env.example .env
npm run dev
```

### Environment
Set your real WhatsApp number, email, LinkedIn URL, MongoDB URL and admin key in the `.env` files.

## Notes
- Payment is intentionally NOT collected automatically.
- After the order is submitted, the client is redirected to WhatsApp with an order summary.
- Payment method can then be discussed manually (card payment via a secure processor/link, Payoneer, Remitly, Boss Revolution, PayPal where workable, or another agreed method).
- Never request raw credit/debit card details through WhatsApp.
- The Admin Dashboard uses a simple `x-admin-key` protection as a starter. For production, replace it with a proper authentication system.
