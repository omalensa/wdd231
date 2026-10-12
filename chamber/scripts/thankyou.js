const params = new URLSearchParams(window.location.search);

document.getElementById("display-fname").textContent = params.get("fname") || "Not provided";
document.getElementById("display-lname").textContent = params.get("lname") || "Not provided";
document.getElementById("display-email").textContent = params.get("email") || "Not provided";
document.getElementById("display-phone").textContent = params.get("phone") || "Not provided";
document.getElementById("display-organization").textContent = params.get("organization") || "Not provided";
document.getElementById("display-timestamp").textContent = params.get("timestamp") || "Not provided";