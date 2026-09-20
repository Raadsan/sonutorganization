import MembershipBanner from "@/components/Members/MembershipBanner";
import WhoCanJoin from "@/components/Members/WhoCanJoin";

export const metadata = {
  title: "Who Can Join? | SONUT",
  description:
    "Membership in SONUT is open to all qualified teachers, academic staff, and education management professionals across Somalia.",
};

export default function WhoCanJoinPage() {
  return (
    <main className="min-h-screen bg-white">
      <MembershipBanner title="Who Can Join?" />
      <WhoCanJoin />
    </main>
  );
}
