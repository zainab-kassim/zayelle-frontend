import HeroSection from '@/components/shared/HeroSection';
import CategoryShowcase from '@/components/shared/CategoryShowcase';
import FloralCollection from '@/components/shared/FlorealCollection';
import Banner from '@/components/shared/Banner';

export default function Home() {
  return (
    <div className="px-4 md:px-12 lg:px-34 xl:px-16 pb-16 sm:pb-24 flex flex-col gap-12 sm:gap-16">
      <HeroSection />
      <CategoryShowcase />
      <div className="-mt-6 sm:mt-0">
        <FloralCollection
          collection="floreal-collection"
          eyebrow="Fresh In"
          title="Floreal Collection"
        />
      </div>
      <Banner />
      <div className="-mt-6 sm:mt-0">
        <FloralCollection
          collection="ember-collection"
          eyebrow="Back By Request"
          title="Zayelle Luxe Weave"
        />
      </div>
    </div>
  );
}
