import './globals.css';

export const metadata = {
  title: 'Chess App',
  description: 'A simple chess application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
