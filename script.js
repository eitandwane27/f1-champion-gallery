// Card flip logic

document.querySelectorAll(".test").forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});

// Find all elements with data-driverid
const driverLinks = document.querySelectorAll("[data-driverid]");

// Add an eventlistener for navigation

driverLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const driverId = link.dataset.driverid;
        window.open(`drivers.html?driver=${driverId}`, "_blank");
    });
});
