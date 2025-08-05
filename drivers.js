const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get("driver");
console.log("Driver ID from URL: ", driverId);

// Intersection Observer for driver page animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add CSS for driver page animations
const style = document.createElement("style");
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .header-container {
        opacity: 0;
        transform: translateY(-30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .header-container.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .main-title {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .main-title.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .intro-bio {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        transition-delay: 0.1s;
    }
    
    .intro-bio.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .secondary-container {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        transition-delay: 0.2s;
    }
    
    .secondary-container.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .cars-driven {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        transition-delay: 0.3s;
    }
    
    .cars-driven.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stats-container {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        transition-delay: 0.4s;
    }
    
    .stats-container.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .team-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .team-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nested-li-container {
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
    
    .nested-li-container.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

async function loadDriverData() {
    try {
        const response = await fetch("drivers.json");
        console.log("Got the file");

        const data = await response.json();
        console.log("Drivers good");

        const driver = data.drivers.find((d) => d.id === driverId);
        console.log("Found the driver data: ", driver);

        if (!driver) {
            console.error("Driver not found:", driverId);
            document.body.innerHTML = `<div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                <h1>Driver Not Found</h1>
                <p>The driver with ID "${driverId}" could not be found.</p>
                <a href="index.html" style="color: #007bff; text-decoration: none;">← Back to Hall of Fame</a>
            </div>`;
            return;
        }
        /*/ When we do this:
        const driver = data.drivers.find(d => d.id === driverId);

        It's like:
        data.drivers   The whole array of ALL drivers [hamilton, senna, etc]
        driver         Just ONE driver we found {id: "hamilton", name: "Lewis"...}

        So:
        data.drivers.name      Won't work! Can't get .name from an array
        driver.name           Works! Gets name from the one driver we found*/

        //header
        document.querySelector(".driver-name").textContent = driver.name;

        // Set images with error handling
        const pic1Img = document.querySelector(".pic1 img");
        const pic2Img = document.querySelector(".pic2 img");
        const bioImg = document.querySelector(".drivers-pic img");

        if (driver.introP1 && pic1Img) {
            pic1Img.src = driver.introP1;
            pic1Img.onerror = () => {
                pic1Img.style.display = "none";
                console.log("Failed to load introP1 image:", driver.introP1);
            };
        }

        if (driver.introP2 && pic2Img) {
            pic2Img.src = driver.introP2;
            pic2Img.onerror = () => {
                pic2Img.style.display = "none";
                console.log("Failed to load introP2 image:", driver.introP2);
            };
        }

        if (driver.secondpic && bioImg) {
            bioImg.src = driver.secondpic;
            bioImg.onerror = () => {
                bioImg.style.display = "none";
                console.log("Failed to load bio image:", driver.secondpic);
            };
        }

        document.querySelector(".driver-signature").textContent =
            driver.signature || "";
        document.querySelector(".date-des").textContent = driver.birth;
        document.querySelector(".place-des").textContent = driver.place;

        async function loadDriverBio() {
            try {
                if (!driver.paragraph.text) return;

                const response = await fetch(driver.paragraph.text);
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);

                const content = await response.text();
                const bioContainer = document.querySelector(".bio");

                // Clear existing content but keep container structure
                bioContainer.innerHTML = "";

                // Process markdown paragraphs
                content
                    .split(/\n\s*\n/)
                    .filter((para) => para.trim() !== "")
                    .forEach((para) => {
                        const p = document.createElement("p");
                        p.className = "paragraph"; // Add the class here
                        p.textContent = para.trim();
                        bioContainer.appendChild(p);
                    });
            } catch (error) {
                console.error("Error loading driver bio:", error);
                document.querySelector(".bio").innerHTML =
                    '<p class="paragraph">Biography information is currently being updated.</p>';
            }
        }
        await loadDriverBio();

        // Dynamic team cards
        const teamsGrid = document.querySelector(".teams-grid");
        teamsGrid.innerHTML = ""; // Clear existing cards

        // Create team cards dynamically based on teamsCount
        for (let i = 1; i <= driver.teamsCount; i++) {
            const teamCard = document.createElement("div");
            teamCard.className = "team-card";

            teamCard.innerHTML = `
                <div class="team-image">
                    <img class="car${i}" src="${
                driver[`pic${i}`] || ""
            }" alt="Team ${i}" />
                    <div class="team-info">
                        <h3 class="team-name ff-f1">${
                            driver[`teamname${i}`] || `Team ${i}`
                        }</h3>
                        <p class="team-years ff-titillium">${
                            driver[`teamyears${i}`] || "Years"
                        }</p>
                    </div>
                </div>
            `;

            teamsGrid.appendChild(teamCard);
        }

        //stats
        document.querySelector(".gp").textContent = driver.stats.GPE;
        document.querySelector(".cp").textContent = driver.stats.CP;
        document.querySelector(".hrf").textContent = driver.stats.HRF;
        document.querySelector(".podium").textContent = driver.stats.PODIUM;
        document.querySelector(".hgp").textContent = driver.stats.HGP;
        document.querySelector(".pp").textContent = driver.stats.PP;
        document.querySelector(".wc").textContent = driver.stats.WC;
        document.querySelector(".dnf").textContent = driver.stats.DNF;

        // Set up animations after content is loaded
        setTimeout(() => {
            // Observe header
            const header = document.querySelector(".header-container");
            if (header) observer.observe(header);

            // Observe main sections
            const mainSections = document.querySelectorAll(
                ".main-title, .intro-bio, .secondary-container, .cars-driven, .stats-container"
            );
            mainSections.forEach((section, index) => {
                section.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(section);
            });

            // Observe team cards with staggered delay
            const teamCards = document.querySelectorAll(".team-card");
            teamCards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 0.05}s`;
                observer.observe(card);
            });

            // Observe stats items with staggered delay
            const statItems = document.querySelectorAll(".nested-li-container");
            statItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.02}s`;
                observer.observe(item);
            });
        }, 100);
    } catch (error) {
        console.log("Error:", error);
    }
}
loadDriverData();
