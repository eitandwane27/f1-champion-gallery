document.querySelectorAll(".test").forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});
