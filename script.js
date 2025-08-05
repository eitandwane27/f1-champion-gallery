// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all driver cards and other elements
document.addEventListener("DOMContentLoaded", () => {
    // Observe driver cards
    const driverCards = document.querySelectorAll(".test");
    driverCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });

    // Observe header
    const header = document.querySelector("header");
    if (header) {
        header.style.opacity = "0";
        header.style.transform = "translateY(-20px)";
        header.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        observer.observe(header);
    }
});

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .test {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .test.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    header {
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.4s ease, transform 0.4s ease;
    }
    
    header.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

document.querySelectorAll(".test").forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});

//Find all elements with data-driverid
const driverLinks = document.querySelectorAll("[data-driverid]");

//add an eventlistener
driverLinks.forEach((link) => {
    // if clicked
    link.addEventListener("click", () => {
        //get the driver id : the driverid is the one on the html
        const driverId = link.dataset.driverid;

        window.open(`drivers.html?driver=${driverId}`, "_blank");
        //if Hamilton =  driverId = "hamilton"
        //if Senna = driverId = "senna"
    });
});
