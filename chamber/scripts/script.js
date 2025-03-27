document.addEventListener("DOMContentLoaded", function () {
  const lastModifiedElement = document.getElementById("lastModified");
  const copyright = document.getElementById("copyr");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = "Last modified: " + document.lastModified;
    copyright.innerHTML =
      "&copy;" +
      new Date().getFullYear() +
      " Roguin Pena. All rights reserved.";
  } else {
    console.error("Element with ID 'lastModified' not found.");
  }
});
const links = [
  { text: "Home", href: "./" },
  { text: "Directory", href: "./directory.html" },
  { text: "Join", href: "https://github.com/espnal" },
  { text: "Discover", href: "https://www.linkedin.com/in/roguin-pena/" },
];
const createNav = (links) => {
  const ul = document.createElement("ul");
  links.forEach((link) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${link.href}">${link.text}</a>`;
    ul.appendChild(li);
  });
  return ul;
};
const nav = document.querySelector(".nav-link");
const nav2 = document.querySelector(".nav-link2");
nav.appendChild(createNav(links));
nav2.appendChild(createNav(links));
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-link2 ul");
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.innerHTML = navMenu.classList.contains("active")
      ? "&#10006;"
      : "&#9776;";
  });
});
const businessDataUrl = "./data/members.json";

async function loadBusinessCards() {
  try {
    const response = await fetch(businessDataUrl);
    if (!response.ok) throw new Error("Failed to fetch business data");

    const data = await response.json();

    if (data.businesses) {
      displayBusinessCards(data.businesses);
    } else {
      console.error("Unexpected JSON structure:", data);
    }
  } catch (error) {
    console.error("Error loading business data:", error);
  }
}

function displayBusinessCards(businesses) {
  const container = document.querySelector(".business-cards");
  container.innerHTML = "";
  let count = 0;
  businesses.forEach((business) => {
    if (count >= 3) return;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                    <img src="${business.imageURL}" alt="${business.name}">
                    <h2>${business.name}</h2>
                    <p>${business.streetAddress}</p>
                    <p>${business.cityStateZip}</p>
                    <p><strong>Phone:</strong> ${business.phoneNumber}</p>
                    <a href="${business.websiteURL}" target="_blank">Visit Website</a>
                    <p>${business.adcopy}</p>
                `;
    container.appendChild(card);
    count++;
  });
}

// Load business cards when the page loads
loadBusinessCards();
