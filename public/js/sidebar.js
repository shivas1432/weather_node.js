/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./resources/js/sidebar.js ***!
  \*********************************/
document.addEventListener('DOMContentLoaded', function () {
  // Update the date element if it exists
  var dateElement = document.getElementById('date');
  if (dateElement) {
    dateElement.textContent = new Date().toLocaleDateString();
  } else {
    console.error('Date element not found.');
  }

  // Toggle the sidebar collapsed state based on localStorage
  var expandBtn = document.querySelector(".expand-btn");
  if (expandBtn) {
    if (localStorage.getItem("sidebar-collapsed") === "true") {
      document.body.classList.add("collapsed");
    } else {
      document.body.classList.remove("collapsed");
    }
    expandBtn.addEventListener("click", function () {
      document.body.classList.toggle("collapsed");

      // Save the collapsed state in localStorage
      if (document.body.classList.contains("collapsed")) {
        localStorage.setItem("sidebar-collapsed", "true");
      } else {
        localStorage.setItem("sidebar-collapsed", "false");
      }
    });
  } else {
    console.error('Expand button not found.');
  }

  // Highlight the active sidebar link
  var allLinks = document.querySelectorAll(".sidebar-links a");
  if (allLinks.length > 0) {
    allLinks.forEach(function (elem) {
      elem.addEventListener("click", function () {
        var hrefLinkClick = elem.href;
        allLinks.forEach(function (link) {
          if (link.href === hrefLinkClick) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      });
    });
  } else {
    console.error('No sidebar links found.');
  }

  // Toggle the main items
  var mainItems = document.querySelectorAll(".main-item");
  if (mainItems.length > 0) {
    mainItems.forEach(function (mainItem) {
      mainItem.addEventListener("click", function () {
        mainItem.classList.toggle("main-item--open");
      });
    });
  } else {
    console.error('No main items found.');
  }
});
/******/ })()
;