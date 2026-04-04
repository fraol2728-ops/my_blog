import Container from "@/components/container";
import AboutSection from "@/components/home/AboutSection";
import BlogPreview from "@/components/home/BlogPreview";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import ProcessSection from "@/components/home/ProcessSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import { getFeaturedPosts } from "@/sanity/queries";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Twitter", href: "#", icon: Twitter },
];

export default async function Home() {
  const posts = await getFeaturedPosts(3);

  return (
    <div className="bg-slate-50 pb-16 text-slate-900">
      <HeroSection />

      <Container>
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <BlogPreview posts={posts} />
        <CTASection />

        <footer className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 md:grid-cols-3 md:items-center">
            <div>
              <p className="text-xl font-semibold text-slate-900">SolarPeak</p>
              <p className="mt-2 text-sm text-slate-600">
                Professional solar design, installation, and support for homes
                and businesses.
              </p>
            </div>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-600 transition hover:text-emerald-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="md:text-right">
              <p className="text-sm text-slate-600">hello@solarpeak.com</p>
              <p className="text-sm text-slate-600">(800) 555-0199</p>
              <div className="mt-3 flex items-center gap-3 md:justify-end">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-emerald-300 hover:text-emerald-600"
                  >
                    <social.icon className="size-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
}
