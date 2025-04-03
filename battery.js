/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
// STEP 1d: Grab the <img> element to display the RoboHash avatar
const avatarImg = document.querySelector('#robot-avatar');

/* Functions
-------------------------------------------------- */

// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    console.log("Battery Status Updated:", battery);

    // STEP 3b: Update the charging status
    chargeStatus.textContent = battery.charging ? "Charging... ⚡" : "Discharging... 🔋";

    // STEP 3c: Update the charge level (rounded for better readability)
    const batteryPercentage = Math.round(battery.level * 100);
    chargeLevel.textContent = `${batteryPercentage}%`;
    chargeMeter.value = batteryPercentage;

    // STEP 5: Update the RoboHash avatar
    updateAvatar(batteryPercentage);
}

// STEP 5a: Create the updateAvatar() function
function updateAvatar(batteryPercentage) {
    const apiUrl = `https://robohash.org/${batteryPercentage}?set=set3`; // Unique robot based on % value
    avatarImg.src = apiUrl;
    avatarImg.alt = `Battery Level Avatar - ${batteryPercentage}%`;
}

/* Script Logic
-------------------------------------------------- */

// STEP 2a: Using the getBattery() method of the navigator object, 
// create a promise to retrieve the battery information
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        // STEP 2b: See what the battery object contains
        console.log("Battery API Supported:", battery);

        // STEP 3d: Update the battery information when the promise resolves
        updateBatteryStatus(battery);

        // STEP 4a: Event listener for changes to the charging status
        battery.addEventListener("chargingchange", () => updateBatteryStatus(battery));

        // STEP 4b: Event listener for changes to the charge level
        battery.addEventListener("levelchange", () => updateBatteryStatus(battery));
    }).catch(error => {
        console.error("Battery API Error:", error);
        chargeStatus.textContent = "Battery status unavailable.";
    });
} else {
    console.warn("Battery Status API not supported on this browser.");
    chargeStatus.textContent = "Battery API not supported.";
}

/* This script adapted from the excellent code examples found at:
   https://www.w3.org/TR/battery-status/#examples
   https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
   https://robohash.org/ for unique avatars */
