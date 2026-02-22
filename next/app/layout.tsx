import "./globals.css";

export const metadata = {
  title: "Black Knight",
  description: "Chess app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
