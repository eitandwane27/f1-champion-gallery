const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get("driver");
console.log("Driver ID from URL: ", driverId);
