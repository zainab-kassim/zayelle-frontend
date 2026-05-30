import HeroSection from '@/components/shared/HeroSection';
import FloralCollection from '@/components/shared/FlorealCollection';
import Banner from '@/components/shared/Banner';
import MessageReviews from '@/components/shared/MessageReviews';

export default function Home() {
  return (
    <>
      <div className=' px-4 md:px-12 lg:px-34 xl:px-16'>
        <HeroSection />
        <FloralCollection />
        <Banner />
    
      </div>
          <MessageReviews />
    </>
  );
}
