var slideIndex = 1;

$(document).ready(function () {
  console.log("test");
  showSlides(slideIndex);
  showPanel("student-panel")
});

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("quizSlide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// =======================================

var unitSlideIndex = 1;

$(document).ready(function () {
  console.log("test");
  showUnitSlides(unitSlideIndex);
});

function plusUnitSlides(n) {
  showUnitSlides(unitSlideIndex += n);
}

function currentUnitSlide(n) {
  showUnitSlides(unitSlideIndex = n);
}

function showUnitSlides(n) {
  var i;
  var slides = document.getElementsByClassName("unitSlide");
  var dots = document.getElementsByClassName("unitDot");
  if (n > slides.length) {unitSlideIndex = 1}
  if (n < 1) {unitSlideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[unitSlideIndex-1].style.display = "block";
  dots[unitSlideIndex-1].className += " active";
}

// =======================================

function showPanel(panel) {
  var classPanel = document.getElementById("class-panel");
  var studentPanel = document.getElementById("student-panel");

  classPanel.style.display = "none";
  studentPanel.style.display = "none";

  if(panel == "class-panel")
  {
    classPanel.style.display = "block";
  }
  else {
    studentPanel.style.display = "block";
  }
}
