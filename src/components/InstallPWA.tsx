'use client';

import { useState } from 'react';
import usePWA from '@/hooks/usePWA';

export default function InstallPWA() {
  const { isInstallable, installApp } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (!isInstallable || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-100 border-t border-blue-300 p-4 z-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-blue-800">
            Installez DecodEmojis sur votre appareil !
          </p>
          <p className="text-sm text-blue-600">
            Pour un accès rapide et hors ligne à notre dictionnaire d&apos;emojis
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setDismissed(true)}
            className="px-4 py-2 text-blue-800 hover:text-blue-900"
          >
            Plus tard
          </button>
          <button
            onClick={installApp}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Installer
          </button>
        </div>
      </div>
    </div>
  );
}
