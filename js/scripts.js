
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


// Write html form data to a txt file:
function WriteToFile(passForm)
{
var fso = new ActiveXObject("Scripting.FileSystemObject");
var s = fso.CreateTextFile("./fileSaver.txt", true);
s.WriteLine("HI");
console.log(s);
s.Close();
}


// Ajax request for getting yelp api:

$(window).on("load", function() {
  var API_KEY = "NvnKjvhsKILrfEgu-GyzIu83rkw5GlAz-b5mQM3PQBpUAk6F9SNGEOjkEUJ456d91ho6zi4gO9IdK2wAlzsYjIFItK1HG8y3TPoTVXj4iEAc_VMJIrHYF-0Sw-KbX3Yx"
  var web = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="
  
  function milesToMeters(miles) {
    return miles * 1609
  }

  $('#zip').focus(function() {
    $('#zip').val("")
  })

  $('#submit').on('click', function(event) {
    event.preventDefault();  
    var y = "skate"
    var x = $('#zip').val()
    var q = $('#radius option:selected').val()
    var z = milesToMeters(q)


    $.ajax({
      type: "GET",
      url: web + y + "&location=" + x + "&radius=" + z,
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "expires_in": 15551999,
        "token_type": "Bearer"
      },
      success: function(data) {
        // Grab the results from the API JSON return
        var totalresults = data.total;
        // If our results are greater than 0, continue
        if (totalresults > 0){
            // Display a header on the page with the number of results
            $('#found').append('<h5>We discovered ' + totalresults + ' results!</h5><br>');
            // Itirate through the JSON array of 'businesses' which was returned by the API
            $.each(data.businesses, function(i, item) {
                // Store each business's object in a variable
                var id = item.id;
                var alias = item.alias;
                var phone = item.display_phone;
                var image = item.image_url;
                var name = item.name;
                var rating = item.rating;
                var reviewcount = item.review_count;
                var address = item.location.address1;
                var city = item.location.city;
                var state = item.location.state;
                var zipcode = item.location.zip_code;
                // Append our result into our page
                $('#results').append('<div id="' + id + '" style="margin-top:20px;margin-bottom:20px;margin-left:40px;margin-right:40px;"><img src="' + image + '" style="width:250px;height:200px;"><br>Name: <b>' + name + '</b> <br> Address: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>Phone: ' + phone + '<br>Rating: ' + rating + ' with ' + reviewcount + ' reviews.</div>');
          });
        } else {
            // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
            $('#results').append('<h5>We discovered no results!</h5>');
        }
      }  
    })  
  })  
})

      //     console.log(data);
      //     // Output the result in an element with id="searchOutput"
      //     $('#searchResults').append(JSON.stringify(data))
      //     // This never worked:
      //     // $('#searchResults').innerHTML = b.image_url + "Name: " + b.name + "Location: " + b.location + "Phone: "
      //     // + b.display_phone + "Rating: " + b.rating + "Price: " + b.price;
      // },
      // error: function (data) {
      //   console.error("Sorry, there was a problem!");
      // },
    // })
//   })
// })



// Maybe this is a solution to parsing the retrned json data:

// var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-chloe&location=boston";

//          $.ajax({
//             url: myurl,
//             headers: {
//              'Authorization':'Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//          },
//             method: 'GET',
//             dataType: 'json',
//             success: function(data){
//                 // Grab the results from the API JSON return
//                 var totalresults = data.total;
//                 // If our results are greater than 0, continue
//                 if (totalresults > 0){
//                     // Display a header on the page with the number of results
//                     $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
//                     // Itirate through the JSON array of 'businesses' which was returned by the API
//                     $.each(data.businesses, function(i, item) {
//                         // Store each business's object in a variable
//                         var id = item.id;
//                         var alias = item.alias;
//                         var phone = item.display_phone;
//                         var image = item.image_url;
//                         var name = item.name;
//                         var rating = item.rating;
//                         var reviewcount = item.review_count;
//                         var address = item.location.address1;
//                         var city = item.location.city;
//                         var state = item.location.state;
//                         var zipcode = item.location.zip_code;
//                         // Append our result into our page
//                         $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
//                   });
//                 } else {
//                     // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
//                     $('#results').append('<h5>We discovered no results!</h5>');
//                 }
//             }
//          });      








// I moved this from main.js:

// 'use strict';
 
// // const yelp = require(['yelp-fusion']);
// // const client = yelp.client('NvnKjvhsKILrfEgu-GyzIu83rkw5GlAz-b5mQM3PQBpUAk6F9SNGEOjkEUJ456d91ho6zi4gO9IdK2wAlzsYjIFItK1HG8y3TPoTVXj4iEAc_VMJIrHYF-0Sw-KbX3Yx');
 
// // client.search({
// //   term: 'Four Barrel Coffee',
// //   location: 'san francisco, ca',
// // }).then(response => {
// //   console.log(response.jsonBody.businesses[0].name);
// // }).catch(e => {
// //   console.log(e);
// // });
// require(['axios'], function (axiosModule) {
//   const axios = axiosModule;
//   let API_KEY = "NvnKjvhsKILrfEgu-GyzIu83rkw5GlAz-b5mQM3PQBpUAk6F9SNGEOjkEUJ456d91ho6zi4gO9IdK2wAlzsYjIFItK1HG8y3TPoTVXj4iEAc_VMJIrHYF-0Sw-KbX3Yx"

//   // REST
//   let yelpREST = axios.create({
//     baseURL: "https://api.yelp.com/v3/",
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//       "Content-type": "application/json",
//     },
//   });

//   // Using the yelpREST helper defined above
//   yelpREST("/businesses/search", {
//     params: {
//       location: "kyoto",
//       term: "coffee",
//       limit: 10,
//     },
//   }).then(({ data }) => {
//     let { businesses } = data
//     businesses.forEach((b) => {
//       console.log("Name: ", b.name)
//     })
//   });
// });




//   1st option for using Axios:
//   I get an an Uncaught ReferenceError: axios is not defined

// var API_KEY = "NvnKjvhsKILrfEgu-GyzIu83rkw5GlAz-b5mQM3PQBpUAk6F9SNGEOjkEUJ456d91ho6zi4gO9IdK2wAlzsYjIFItK1HG8y3TPoTVXj4iEAc_VMJIrHYF-0Sw-KbX3Yx"

// axios({
//   method:'get',
//   url:'https://api.yelp.com/v3/businesses/search',
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//     "Content-type": "application/json"
//   },
//   responseType:'application/json',
//   params: {
//     location: "kyoto",
//     term: "coffee",
//     limit: 10,
//   },
// })
// .then(function (data) {
//   data.forEach((b) => {
//     console.log("Name: ", b.name)
//   })
// });


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


//  Option 3:
//  Here I get the erro that require is not defined...

// let yelpAPI = require('yelp-api')
// let API_KEY = "NvnKjvhsKILrfEgu-GyzIu83rkw5GlAz-b5mQM3PQBpUAk6F9SNGEOjkEUJ456d91ho6zi4gO9IdK2wAlzsYjIFItK1HG8y3TPoTVXj4iEAc_VMJIrHYF-0Sw-KbX3Yx"
// let yelp = new yelpAPI(apiKey)


// // Set any parameters, if applicable (see API documentation for allowed params)
// let params = [{ location: '20008' }];
 
// // Call the endpoint
// yelp.query('businesses/search', params)
// .then(data => {
//   // Success
//   console.log(data);
// })
// .catch(err => {
//   // Failure
//   console.log(err);
// });







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
// }, 1000):
