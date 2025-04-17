import { createNav } from "./nav.js";
document.addEventListener("DOMContentLoaded", function () {
  // Footer info
  const lastModifiedElement = document.getElementById("lastModified");
  const copyright = document.getElementById("copyr");
  if (lastModifiedElement && copyright) {
    lastModifiedElement.textContent = "Last modified: " + document.lastModified;
    copyright.innerHTML =
      "&copy;" +
      new Date().getFullYear() +
      " Roguin Pena. All rights reserved.";
  }

  // Navigation links
  const links = [
    { text: "Home", href: "./index.html" },
    { text: "Destination", href: "./destination.html" },
    { text: "Book now", href: "./booknow.html" },
  ];

  const nav1 = document.querySelector(".nav-link");
  const nav2 = document.querySelector(".nav-link2");

  if (nav1 && nav2) {
    nav1.appendChild(createNav(links));
    nav2.appendChild(createNav(links));

    const hamburger = document.querySelector(".hamburger");
    const navMenu = nav2.querySelector("ul");

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.innerHTML = navMenu.classList.contains("active")
          ? "&#10006;"
          : "&#9776;";
      });
    }
  }

  // Active link highlight
  const allLinks = document.querySelectorAll(".nav-link a, .nav-link2 a");
  const currentPage = location.pathname.split("/").pop().replace("./", "");

  allLinks.forEach((link) => {
    const linkHref = link.getAttribute("href").replace("./", "");
    if (linkHref === currentPage) {
      link.classList.add("activea");
    }
  });

  // Card display from places.json (for destination.html)
  const container = document.getElementById("grid-container");

  if (container) {
    fetch("data/places.json")
      .then((response) => response.json())
      .then((data) => displayCards(data.places))
      .catch((error) => console.error("Error loading data:", error));

    function normalizeId(text) {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
    }

    function displayCards(items) {
      container.innerHTML = "";

      items.forEach((item) => {
        let id = normalizeId(item.name);

        const card = document.createElement("div");
        card.classList.add("card2");

        card.innerHTML = `
          <figure>
            <img loading="lazy" src="${item.image}" alt="${item.name}">
          </figure>
          <hr>
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <p><strong>Activity:</strong> ${item.highlight_activity}</p>
          <button class="budget-btn" data-id="${id}">Budget</button>
        `;

        container.appendChild(card);

        if (item.prices) {
          const modal = document.createElement("div");
          modal.classList.add("modal");
          modal.id = `modal-${id}`;
          modal.innerHTML = `
            <div class="modal-content">
              <span class="close" data-id="${id}">&times;</span>
              <div class="modal-cont-sm">
              <h3>Budget for ${item.name}</h3>
              <ul>
                <li><strong>Flight:</strong> $${item.prices.flight}</li>
                <li><strong>Hotel:</strong> $${item.prices.hotel}</li>
                <li><strong>Tour:</strong> $${item.prices.tour}</li>
              </ul>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
        }
      });

      // Event listeners para mostrar/ocultar modal
      document.querySelectorAll(".budget-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          const modal = document.getElementById(`modal-${id}`);
          if (modal) {
            modal.style.display = "block";
          }
        });
      });

      document.querySelectorAll(".modal .close").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          const modal = document.getElementById(`modal-${id}`);
          if (modal) {
            modal.style.display = "none";
          }
        });
      });
    }
  }
});
