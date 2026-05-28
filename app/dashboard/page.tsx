import { Footer } from "@/src/widgets/footer";
import { HeroSection } from "@/src/widgets/hero";
import { ChildrenSummary } from "@/src/widgets/children-summary";
import { QuickMenu } from "@/src/widgets/quick-menu";
import { NewsSection } from "@/src/widgets/news-section";

export default function DashboardPage() {
  return (
    <>
      <div className="container px-4 py-8 md:py-10 space-y-10">
        <HeroSection />
        <ChildrenSummary />
        <QuickMenu />
        <NewsSection />
      </div>
      <Footer />
    </>
  );
}
