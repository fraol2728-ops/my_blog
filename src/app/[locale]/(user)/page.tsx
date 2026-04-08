import AboutSection from "@/components/home/AboutSection";
import BlogPreview from "@/components/home/BlogPreview";
import HeroSection from "@/components/home/HeroSection";
import ProcessSection from "@/components/home/ProcessSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhySolarSection from "@/components/home/WhySolarSection";
import { getAllPosts } from "@/sanity/queries";

export default async function Home() {
  const latestPosts = await getAllPosts(3);
  const latestPost = latestPosts?.[0] ?? null;

  return (
    <div className="bg-white text-slate-900">
      <HeroSection latestPost={latestPost} />

      <main>
        <AboutSection />
        <BlogPreview posts={latestPosts} />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <WhySolarSection />
      </main>
    </div>
  );
}
