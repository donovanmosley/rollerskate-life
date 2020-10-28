//Navigation hamburger click function:
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  if (nav.className != 'active') {nav.className = 'active';}
  else {nav.className = '';}
});

// Read and parse an external file (such as JSON or CSV) into your application and display some data from that in your app
// Maintenance Guide Section:

fetch('manual.json')
  .then(res => res.json())
  .then(data => appendData(data))
  .catch(error => console.error("Something went wrong with retreiving the manual data", error));

function appendData(data) {
  var sel = document.getElementById("cmbitems");

  for (var i = 0; i <data.length; i++) {
    var opt = document.createElement('option');
    opt.appendChild( document.createTextNode(data[i].topic));
    opt.value = '{"description":"' + data[i].description + '", "imagePath":"' + data[i].image + '"}';
    sel.appendChild(opt);
  }
}

function selectValue(sel) {
  var selectData = JSON.parse(sel.value);
  console.log(selectData);
  var input = document.getElementById('txtprice');
  input.value = selectData.description;
  var image = document.getElementById('imageId');
  image.setAttribute("src", selectData.imagePath)
}













//Using Fetch to call the Yelp API:
// cors solution #1:
// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer tXRkZsFn77Nq3R-Ucvl-G6Soe3J4b2rFX5rdS9GRYmZ4Hzas2-LjABrAx397enuHY-csf_5xC9cFWLiDxFMK1KlkYzgwXhP4qbB4sJe3C3brz7VURUe5d3m70HiRX3Yx");
// myHeaders.append("Cookie", "__cfduid=db290300ecfe95ec1fe3bc92c388c3c991586618117");
// myHeaders.append("Access-Control-Allow-Origin", "*");

// var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
// var targetUrl = 'https://api.yelp.com/v3/businesses/search'

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };


// fetch(proxyUrl + targetUrl)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));



// fetch('https://api.yelp.com/v3/businesses/search')
//     .then(res => res.json())
//     .then(data => console.log(data))





//Countdown Timer:    
// Set the date we're counting down to
// var countDownDate = new Date("Jul 24, 2021 15:37:25").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;
    
//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   // Output the result in an element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);