console.log("Protectors Of The Codex UI System Online");

document.querySelectorAll(".hover-card").forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-3px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0px)";
  });

});
