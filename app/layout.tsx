import styles from "../styles/global.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { body, html } = styles;

  return (
    <html className={html}>
      <head />
      <body className={body}>{children}</body>
    </html>
  );
}
