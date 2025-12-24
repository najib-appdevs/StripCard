// "use client";
// import { useRouter } from "next/navigation";
import GiftCardTable from "../../components/Gift-Card/GiftCardTable";

export const metadata = {
  title: "My Gift Card",
};

export default function Page() {
  // const router = useRouter();

  return (
    <>
      <GiftCardTable />
    </>
  );
}
