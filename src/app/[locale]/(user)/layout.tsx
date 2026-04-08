import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GradientBackground } from "@/components/gradient";
import AssistantLauncher from "@/components/chatbot/AssistantLauncher";

export default function UserLocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GradientBackground />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AssistantLauncher />
    </>
  );
}
