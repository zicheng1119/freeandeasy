(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reading progress bar (article pages only) + back-to-top button
  function initScrollUI() {
    var article = document.querySelector(".main-article");
    var bar;
    if (article) {
      bar = document.createElement("div");
      bar.id = "reading-progress";
      document.body.appendChild(bar);
    }
    var top = document.createElement("button");
    top.id = "back-to-top";
    top.setAttribute("aria-label", "回到顶部");
    top.innerHTML = "↑";
    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});
    document.body.appendChild(top);

    function onScroll() {
      var h = document.documentElement;
      var scrolled = h.scrollTop;
      var height = h.scrollHeight - h.clientHeight;
      if (bar) bar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + "%";
      top.classList.toggle("show", scrolled > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

  // Image lightbox for article images not wrapped in a link
  function initLightbox() {
    var imgs = document.querySelectorAll(".article-content img");
if (!imgs.length) return;
    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = '<img alt="">';
    overlay.addEventListener("click", function () { overlay.classList.remove("show"); });
    document.body.appendChild(overlay);
var big = overlay.querySelector("img");
    imgs.forEach(function (img) {
      if (img.closest("a")) return;
  img.style.cursor = "zoom-in";
      img.addEventListener("click", function () {
        big.src = img.currentSrc || img.src;
        overlay.classList.add("show");
      });
    });
  }

  // Scroll entrance animations
  function initReveal() {
    var targets = document.querySelectorAll(
      ".article-list article, .widget, .main-article, .article-content img, .section-card"
    );
 if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    targets.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initScrollUI();
    initLightbox();
    initReveal();
  });
})();
