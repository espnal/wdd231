export const createNav = (links) => {
  const ul = document.createElement("ul");
  links.forEach((link) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${link.href}">${link.text}</a>`;
    ul.appendChild(li);
  });
  return ul;
};
