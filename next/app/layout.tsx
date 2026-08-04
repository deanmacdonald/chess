import "./globals.css";

export const metadata = {
  title: "Black Knight Chess",
  description: "A modern chess experience"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
