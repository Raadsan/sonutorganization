import JoinBanner from "@/components/Members/JoinBanner";
import MembershipBenefits from "@/components/Members/MembershipBenefits";
import ReasonsToJoin from "@/components/Members/ReasonsToJoin";
import WhoCanJoin from "@/components/Members/WhoCanJoin";
import MembersForm from "@/components/Members/memebrsform";

export const metadata = {
  title: "Join SONUT – Somalia National Union of Teachers",
  description:
    "Become a member of SONUT, Somalia's leading teachers' union. Enjoy legal protection, professional development, welfare support, and collective bargaining.",
};

export default function JoinSonutPage() {
  return (
    <main>
      <JoinBanner />
      <MembershipBenefits />
      <ReasonsToJoin />
      <WhoCanJoin />
      <div id="register">
        <MembersForm />
      </div>
    </main>
  );
}