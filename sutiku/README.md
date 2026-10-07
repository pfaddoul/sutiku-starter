# Suttiku Sushi

Starter ordering website for a sushi restaurant in Lebanon.

## Included
- Customer menu with dummy sushi products in USD
- Cart and checkout
- Cash on delivery / online payment selection
- Lebanese phone/address checkout fields
- Admin menu editor
- Order management statuses
- Browser persistence through localStorage for demo purposes
- API placeholder for payment + email + SMS + WhatsApp integrations

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000 and /admin for the admin page.

## Production next steps
1. Replace localStorage with PostgreSQL/Supabase.
2. Add admin authentication.
3. Connect your payment gateway.
4. Connect email provider.
5. Connect SMS provider.
6. Connect WhatsApp Business API/provider.
7. Add delivery zones/fees and opening-hour logic.
8. Deploy to Vercel or another Node-compatible host.
