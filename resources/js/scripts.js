
let arrayTitle = [
   "Getting Started",
    "Purchasing Questions",
    "Usage Guides",
    "Troubleshooting"
];
let arraySubT = [
    "Questions about Lotus Themes products and services",
    "All you need to know about shopping at Lotus Themes",
    "Instructions related to themes installation and usage",
    "Guidelines in case something goes wrong"
];
let arrayPic = [];

let containerContent = '';
for(let i = 0; i < arrayTitle.length; i++) {
containerContent += `<div class='col-sm-6 customCSS'>
<div class='col-sm-3'>
<img src='http://www.clker.com/cliparts/l/u/5/P/D/A/arrow-50x50-md.png' />
</div>
<div class='col-sm-9'>
<h3>${arrayTitle[i]}</h3>
<p>${arraySubT[i]}</p>
</div>
</div>`;
}

$("#row").html(containerContent);

