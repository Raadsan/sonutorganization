"use client";

import { ExternalLink, Music2 } from "lucide-react";
import { useState } from "react";

const FACEBOOK_URL = "https://www.facebook.com/somaliateachers";

type SocialPlatform = "facebook" | "tiktok";

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1.02.28-1.71 1.75-1.71H17V2.42c-.3-.04-1.34-.13-2.55-.13-2.52 0-4.25 1.54-4.25 4.37V9.5H7.35V13h2.85v9h3.3Z" />
    </svg>
  );
}

export default function Social() {
  const [activePlatform, setActivePlatform] =
    useState<SocialPlatform>("facebook");

  const facebookEmbedUrl =
    "https://www.facebook.com/plugins/page.php?" +
    new URLSearchParams({
      href: FACEBOOK_URL,
      tabs: "timeline",
      width: "500",
      height: "620",
      small_header: "false",
      adapt_container_width: "true",
      hide_cover: "false",
      show_facepile: "true",
    }).toString();

  return (
    <section className="overflow-hidden border-y border-slate-100 bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            Follow our updates
          </div>

          <h2 className="max-w-lg text-4xl font-bold leading-[1.08] text-slate-950 sm:text-5xl">
            Stay connected with Somali teachers
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
            Follow our latest news, education updates, activities, and community
            stories through our official social media channels.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <FacebookIcon />
              Facebook Page
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>
            <button
              type="button"
              onClick={() => setActivePlatform("tiktok")}
              className="inline-flex items-center gap-2 rounded-full border border-secondary px-6 py-3 text-sm font-bold text-secondary transition hover:-translate-y-0.5 hover:bg-secondary hover:text-white"
            >
              <Music2 className="h-4 w-4" />
              TikTok
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-3 shadow-2xl shadow-slate-300/40 backdrop-blur sm:p-5">
          <div className="flex gap-2 rounded-2xl bg-gradient-to-r from-primary via-[#363ea3] to-secondary p-2">
            <button
              type="button"
              onClick={() => setActivePlatform("facebook")}
              aria-pressed={activePlatform === "facebook"}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                activePlatform === "facebook"
                  ? "bg-white text-primary shadow"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <FacebookIcon />
              Facebook
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform("tiktok")}
              aria-pressed={activePlatform === "tiktok"}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                activePlatform === "tiktok"
                  ? "bg-white text-secondary shadow"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Music2 className="h-4 w-4" />
              TikTok
            </button>
          </div>

          <div className="mt-4 flex min-h-[620px] items-center justify-center overflow-hidden rounded-2xl bg-white">
            {activePlatform === "facebook" ? (
              <iframe
                title="Somali Teachers Facebook page"
                src={facebookEmbedUrl}
                width="500"
                height="620"
                className="h-[620px] w-full max-w-[500px] border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
              />
            ) : (
              <div className="px-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
                  <Music2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-950">
                  TikTok is coming soon
                </h3>
                <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-500">
                  Add the official TikTok profile URL here when it is ready.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
