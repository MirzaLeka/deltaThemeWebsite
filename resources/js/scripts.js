
var arrayTitle = [
   "Getting Started",
    "Purchasing Questions",
    "Usage Guides",
    "Troubleshooting"
];
var arraySubT = [
    "Questions about Lotus Themes products and services",
    "All you need to know about shopping at Lotus Themes",
    "Instructions related to themes installation and usage",
    "Guidelines in case something goes wrong"
];
var arrayPic = [];

var containerContent = '';
for(var i = 0; i < arrayTitle.length; i++) {
  containerContent += "<div class='col-sm-6 customCSS'>"
    + "<div class='col-sm-3'>"
    + "<img class='containerImg' src='../resources/img/arrowImg.png' />"
    + "</div>"
    + "<div class='col-sm-9'>"
    + "<h3 class='arrayTAndS'>" + arrayTitle[i] + "</h3>"
    + "<p class='arrayTAndS'>" + arraySubT[i] + "</p>"
    + "</div>"
    + "</div>";
}

$("#row").html(containerContent);

