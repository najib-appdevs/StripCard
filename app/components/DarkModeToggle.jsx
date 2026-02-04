/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      const dark = saved === "dark";
      setIsDark(dark);
      document.documentElement.classList.toggle("dark", dark);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setTimeout(() => setIsAnimating(false), 380);
  };

  return (
    <>
      <style>{`
        .toggle-root {
          --track-w: 64px;
          --track-h: 32px;
          --knob-size: 24px;
          --knob-inset: 4px;
          --radius: 16px;
          --ease: cubic-bezier(.4, 0, .2, 1);
          --dur: 0.36s;
        }

        /* ─── Track ─── */
        .toggle-track {
          position: relative;
          width: var(--track-w);
          height: var(--track-h);
          border-radius: var(--radius);
          cursor: pointer;
          border: none;
          padding: 0;
          outline: none;
          overflow: hidden;
          transition: box-shadow var(--dur) var(--ease),
                      background var(--dur) var(--ease);
        }

        /* Light */
        .toggle-track.light {
          background: linear-gradient(135deg, #d4e8df 0%, #c2ddd2 100%);
          box-shadow:
            inset 0 2px 4px rgba(1,44,32,.2),
            0 1px 2px rgba(255,255,255,.5);
        }
        .toggle-track.light:hover {
          background: linear-gradient(135deg, #c8e2d8 0%, #b5d6c8 100%);
          box-shadow:
            inset 0 2px 5px rgba(1,44,32,.25),
            0 2px 6px rgba(1,44,32,.1);
        }

        /* Dark — lighter base so icons breathe */
        .toggle-track.dark {
          background: linear-gradient(135deg, #1e2a3a 0%, #162230 100%);
          box-shadow:
            inset 0 2px 4px rgba(0,0,0,.35),
            0 1px 3px rgba(0,0,0,.25);
        }
        .toggle-track.dark:hover {
          background: linear-gradient(135deg, #223080 0%, #1a2835 100%);
          box-shadow:
            inset 0 2px 5px rgba(0,0,0,.4),
            0 2px 7px rgba(0,0,0,.2);
        }

        .toggle-track:focus-visible {
          outline: 2px solid #012C20;
          outline-offset: 2.5px;
        }

        /* ─── Gradient border ─── */
        .toggle-track::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 3;
          border-radius: inherit;
          pointer-events: none;
          border: 1.5px solid transparent;
          background:
            linear-gradient(var(--radius), var(--radius), transparent) padding-box,
            linear-gradient(135deg, rgba(1,44,32,.25) 0%, rgba(1,44,32,.08) 100%) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: background var(--dur) var(--ease);
        }
        .toggle-track.dark::after {
          background:
            linear-gradient(var(--radius), var(--radius), transparent) padding-box,
            linear-gradient(135deg, rgba(147,197,253,.3) 0%, rgba(99,102,241,.15) 100%) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        /* ─── Particles ─── */
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.4s ease;
        }

        /* Stars — bright white, fully visible in dark */
        .particle.star {
          background: #ffffff;
          opacity: 0;
          box-shadow: 0 0 2px 0.5px rgba(255,255,255,.6);
        }
        .toggle-track.dark .particle.star { opacity: 1; }
        .particle.s1 { width:3px;   height:3px;   top:5px;  right:9px; }
        .particle.s2 { width:2.5px; height:2.5px; top:15px; right:4px; }
        .particle.s3 { width:2px;   height:2px;   top:23px; right:13px; }

        /* Clouds — light only */
        .particle.cloud { background: rgba(255,255,255,.85); opacity: 0; border-radius: 6px; }
        .toggle-track.light .particle.cloud { opacity: 1; }
        .particle.c1 { width:7px; height:4px; top:7px;  left:15px; }
        .particle.c2 { width:4px; height:2.5px; top:21px; left:20px; }

        /* ─── Glow ─── */
        .toggle-glow {
          position: absolute;
          top: 50%;
          width: var(--knob-size);
          height: var(--knob-size);
          border-radius: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 1;
          transition: left var(--dur) var(--ease),
                      box-shadow var(--dur) var(--ease);
        }
        .toggle-glow.light {
          left: var(--knob-inset);
          box-shadow: 0 0 11px 5px rgba(245,158,11,.45);
        }
        .toggle-glow.dark {
          left: calc(var(--track-w) - var(--knob-size) - var(--knob-inset));
          box-shadow: 0 0 14px 6px rgba(147,197,253,.45);
        }

        /* ─── Background icons ─── */
        .toggle-bg-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }
        .toggle-bg-icon.sun  { left: 7px; }
        .toggle-bg-icon.moon { right: 7px; }

        /* Light */
        .toggle-track.light .toggle-bg-icon.sun  { opacity: 0.9; }
        .toggle-track.light .toggle-bg-icon.moon { opacity: 0.5; }

        /* Dark — moon bright, sun dim */
        .toggle-track.dark .toggle-bg-icon.sun  { opacity: 0.3; }
        .toggle-track.dark .toggle-bg-icon.moon { opacity: 1; }

        /* ─── Knob ─── */
        .toggle-knob {
          position: absolute;
          top: var(--knob-inset);
          width: var(--knob-size);
          height: var(--knob-size);
          border-radius: 50%;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: left var(--dur) var(--ease),
                      background var(--dur) var(--ease),
                      box-shadow var(--dur) var(--ease),
                      transform 0.12s var(--ease);
        }
        .toggle-knob:active { transform: scale(0.91); }

        .toggle-knob.light {
          left: var(--knob-inset);
          background: linear-gradient(160deg, #fff 0%, #f4faf7 100%);
          box-shadow:
            0 2px 5px  rgba(1,44,32,.22),
            0 1px 2px  rgba(1,44,32,.1),
            inset 0 1px 0 rgba(255,255,255,.95);
        }

        /* Dark knob — lighter surface for icon contrast */
        .toggle-knob.dark {
          left: calc(var(--track-w) - var(--knob-size) - var(--knob-inset));
          background: linear-gradient(160deg, #3a4a60 0%, #2c3e50 100%);
          box-shadow:
            0 2px 7px  rgba(0,0,0,.45),
            0 1px 2px  rgba(0,0,0,.3),
            inset 0 1px 0 rgba(255,255,255,.12);
        }

        /* ─── Knob icon crossfade ─── */
        .knob-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.22s ease, transform 0.22s ease;
        }

        .toggle-knob.light .knob-icon.sun  { opacity: 1; transform: scale(1) rotate(0deg); }
        .toggle-knob.light .knob-icon.moon { opacity: 0; transform: scale(0.55) rotate(-30deg); }

        .toggle-knob.dark .knob-icon.sun  { opacity: 0; transform: scale(0.55) rotate(30deg); }
        .toggle-knob.dark .knob-icon.moon { opacity: 1; transform: scale(1) rotate(0deg); }
      `}</style>

      <button
        className={`toggle-root toggle-track ${isDark ? "dark" : "light"}`}
        onClick={toggle}
        aria-label="Toggle dark mode"
        aria-pressed={isDark}
      >
        {/* Glow */}
        <div className={`toggle-glow ${isDark ? "dark" : "light"}`} />

        {/* Stars */}
        <div className="particle star s1" />
        <div className="particle star s2" />
        <div className="particle star s3" />

        {/* Clouds */}
        <div className="particle cloud c1" />
        <div className="particle cloud c2" />

        {/* BG icons */}
        <div className="toggle-bg-icon sun">
          <Sun
            size={13}
            color={isDark ? "#f59e0b" : "#d97706"}
            strokeWidth={2.4}
          />
        </div>
        <div className="toggle-bg-icon moon">
          <Moon
            size={13}
            color={isDark ? "#ffffff" : "#6366f1"}
            strokeWidth={2.4}
          />
        </div>

        {/* Knob */}
        <div className={`toggle-knob ${isDark ? "dark" : "light"}`}>
          <span className="knob-icon sun">
            <Sun size={13} color="#b45309" strokeWidth={2.4} />
          </span>
          <span className="knob-icon moon">
            <Moon size={13} color="#ffffff" strokeWidth={2.4} />
          </span>
        </div>
      </button>
    </>
  );
}
