import LayoutHeader from "../../ui/LayoutHeader";

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <LayoutHeader />
      {children}
    </main>
  );
}
