(function () {
  var toggle = document.getElementById("wah-nav-toggle");
  var burger = document.getElementById("wah-burger");
  if (!toggle || !burger) return;

  var lastFocus = null;

  function setOpen(open) {
    document.documentElement.classList.toggle("wah-lock", open);
    document.body.classList.toggle("wah-lock", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function sync() {
    var open = toggle.checked;
    setOpen(open);
    if (open) {
      lastFocus = document.activeElement;
      var first = document.querySelector(".wah-drawer .wah-cat-summary");
      if (first) first.focus();
    } else if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  toggle.addEventListener("change", sync);
  setOpen(toggle.checked);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.checked) {
      toggle.checked = false;
      sync();
    }
  });
})();
