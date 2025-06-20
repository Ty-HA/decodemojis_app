"use client";

export default function ShareButton() {
  return (
    <button
      className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-colors text-base"
      onClick={async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: document.title,
              url: window.location.href
            });
          } catch {
            // Ignore user cancelation (DOMException: Share canceled)
            // Optionally, you can check: if (err.name !== 'AbortError') { ... }
          }
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert('Lien copié dans le presse-papier !');
        }
      }}
    >
      <span className="text-lg">🔗</span>
      Partager cette page
    </button>
  );
}
