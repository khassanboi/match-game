import { setTemplate, renderPage } from "./src/routing.js";

//when application has started it renders about page
setTemplate();
renderPage("about");

//other page navigations
document.querySelectorAll(".page-render").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    renderPage(btn.dataset.value);
    document.querySelectorAll(".navbar__item").forEach((nav) => {
      nav.classList.remove("active");
    });
    e.currentTarget.closest("div").classList.add("active");
    // window.clearInterval(window.timer);
  });
});
