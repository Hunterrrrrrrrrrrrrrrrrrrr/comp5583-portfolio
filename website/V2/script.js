"use strict";
// Enhance anchor navigation when IntersectionObserver is available.
const links = [...document.querySelectorAll('nav a[href^="#"]')];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) return;
    for (const link of links) {
      if (link.hash === `#${visible[0].target.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }, { rootMargin: "-10% 0px -35% 0px", threshold: [0, 0.2, 0.5] });
  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}
