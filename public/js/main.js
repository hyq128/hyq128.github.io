const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "打开导航");
    siteNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "打开导航" : "关闭导航");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-experience]").forEach((showcase) => {
  const cards = [...showcase.querySelectorAll("[data-experience-card]")];
  const section = showcase.closest(".internships");
  const ring = showcase.querySelector(".circular-gallery-ring");
  const timeline = section?.querySelector("[data-experience-timeline]");
  const timelineTrack = timeline?.querySelector(".experience-timeline-track");
  const timelineLinks = timeline ? [...timeline.querySelectorAll("[data-experience-target]")] : [];

  if (!section || !ring || !cards.length) return;

  const total = cards.length;
  const anglePerItem = 360 / total;
  timeline?.style.setProperty("--timeline-count", String(total));
  timeline?.style.setProperty("--timeline-inset", `${50 / total}%`);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let rotation = 0;
  let isScrolling = false;
  let scrollTimeout = null;
  let activeIndex = -1;
  let manualPauseUntil = 0;

  if (reducedMotion) {
    section.classList.add("gallery-reduced");
    timelineLinks.forEach((link) => link.removeAttribute("aria-current"));
    return;
  }

  const setActiveExperience = (nextIndex) => {
    if (nextIndex === activeIndex) return;
    activeIndex = nextIndex;
    const progress = (activeIndex / total) * 100;
    timeline?.style.setProperty("--timeline-progress", `${progress}%`);
    timelineLinks.forEach((link, index) => {
      if (index === activeIndex) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    if (timelineTrack && timelineTrack.scrollWidth > timelineTrack.clientWidth) {
      const activeLink = timelineLinks[activeIndex];
      const centeredLeft = activeLink.offsetLeft + activeLink.offsetWidth / 2 - timelineTrack.clientWidth / 2;
      timelineTrack.scrollTo({ left: centeredLeft, behavior: "smooth" });
    }
  };

  const render = () => {
    ring.style.setProperty("--gallery-rotation", `${rotation.toFixed(3)}deg`);
    let closestIndex = 0;
    let closestAngle = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const itemAngle = index * -anglePerItem;
      const totalRotation = rotation % 360;
      const relativeAngle = (itemAngle + totalRotation + 360) % 360;
      const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
      const opacity = Math.max(.3, 1 - normalizedAngle / 180);
      card.style.setProperty("--item-angle", `${itemAngle}deg`);
      card.style.setProperty("--item-opacity", opacity.toFixed(3));
      if (normalizedAngle < closestAngle) {
        closestAngle = normalizedAngle;
        closestIndex = index;
      }
    });

    setActiveExperience(closestIndex);
  };

  const handleScroll = () => {
    isScrolling = true;
    window.clearTimeout(scrollTimeout);
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    const sectionScroll = window.scrollY - section.offsetTop;
    const scrollProgress = scrollableHeight > 0
      ? Math.max(0, Math.min(1, sectionScroll / scrollableHeight))
      : 0;
    rotation = scrollProgress * 360;
    render();
    scrollTimeout = window.setTimeout(() => { isScrolling = false; }, 150);
  };

  timelineLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetIndex = Number(link.dataset.experienceTarget);
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= total || scrollableHeight <= 0) return;

      const currentRotation = ((rotation % 360) + 360) % 360;
      let targetRotation = targetIndex * anglePerItem;
      if (targetIndex === 0 && currentRotation > 180) targetRotation = 360;
      manualPauseUntil = performance.now() + 1800;
      window.scrollTo({
        top: section.offsetTop + (targetRotation / 360) * scrollableHeight,
        behavior: "smooth",
      });
    });
  });

  const autoRotate = (timestamp) => {
    if (!isScrolling && timestamp > manualPauseUntil) {
      rotation += .02;
      render();
    }
    window.requestAnimationFrame(autoRotate);
  };

  render();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.requestAnimationFrame(autoRotate);
});

document.querySelector("#year").textContent = new Date().getFullYear();
