"use client";

import { ExternalLink, MapPin, Calendar, Link2 } from "lucide-react";
import { useState } from "react";

const FACEBOOK_URL = "https://www.facebook.com/somaliateachers";
const TWITTER_URL = "https://x.com/somaliateachers?s=21";

type SocialPlatform = "facebook" | "twitter";

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1.02.28-1.71 1.75-1.71H17V2.42c-.3-.04-1.34-.13-2.55-.13-2.52 0-4.25 1.54-4.25 4.37V9.5H7.35V13h2.85v9h3.3Z" />
    </svg>
  );
}

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
              onClick={() => setActivePlatform("twitter")}
              className="inline-flex items-center gap-2 rounded-full border border-secondary px-6 py-3 text-sm font-bold text-secondary transition hover:-translate-y-0.5 hover:bg-secondary hover:text-white"
            >
              <XIcon />
              X (Twitter)
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-3 shadow-2xl shadow-slate-300/40 backdrop-blur sm:p-5">
          <div className="flex gap-2 rounded-2xl bg-gradient-to-r from-primary via-[#363ea3] to-secondary p-2">
            <button
              type="button"
              onClick={() => setActivePlatform("facebook")}
              aria-pressed={activePlatform === "facebook"}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${activePlatform === "facebook"
                  ? "bg-white text-primary shadow"
                  : "text-white hover:bg-white/10"
                }`}
            >
              <FacebookIcon />
              Facebook
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform("twitter")}
              aria-pressed={activePlatform === "twitter"}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${activePlatform === "twitter"
                  ? "bg-white text-secondary shadow"
                  : "text-white hover:bg-white/10"
                }`}
            >
              <XIcon />
              Twitter (X)
            </button>
          </div>

          <div className="mt-4 flex min-h-[620px] items-center justify-center overflow-hidden rounded-2xl bg-white w-full">
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
              <div className="w-full max-w-[500px] border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col font-sans">
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
                </div>

                {/* Profile Header */}
                <div className="px-6 pb-6 relative flex flex-col text-left">
                  {/* Profile Picture */}
                  <div className="relative -mt-14 mb-3 flex justify-between items-end">
                    <div className="h-24 w-24 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-md">
                      <img
                        src="/images/logo1.png"
                        alt="SONUT Logo"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <a
                      href={TWITTER_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                    >
                      Follow
                    </a>
                  </div>

                  {/* Profile Info */}
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-black text-slate-950 tracking-tight leading-tight">
                      Somali National Union of Teachers
                    </h3>
                    <svg className="h-4.5 w-4.5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">@somaliateachers</p>

                  <p className="mt-2 text-xs leading-relaxed text-slate-700">
                    Official Twitter (X) page of the Somali National Union of Teachers (SONUT). Empowering educators and strengthening education in Somalia since 2004.
                  </p>

                  {/* Meta data */}
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 opacity-70" />
                      <span>Mogadishu, Somalia</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 opacity-70" />
                      <span>Joined September 2004</span>
                    </div>
                  </div>

                  {/* Followers / Following */}
                  <div className="mt-3 flex gap-4 text-xs">
                    <span className="text-slate-500 font-medium">
                      <strong className="text-slate-950 font-bold">142</strong> Following
                    </span>
                    <span className="text-slate-500 font-medium">
                      <strong className="text-slate-950 font-bold">5.8K</strong> Followers
                    </span>
                  </div>

                  {/* Custom X Preview Box / Feed Card */}
                  <div className="mt-4 border border-slate-100 rounded-xl p-3 bg-slate-50/50 hover:bg-slate-50 transition duration-200">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="h-4 w-4 rounded-full overflow-hidden bg-slate-200">
                        <img src="/images/logo1.png" alt="SONUT Logo" className="h-full w-full object-cover" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-900 leading-none">Somali National Union of Teachers</span>
                      <span className="text-[10px] text-slate-400">· 2h</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      We are committed to quality education and supporting the professional development of Somali educators. Connect with us on our official X account for regular updates! 📚🇸🇴
                    </p>
                    <a
                      href={TWITTER_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5"
                    >
                      <Link2 className="h-2.5 w-2.5" />
                      x.com/somaliateachers
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
