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
