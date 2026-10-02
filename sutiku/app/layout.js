import './globals.css'

export const metadata = {
  title: 'Sutiku Sushi',
  description: 'Fresh sushi, made to order in Lebanon.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
