const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get("driver");
console.log("Driver ID from URL: ", driverId);

async function loadDriverData() {
    try {
        const response = await fetch("drivers.json");
        console.log("Got the file");

        const data = await response.json();
        console.log("Drivers good");

        const driver = data.drivers.find((d) => d.id === driverId);
        console.log("Found the driver data: ", driver);
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

        document.querySelector(".pic1 img").src = driver.introP1;
        document.querySelector(".driver-signature").textContent =
            driver.signature;
        document.querySelector(".pic2 img").src = driver.introP2;
        // img if inside the div

        //bio
        document.querySelector(".drivers-pic img").src = driver.secondpic;
        document.querySelector(".date-des").textContent = driver.birth;
        document.querySelector(".place-des").textContent = driver.place;

        async function loadDriverBio() {
            try {
                const response = await fetch(driver.paragraph.text);
                const content = await response.text();

                const paragraphs = content.split("\n\n");
                console.log("Paragraphs split:", paragraphs);
                const pElements = document.querySelectorAll(".paragraph p");

                paragraphs.forEach((text, index) => {
                    if (pElements[index]) {
                        pElements[index].textContent = text.trim();
                    }
                });
            } catch (error) {
                console.error("Error loading driver bio:", error);
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
    } catch (error) {
        console.log("Error:", error);
    }
}
loadDriverData();
