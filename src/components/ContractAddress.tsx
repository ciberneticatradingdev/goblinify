"use client";

import { useState } from "react";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "coming soon...";

export default function ContractAddress() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (CONTRACT_ADDRESS === "coming soon...") return;
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = CONTRACT_ADDRESS;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <div
        onClick={handleCopy}
        className="glass rounded-2xl p-4 md:p-5 cursor-pointer group
                   hover:border-[var(--goblin-accent)] transition-all duration-300
                   hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl shrink-0">🧌</span>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                Contract Address
              </p>
              <p className={`text-sm md:text-base font-mono truncate ${
                CONTRACT_ADDRESS === "coming soon..."
                  ? "text-gray-500 italic"
                  : "text-[var(--goblin-accent)]"
              }`}>
                {CONTRACT_ADDRESS}
              </p>
            </div>
          </div>

          <button
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300
              ${
                copied
                  ? "bg-green-600/20 text-green-400 border border-green-500/40"
                  : "bg-[var(--goblin-green)]/20 text-[var(--goblin-accent)] border border-[var(--goblin-green)]/40 group-hover:bg-[var(--goblin-green)]/40"
              }`}
          >
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        </div>
      </div>
    </section>
  );
}
