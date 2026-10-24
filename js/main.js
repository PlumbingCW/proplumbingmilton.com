(function () {
  "use strict";
  var root = document.documentElement;
  root.className += " js";

  var drawer = document.querySelector(".mob-drawer");
  var overlay = document.querySelector(".mob-overlay");
  var toggle = document.querySelector(".menu-toggle");
  var closeBtn = document.querySelector(".mob-close");

  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("open", open);
    if (overlay) overlay.classList.toggle("open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    root.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) closeBtn.focus();
    if (!open && toggle) toggle.focus();
  }
  if (toggle) toggle.addEventListener("click", function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
  if (overlay) overlay.addEventListener("click", function () { setDrawer(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) setDrawer(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && drawer && drawer.classList.contains("open")) setDrawer(false);
  });

  var items = document.querySelectorAll(".acc-item");
  Array.prototype.forEach.call(items, function (item) {
    var head = item.querySelector(".acc-head");
    var plus = item.querySelector(".plus");
    if (!head) return;
    head.addEventListener("click", function () {
      var open = !item.classList.contains("open");
      item.classList.toggle("open", open);
      head.setAttribute("aria-expanded", open ? "true" : "false");
      if (plus) plus.textContent = open ? "−" : "+";
    });
  });

  var floatBtn = document.querySelector(".float-call");
  var footer = document.querySelector(".site-footer");
  if (floatBtn && footer && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      floatBtn.classList.toggle("is-hidden", entries[0].isIntersecting);
    }).observe(footer);
  }
})();
