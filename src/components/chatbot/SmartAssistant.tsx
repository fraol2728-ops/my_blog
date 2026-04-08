"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { useLocale, useTranslator } from "@/i18n/I18nProvider";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

type QuickAction = {
  label: string;
  value: string;
};

type ConversationStep = "root" | "services" | "courses" | "pricing" | "contact";

const INITIAL_MESSAGE_ID = "welcome-msg";

export default function SmartAssistant() {
  const t = useTranslator();
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [step, setStep] = useState<ConversationStep>("root");
  const [lastSelected, setLastSelected] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ step: ConversationStep; lastSelected: string | null }>>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: INITIAL_MESSAGE_ID,
      role: "bot",
      text: t("chatbot.welcome"),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const triggeredRef = useRef(false);

  const localeBasePath = `/${locale}`;
  const quickActions = useMemo<QuickAction[]>(() => {
    if (step === "services") {
      return [
        { label: t("chatbot.services.webDevelopment"), value: "service_web" },
        { label: t("chatbot.services.uiux"), value: "service_uiux" },
        { label: t("chatbot.services.cybersecurity"), value: "service_cyber" },
        { label: t("chatbot.common.back"), value: "back" },
      ];
    }

    if (step === "courses") {
      return [
        { label: t("chatbot.courses.beginner"), value: "course_beginner" },
        { label: t("chatbot.courses.teamTraining"), value: "course_team" },
        { label: t("chatbot.common.restart"), value: "restart" },
      ];
    }

    if (step === "pricing") {
      return [
        { label: t("chatbot.pricing.requestQuote"), value: "pricing_quote" },
        { label: t("chatbot.pricing.comparePlans"), value: "pricing_compare" },
        { label: t("chatbot.common.restart"), value: "restart" },
      ];
    }

    if (step === "contact") {
      return [
        { label: t("chatbot.contact.bookCall"), value: "contact_book" },
        { label: t("chatbot.contact.sendMessage"), value: "contact_message" },
        { label: t("chatbot.common.restart"), value: "restart" },
      ];
    }

    return [
      { label: t("chatbot.quick.exploreServices"), value: "services" },
      { label: t("chatbot.quick.viewCourses"), value: "courses" },
      { label: t("chatbot.quick.pricing"), value: "pricing" },
      { label: t("chatbot.quick.contact"), value: "contact" },
    ];
  }, [step, t]);

  const pushBotMessage = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}-${Math.random()}`,
        role: "bot",
        text,
      },
    ]);
  }, []);

  const delayedBotMessage = useCallback(
    (text: string) => {
      setTyping(true);
      const delay = Math.floor(Math.random() * 700) + 500;
      window.setTimeout(() => {
        pushBotMessage(text);
        setTyping(false);
      }, delay);
    },
    [pushBotMessage],
  );

  const saveConversationState = useCallback(
    (nextStep: ConversationStep, selected: string | null) => {
      setHistory((prev) => [...prev, { step, lastSelected }]);
      setStep(nextStep);
      setLastSelected(selected);
    },
    [lastSelected, step],
  );

  const handleRestart = useCallback(() => {
    setMessages([
      {
        id: INITIAL_MESSAGE_ID,
        role: "bot",
        text: t("chatbot.welcome"),
      },
    ]);
    setStep("root");
    setLastSelected(null);
    setHistory([]);
  }, [t]);

  const handleBack = useCallback(() => {
    setHistory((prev) => {
      if (!prev.length) {
        return prev;
      }

      const next = [...prev];
      const previous = next.pop();
      if (previous) {
        setStep(previous.step);
        setLastSelected(previous.lastSelected);
        delayedBotMessage(t("chatbot.common.backMessage"));
      }

      return next;
    });
  }, [delayedBotMessage, t]);

  const routeLinks = useMemo(
    () => ({
      services: `${localeBasePath}/services`,
      courses: `${localeBasePath}/blog`,
      pricing: `${localeBasePath}/contact`,
      contact: `${localeBasePath}/contact`,
    }),
    [localeBasePath],
  );

  const handleAction = useCallback(
    (value: string, label: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}-${Math.random()}`,
          role: "user",
          text: label,
        },
      ]);

      if (value === "restart") {
        handleRestart();
        return;
      }

      if (value === "back") {
        handleBack();
        return;
      }

      if (value === "services") {
        saveConversationState("services", label);
        delayedBotMessage(t("chatbot.services.question"));
        return;
      }

      if (value === "courses") {
        saveConversationState("courses", label);
        delayedBotMessage(t("chatbot.courses.question"));
        return;
      }

      if (value === "pricing") {
        saveConversationState("pricing", label);
        delayedBotMessage(t("chatbot.pricing.question"));
        return;
      }

      if (value === "contact") {
        saveConversationState("contact", label);
        delayedBotMessage(t("chatbot.contact.question"));
        return;
      }

      const responseMap: Record<string, string> = {
        service_web: t("chatbot.services.webDevelopmentReply"),
        service_uiux: t("chatbot.services.uiuxReply"),
        service_cyber: t("chatbot.services.cyberReply"),
        course_beginner: t("chatbot.courses.beginnerReply"),
        course_team: t("chatbot.courses.teamReply"),
        pricing_quote: t("chatbot.pricing.quoteReply"),
        pricing_compare: t("chatbot.pricing.compareReply"),
        contact_book: t("chatbot.contact.bookReply"),
        contact_message: t("chatbot.contact.messageReply"),
      };

      delayedBotMessage(responseMap[value] ?? t("chatbot.fallback"));
    },
    [delayedBotMessage, handleBack, handleRestart, saveConversationState, t],
  );

  const detectIntent = useCallback((value: string): ConversationStep | null => {
    const normalized = value.toLowerCase();

    if (normalized.includes("website") || normalized.includes("web") || normalized.includes("site")) {
      return "services";
    }

    if (normalized.includes("course") || normalized.includes("training") || normalized.includes("learn")) {
      return "courses";
    }

    if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("quote")) {
      return "pricing";
    }

    if (normalized.includes("contact") || normalized.includes("call") || normalized.includes("email")) {
      return "contact";
    }

    return null;
  }, []);

  const sendText = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}-${Math.random()}`,
        role: "user",
        text: trimmed,
      },
    ]);

    const intent = detectIntent(trimmed);
    if (!intent) {
      delayedBotMessage(t("chatbot.fallback"));
      setInput("");
      return;
    }

    saveConversationState(intent, trimmed);
    if (intent === "services") {
      delayedBotMessage(t("chatbot.services.question"));
    }
    if (intent === "courses") {
      delayedBotMessage(t("chatbot.courses.question"));
    }
    if (intent === "pricing") {
      delayedBotMessage(t("chatbot.pricing.question"));
    }
    if (intent === "contact") {
      delayedBotMessage(t("chatbot.contact.question"));
    }

    setInput("");
  }, [delayedBotMessage, detectIntent, input, saveConversationState, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasOpened = window.localStorage.getItem("assistant-opened") === "1";
    if (hasOpened) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowBadge(true);
    }, 4000);

    const setPreview = () => {
      if (triggeredRef.current) {
        return;
      }

      triggeredRef.current = true;
      setShowPreview(true);
      setShowBadge(true);
    };

    const triggerTimer = window.setTimeout(setPreview, 5000);

    const isPriorityPage = pathname.includes("/services") || pathname.includes("/pricing");

    if (isPriorityPage) {
      const priorityTimer = window.setTimeout(setPreview, 2500);
      return () => {
        clearTimeout(timer);
        clearTimeout(triggerTimer);
        clearTimeout(priorityTimer);
      };
    }

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) {
        return;
      }

      if (scrollTop / height >= 0.5) {
        setPreview();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(triggerTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const openAssistant = useCallback(() => {
    setIsOpen(true);
    setShowBadge(false);
    setShowPreview(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("assistant-opened", "1");
    }
  }, []);

  return (
    <>
      {showPreview && !isOpen ? (
        <button
          type="button"
          onClick={openAssistant}
          className="fixed bottom-28 right-6 z-[60] rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-lg shadow-slate-900/10"
        >
          {t("chatbot.preview")}
        </button>
      ) : null}

      <button
        type="button"
        onClick={openAssistant}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 transition duration-300 hover:scale-105"
        aria-label={t("chatbot.open")}
      >
        <MessageCircle className="h-6 w-6" />
        {!isOpen ? <span className="assistant-pulse-ring" /> : null}
        {showBadge ? (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
            1
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <section className="assistant-panel fixed bottom-2 right-2 z-[70] flex h-[500px] w-[calc(100vw-1rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 sm:bottom-6 sm:right-6">
          <header className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">{t("chatbot.title")}</p>
              <p className="text-xs text-emerald-300">{t("chatbot.status")}</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label={t("chatbot.close")}>
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
                  message.role === "bot" ? "bg-white text-slate-700 shadow-sm" : "ml-auto bg-emerald-600 text-white"
                }`}
              >
                {message.text}
              </div>
            ))}

            {typing ? (
              <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-sm">
                <span className="assistant-dot" />
                <span className="assistant-dot" />
                <span className="assistant-dot" />
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {quickActions.slice(0, 4).map((action) => (
                <button
                  key={action.value}
                  type="button"
                  onClick={() => handleAction(action.value, action.label)}
                  className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 hover:border-emerald-400"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {lastSelected ? (
              <p className="text-xs text-slate-400">
                {t("chatbot.common.lastChoice")}: {lastSelected}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2 text-xs">
              <Link href={routeLinks.services} className="text-emerald-700 underline underline-offset-2">
                {t("chatbot.links.services")}
              </Link>
              <Link href={routeLinks.courses} className="text-emerald-700 underline underline-offset-2">
                {t("chatbot.links.courses")}
              </Link>
              <Link href={routeLinks.contact} className="text-emerald-700 underline underline-offset-2">
                {t("chatbot.links.contact")}
              </Link>
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendText();
                  }
                }}
                placeholder={t("chatbot.inputPlaceholder")}
                className="h-11 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={sendText}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white"
                aria-label={t("chatbot.send")}
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
