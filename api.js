//Global variables
var key = '8c7d66dc4206ce10';
var $jumbotron = $('.jumbotron');

//runs through data retrieved
  function searchCallback(data) {

//var for background picture
  var picture = data.weather;

//runs function to pull picture info
 var $img = background(picture);

//creates variables to append to DOM
  var content = $('#results');
  var $newDiv = $('<div>');
  var $cityName = $('<h1>').text(data.display_location.full);
  var $current = $('<p>').text('Current Tempature: '+data.temperature_string);
  var $humidity = $('<p>').text('Current Humidity: '+data.relative_humidity);
  var $realFeel = $('<p>').text('Feels Like: '+data.heat_index_f);
  var $weather = $('<p>').text('Current Conditions: '+data.weather);
  var $winds = $('<p>').text('Wind is coming from the '+data.wind_dir+' at '+data.wind_gust_mph+'mph');

//appends info to DOM
  $('.jumbotron').css({'background': 'url('+$img+') no-repeat center center', 'position': 'static'});
  $newDiv.append($cityName);
  $newDiv.append($current);
  $newDiv.append($humidity);
  $newDiv.append($realFeel);
  $newDiv.append($weather);
  $newDiv.append($winds);
  content.append($newDiv);
};
function condense(array) {
for(var i = 0; i > 3; i++) {
    var work = array[i];



    }
}
function searchForcast(array){
  var $newDiv1 = $('<div>');
  var $newDiv3 = $('<div>');
  var $newDiv2 = $('<div>');

  var $newH1 = $('<h1>');
  var $newH2 = $('<h1>');
  var $newH3 = $('<h1>');

  var per1for = $('#per1');
  var per2for = $('#per2');
  var per3for = $('#per3');
  var $per1Title = array[1].title;;

  var $per2Title = array[2].title;
  var $per3Title = array[3].title;
  var $per1Disc = array[1].fcttext;
  console.log($per1Disc);

  var $per2Disc = array[2].fcttext;
  var $per3Disc = array[3].fcttext;
  var $imgper1 = array[1].icon_url;
  console.log($imgper1);

  var $imgper2 = array[2].icon_url;
  var $imgper3 = array[3].icon_url;
  var period1 = '<img src = "'+$imgper1+'">\n'+$per1Disc;
  var period2 = '<img src = "'+$imgper2+'">\n'+$per2Disc;
  var period3 = '<img src = "'+$imgper3+'">\n'+$per3Disc;

  console.log(period1);
  $newH1.append($per1Title);
  per1for.append($newH1);
  $newDiv1.append(period1);
  per1for.append($newDiv1);

  $newH2.append($per2Title);
  per2for.append($newH2);
  $newDiv2.append(period2);
  per2for.append($newDiv2);

  $newH3.append($per3Title);
  per3for.append($newH3);
  $newDiv3.append(period3);
  per3for.append($newDiv3);
}

$(document).ready(function() {
	$('#search').on('click', function(e){
    var city = $('#city').val();
    var state = $('#state').val();
    alert('Gathering data for '+city +', '+state);
    search(state, city);
    forcast(state, city);
    radar(state, city);
	});
    $('.forcast').on('click', function(){
    $('div#forcast').slideToggle();
  });
});

//grabs background image off weather condition

function background(cond){
    var $img;
  if(cond == 'Rain' || cond == 'Thunderstorm'){
    $img = '\'thunderstorm.jpg\'';
  }else if(cond == 'Overcast' || cond == 'Cloudy' || cond == 'Mostly Cloudy'){
     $img = '\'cloudy.jpg\'';
  }else if(cond == 'Sunny' || cond == 'Clear') {
    $img = '\'sunny.jpg\'';
  }else if(cond == 'Partly Cloudy') {
    $img = '\'partly-cloudy.jpg\'';
  }else {
    $img = '\'jumbotron.jpg\''
  };
  return $img;
}

// gets json information

function search(state, city){
  var jqxhr = $.ajax ({
  type: 'GET',
  dataType: 'json',
  crossDomain: true,
  url: 'http://api.wunderground.com/api/'+key+'/conditions/q/'+state+'/'+city+'.json'
  }).always(function() {
      console.log('Ajax attempt complete.');
      }).done(function(data) {
      searchCallback(data['current_observation']);
      }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Ajax failed: ', textStatus);
    });
 }

function forcast(state, city){
  var jqxhr = $.ajax ({
  type: 'GET',
  dataType: 'json',
  crossDomain: true,
  url: 'http://api.wunderground.com/api/'+key+'/forecast/q/'+state+'/'+city+'.json'
  }).always(function() {
      console.log('Ajax attempt complete.');
      }).done(function(data) {
      searchForcast(data.forecast.txt_forecast.forecastday);
      }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Ajax failed: ', textStatus);
    });
 }
// function radar(state, city){
//     var jqxhr = $.ajax ({
//         type: 'GET',
//         dataType: 'jsonp',
//         crossDomain: true,
//         url: 'http://api.wunderground.com/api/'+key+'/animatedradar/q/'+state+'/'+city+'.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50'
//     }).always(function() {
//         console.log('Ajax attempt complete.');
//     }).done(function(data) {
//         $.parseXML(data);
//         console.log(data);
//     }).fail(function(jqXHR, textStatus, errorThrown) {
//         console.log('Ajax failed: ', textStatus);
//     });
// }