/**
 * Nike Smooth Page Transitions & Link Interceptor
 * Manages soft exit dim and instant smooth navigation.
 */
(function () {
  // Global programmatic navigation helper
  window.navigateToPage = function (url) {
    if (!url) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.href = url;
      return;
    }

    const targets = document.querySelectorAll(".page-transition-content");
    if (targets.length > 0) {
      targets.forEach((el) => el.classList.add("page-exiting"));
      setTimeout(function () {
        window.location.href = url;
      }, 75);
    } else {
      window.location.href = url;
    }
  };

  // Intercept internal navigation link clicks
  function initLinkInterceptor() {
    document.addEventListener("click", function (e) {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignore non-navigation or external links
      if (
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      try {
        const targetUrl = new URL(link.href, window.location.href);
        if (targetUrl.origin !== window.location.origin) return;

        if (
          targetUrl.pathname === window.location.pathname &&
          targetUrl.search === window.location.search &&
          !targetUrl.hash
        ) {
          return;
        }

        e.preventDefault();
        window.navigateToPage(link.href);
      } catch (err) {
        // Fallback: standard browser navigation
      }
    });
  }

  // Restore page on browser back/forward (bfcache)
  window.addEventListener("pageshow", function () {
    document.querySelectorAll(".page-transition-content").forEach((el) => {
      el.classList.remove("page-exiting");
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLinkInterceptor);
  } else {
    initLinkInterceptor();
  }
})();
