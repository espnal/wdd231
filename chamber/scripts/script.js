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
  { text: "Join", href: "./join.html" },
  { text: "Discover", href: "./discover.html" },
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
if (nav && nav2) {
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
}
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
  if (!container) return;
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

loadBusinessCards();
document.addEventListener("DOMContentLoaded", function () {
  // Cargar datos desde el JSON
  fetch("data/places.json")
    .then((response) => response.json())
    .then((data) => displayCards(data.places))
    .catch((error) => console.error("Error loading data:", error));

  function displayCards(items) {
    const container = document.getElementById("grid-container");
    const textContainer = document.getElementById("text-container"); // Fixed variable name
    container.innerHTML = "";
    textContainer.innerHTML = ""; // Clear previous modals

    items.forEach((item) => {
      let id = item.name.toLowerCase().replace(/\s+/g, "-"); // Convert name to a valid ID

      const card = document.createElement("div");
      card.classList.add("card2");

      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.id = id;

      const moreInf = document.createElement("div");
      moreInf.classList.add("modal-content");

      card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img loading="lazy" src="${item.imageURL}" alt="${item.name}" >
            </figure>
            <button onclick="openModal('${id}')">Learn More</button>`;

      moreInf.innerHTML = `
            <span class="close" onclick="closeModal('${id}')">&times;</span>
            <address>${item.streetAddress}</address>
            <p>${item.adcopy}</p>`;

      modal.appendChild(moreInf);
      container.appendChild(card);
      textContainer.appendChild(modal);
    });
  }

  // LocalStorage para el mensaje de visitante
  const visitorMessage = document.getElementById("visitor-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitorMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitDate = new Date(parseInt(lastVisit));
    const diffTime = now - lastVisitDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
      visitorMessage.textContent = `You last visited ${diffDays} ${
        diffDays === 1 ? "day" : "days"
      } ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
});
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
