import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import ContactCTA from '@/components/sections/ContactCTA';
import AITwin from '@/components/ai-twin/AITwin';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProjects />
      <ExperienceTimeline />
      <ContactCTA />
      <AITwin />
    </>
  );
}
