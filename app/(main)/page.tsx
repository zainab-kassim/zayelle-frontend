import HeroSection from '@/components/shared/HeroSection';
import TrustBadges from '@/components/shared/TrustBadges';
import DressSpotlight from '@/components/shared/DressSpotlight';
import CategoryShowcase from '@/components/shared/CategoryShowcase';
import FloralCollection from '@/components/shared/FlorealCollection';
// import Banner from '@/components/shared/Banner';
import Newsletter from '@/components/shared/Newsletter';

export default function Home() {
  return (
    <div className="px-4 md:px-12 lg:px-34 xl:px-16 pb-16 sm:pb-24 flex flex-col gap-12 sm:gap-16">
      <HeroSection />
      <TrustBadges />
      <DressSpotlight />
      <CategoryShowcase />
      <FloralCollection
        collection="floreal-collection"
        eyebrow="Fresh In"
        title="Floreal Collection"
      />
      {/* <Banner /> */}
      <FloralCollection
        collection="ember-collection"
        eyebrow="Back By Request"
        title="Zayelle Luxe Weave"
      />
      <Newsletter />
    </div>
  );
}
