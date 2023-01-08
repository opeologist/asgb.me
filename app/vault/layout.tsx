import LayoutHeader from "../../ui/LayoutHeader";

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutHeader />
      {children}
    </>
  );
}
