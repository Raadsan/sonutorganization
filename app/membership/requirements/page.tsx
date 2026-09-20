import MembershipBanner from "@/components/Members/MembershipBanner";
import MembershipRequirements from "@/components/Members/MembershipRequirements";

export const metadata = {
  title: "Membership Requirements | SONUT",
  description:
    "Review the official requirements and criteria for becoming a member of the Somali National Union of Teachers.",
};

export default function MembershipRequirementsPage() {
  return (
    <main className="min-h-screen bg-white">
      <MembershipBanner title="Membership Requirements" />
      <MembershipRequirements />
    </main>
  );
}
