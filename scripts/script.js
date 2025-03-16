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

const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];
function displayCourses(filteredCourses) {
  const container = document.getElementById("course-container");
  container.innerHTML = "";
  if (filteredCourses.length === 0) {
    container.innerHTML = "<p>No courses available</p>";
    return;
  }
  filteredCourses.forEach((course) => {
    const div = document.createElement("div");
    div.className = `course ${course.subject.toLowerCase()} ${
      course.completed ? "completed" : "notcompleted"
    }`;
    div.textContent = `${course.subject} ${course.number}`;
    container.appendChild(div);
  });
  const totalCredits = filteredCourses
    .filter((course) => course.completed)
    .reduce((sum, course) => sum + course.credits, 0);
  document.getElementById(
    "total-credits"
  ).textContent = `Total Credits: ${totalCredits}`;
}

function filterCourses(filter) {
  if (filter === "All") {
    displayCourses(courses);
  } else {
    displayCourses(courses.filter((course) => course.subject === filter));
  }
}

displayCourses(courses);
const links = [
  { text: "Home", href: "./" },
  { text: "Chamber", href: "#" },
  { text: "GitHub Profile", href: "https://github.com/espnal" },
  { text: "LinkedIn", href: "https://www.linkedin.com/in/roguin-pena/" },
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
const nav = document.querySelector("nav");
nav.appendChild(createNav(links));

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.innerHTML = navMenu.classList.contains("active")
      ? "&#10006;"
      : "&#9776;";
  });
});
