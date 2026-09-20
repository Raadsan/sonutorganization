import MembershipBanner from "@/components/Members/MembershipBanner";
import MembershipBenefits from "@/components/Members/MembershipBenefits";

export const metadata = {
  title: "Membership Benefits | SONUT",
  description:
    "Discover the powerful advantages and protections of SONUT membership, from legal advocacy and salary negotiations to professional training and healthcare.",
};

export default function MembershipBenefitsPage() {
  return (
    <main className="min-h-screen bg-white">
      <MembershipBanner title="Membership Benefits" />
      <MembershipBenefits />
    </main>
  );
}
