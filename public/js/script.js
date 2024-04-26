document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");

  searchBtn.addEventListener("click", function () {
    searchBar.style.display = "block";
    this.setAttribute("aria-expanded", "true");
    searchInput.focus();
  });
});
