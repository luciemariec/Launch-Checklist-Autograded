// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
//HTML formatting for our missionTarget
let missionTarget = document.getElementById("missionTarget");
missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `
}
//Function to validate input data
function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    }
    if (!isNaN(testInput)) {
        return "Is a Number";
    }
    if (typeof testInput === "string") {
        return "Not a Number";
    }
    else return "Invalid Input";
}
//Function to handle form submission - elements from HTML
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyItems");
    console.log(fuelLevel);
    console.log(cargoLevel);

    // Validate input data and provide appropriate alerts
    if (validateInput(pilot) !== "Not a Number" || validateInput(copilot) !== "Not a Number" || validateInput(fuelLevel) !== "Is a Number" || validateInput(cargoLevel) !== "Is a Number") {
        alert("All fields are required!");
        return;
    }

    // Update status messages and determines if shuttle is ready to launch
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    if (fuelLevel < 10000) {
        faultyItems.style.visibility = 'visible';
        fuelStatus.innerHTML = 'Fuel level too low for launch';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'red';
    } else {
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
    }

    if (cargoLevel > 10000) {
        faultyItems.style.visibility = 'visible';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'red';
    } else {
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
    }

    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        launchStatus.innerHTML = 'Shuttle is Ready for Launch';
        launchStatus.style.color = 'green';
    }
}
//Function to fetch planet data from a JSON API
async function myFetch() {
    let planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json");
    let data = await planetsReturned.json();
    return data;
}
//Function to pick a random planet from the provided array of planets
function pickPlanet(planets) {
    let planetPicked = planets[Math.floor(Math.random() * planets.length)];
    return planetPicked;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;