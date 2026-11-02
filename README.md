# CM Sahab Ka Dhaba & Hotel — basic frontend + backend

This is a starter/demo version containing the customer-facing website and a small Express API. The admin dashboard and permanent database are intentionally not included yet.

## Run locally
1. Install Node.js (18 or newer).
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Run `npm start`.
5. Open http://localhost:5000

## Included
- Responsive restaurant website and menu search/category filters
- Cart stored in the browser
- Express backend API: `GET /api/products`, `POST /api/orders`, `GET /api/health`
- Demo menu and demo orders held in server memory

## Important demo limitations
- Menu and orders reset when the server restarts.
- Orders are not saved permanently or sent to the restaurant; this is only a local demo.
- No admin dashboard, login, online payment, database, or live order notifications yet.
- Confirm all sample menu names and prices before using them publicly.

When ready, connect MongoDB, build admin authentication/dashboard, and add real order notifications and payment integration.
