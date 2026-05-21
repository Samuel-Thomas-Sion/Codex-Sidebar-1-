
// =========================
// CODEX PULSE SYSTEM
// =========================

setInterval(() => {

  document
    .querySelectorAll(".hover-card")
    .forEach(card => {

      card.style.transform = "translateY(-2px)";

      setTimeout(() => {
        card.style.transform = "";
      }, 350);

    });

}, 10000);


// =========================
// SCAN FLASH SYSTEM
// =========================

setInterval(() => {

  document
    .querySelectorAll(".scan-line")
    .forEach(scan => {

      scan.style.opacity = "1";

      setTimeout(() => {
        scan.style.opacity = ".4";
      }, 400);

    });

}, 5000);


// =========================
// TACTICAL HOVER AUDIO READY
// =========================

document
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener("mouseenter", () => {

      // future hover sound system

    });

});
