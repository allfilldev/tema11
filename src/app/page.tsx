import { BespokeTeaser, Clients, CorporateBand, Craft, Hero, Moments, PerkBand, Signature } from '@/sections/home';
import { Testimonials } from '@/sections/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PerkBand />
      <Signature />
      <Moments />
      <BespokeTeaser />
      <Craft />
      <CorporateBand />
      <Clients />
      <Testimonials />
    </>
  );
}
