import "./globals.css";

export const metadata = {
  title: "Order Management",
  description: "Orden management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
