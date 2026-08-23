import { Hero } from "@/components/sections/Hero";
import { Divisions } from "@/components/sections/Divisions";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { Achievements } from "@/components/sections/Achievements";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { ViewportVirtualizer } from "@/components/ui/ViewportVirtualizer";
import {
  getDivisions,
  getAchievements,
  getTeamMembers,
  getEvents,
  getGalleryImages,
  getFAQs,
  getSiteSettings,
  getHeroContent,
  getWhyJoinItems,
} from "@/sanity/queries";

// Selalu ambil data terbaru dari Sanity, jangan pakai cache halaman.
export const revalidate = 0;

export default async function HomePage() {
  const [
    divisions,
    achievements,
    teamMembers,
    events,
    galleryImages,
    faqs,
    settings,
    heroContent,
    whyJoinItems,
  ] = await Promise.all([
    getDivisions(),
    getAchievements(),
    getTeamMembers(),
    getEvents(),
    getGalleryImages(),
    getFAQs(),
    getSiteSettings(),
    getHeroContent(),
    getWhyJoinItems(),
  ]);

  return (
    <>
      <Hero
        content={heroContent}
        divisions={divisions}
        foundedYear={settings.foundedYear}
      />
      <ViewportVirtualizer id="home-divisions">
        <Divisions divisions={divisions} />
      </ViewportVirtualizer>
      <ViewportVirtualizer id="home-why-join">
        <WhyJoin items={whyJoinItems} />
      </ViewportVirtualizer>
      <ViewportVirtualizer id="home-achievements">
        <Achievements achievements={achievements} />
      </ViewportVirtualizer>
      <ViewportVirtualizer id="home-gallery-preview">
        <GalleryPreview images={galleryImages} />
      </ViewportVirtualizer>
      <ViewportVirtualizer id="home-events-preview">
        <EventsPreview events={events} />
      </ViewportVirtualizer>
      <ViewportVirtualizer id="home-team-preview">
        <TeamPreview members={teamMembers} />
      </ViewportVirtualizer>
      <ViewportVirtualizer id="home-faq">
        <FAQ items={faqs} />
      </ViewportVirtualizer>
      <ViewportVirtualizer id="home-contact">
        <Contact settings={settings} />
      </ViewportVirtualizer>
    </>
  );
}
