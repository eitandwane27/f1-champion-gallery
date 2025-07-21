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
