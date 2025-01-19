document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo");
  const logoText = document.getElementById("logo-text");
  const splashScreen = document.getElementById("splash-screen");

  setTimeout(function () {
    logo.classList.add("visible");
    logoText.classList.add("visible");
  }, 500);

  setTimeout(function () {
    logo.classList.remove("visible");
    logoText.classList.remove("visible");
    setTimeout(function () {
      splashScreen.style.display = "none";
      document.getElementById("home-page").style.display = "block";
    }, 500);
  }, 2000);
});
