
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



//   1st option for using Axios:
//   I get an an Uncaught ReferenceError: axios is not defined

var API_KEY = "NvnKjvhsKILrfEgu-GyzIu83rkw5GlAz-b5mQM3PQBpUAk6F9SNGEOjkEUJ456d91ho6zi4gO9IdK2wAlzsYjIFItK1HG8y3TPoTVXj4iEAc_VMJIrHYF-0Sw-KbX3Yx"

axios({
  method:'get',
  url:'https://api.yelp.com/v3/businesses/search',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json"
  },
  responseType:'application/json',
  params: {
    location: "kyoto",
    term: "coffee",
    limit: 10,
  },
})
.then(function (data) {
  data.forEach((b) => {
    console.log("Name: ", b.name)
  })
});


//   2nd option: Using axios to call the Yelp API
//   I received an Uncaught ReferenceError: require is not defined 

// axios = require('axios').default;
// let API_KEY = "NvnKjvhsKILrfEgu-GyzIu83rkw5GlAz-b5mQM3PQBpUAk6F9SNGEOjkEUJ456d91ho6zi4gO9IdK2wAlzsYjIFItK1HG8y3TPoTVXj4iEAc_VMJIrHYF-0Sw-KbX3Yx"

// // REST
// let yelpREST = axios.create({
//   baseURL: "https://api.yelp.com/v3/",
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//     "Content-type": "application/json",
//   },
// })

// // Using the yelpREST helper defined above
// yelpREST("/businesses/search", {
//   params: {
//     location: "kyoto",
//     term: "coffee",
//     limit: 10,
//   },
// }).then(({ data }) => {
//   let { businesses } = data
//   businesses.forEach((b) => {
//     console.log("Name: ", b.name)
//   })
// })








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