export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Pack 131 Ice Cream Social RSVP</title>
        <meta name="description" content="RSVP for Pack 131's Ice Cream Social" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}