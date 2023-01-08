import Mtg from "../../../ui/Mtg";

export default function VaultMtgPage() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Mtg />
    </>
  );
}
