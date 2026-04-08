"use client";

import dynamic from "next/dynamic";

const SmartAssistant = dynamic(() => import("@/components/chatbot/SmartAssistant"), {
  ssr: false,
});

export default function AssistantLauncher() {
  return <SmartAssistant />;
}
