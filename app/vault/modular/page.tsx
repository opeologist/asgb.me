import Modular from "../../../ui/Modular";

export default function VaultModularPage() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Modular />
    </>
  );
}
