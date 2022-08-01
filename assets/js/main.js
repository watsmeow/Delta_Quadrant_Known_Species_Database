const { species, encounter } = require("../../server/model/model");

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