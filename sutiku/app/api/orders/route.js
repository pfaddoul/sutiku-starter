export async function POST(request) {
  const order = await request.json()
  // Production integration points:
  // 1. Persist order to your database.
  // 2. Create payment session when payment === 'online'.
  // 3. Send email confirmation.
  // 4. Send SMS notification.
  // 5. Send WhatsApp notification.
  return Response.json({ ok: true, orderId: order.id || `STK-${Date.now()}` })
}
