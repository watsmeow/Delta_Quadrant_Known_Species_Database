const { species } = require("../../server/model/model");

document.addEventListener("touchstart", function() {},false);

$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('.scroll-top a').fadeIn();
    } else {
        $('.scroll-top a').fadeOut();
    }
});

$(document).ready(function() {
    $("#scroll-top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});

//CAROUSEL
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
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

//add encounter form submit button response message

$('#_form').submit(function(event) {
  alert("Encounter successfully added to database.")
})


function changeGlobal(speciesName, speciesList) {
  speciesList = JSON.parse(speciesList)
  for (let i = 0; i < speciesList.length; i++) {
    if (speciesList[i].name == speciesName) {

      let speciesPicture = 'data:' + speciesList[i].image.contentType + ';base64,' + speciesList[i].image.imageBase64

      document.getElementById('popUpHeading').innerText = speciesList[i].name;
      document.getElementById('popUpHomeworld').innerText = speciesList[i].homeworld;
      document.getElementById('popUpImage').src = speciesPicture
      document.getElementById('popUpLink').href = `/species/${speciesName}`
    }
  }
}