/**
 * Loads the YouTube IFrame API script once and resolves when ready
 */
export function loadYouTubeIFrameAPI() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    if (!document.getElementById("yt-iframe-api")) {
      const script = document.createElement("script");
      script.id = "yt-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevReady) prevReady();
      resolve();
    };

    const interval = window.setInterval(() => {
      if (window.YT && window.YT.Player) {
        window.clearInterval(interval);
        resolve();
      }
    }, 200);

    window.setTimeout(() => window.clearInterval(interval), 15000);
  });
}
