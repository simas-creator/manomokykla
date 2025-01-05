import React from 'react';
import RateCard from './RateCard';
import ViewCard from './ViewCard';
function Hero() {
  return (
    <section className='flex w-full container justify-center items-center lg:my-40 max-lg:my-20 lg:gap-20 md:gap-10 max-md:gap-5 max-sm:flex-col m-auto'>
      <RateCard/>
      <ViewCard/>
    </section>
  );
}

export default Hero;