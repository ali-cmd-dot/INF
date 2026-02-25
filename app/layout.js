import "./globals.css";

export const metadata = {
  title: "Cautio | Infants Fleet Scorecard",
  description: "Fleet performance scorecard — Infants client, powered by Cautio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
