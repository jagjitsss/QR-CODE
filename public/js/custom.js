


$(document).ready((function(){
    getCityLocations();
}))
function getCityLocations () {
    $('#location_id').empty();
    $('#location_id')
                .append($('<option>', { value : "" })
                .text("Select Location"));

    var city_id = $("#city_id").val();
    if(!city_id) {
      return false;
    }
    var request = $.ajax({
        url: "/get-locations?city_id="+city_id,
        type: "GET",
      });
      
    request.done(function(data) {
       console.log(data)
       if(data.status) {
        $.each(data.data, function(key, value) {
            console.log(value)
            $('#location_id')
                .append($('<option>', { value : value.id })
                .text(value.location));
          });
       }

       if($("#location_id_").val()) {
           $("#location_id").val($("#location_id_").val());
       }
      
    });
    
    request.fail(function(jqXHR, textStatus) {
       alert( "Request failed: " + textStatus );
    });
}

function activeInactive(id){
    var isActive = $("#isActive_"+id).is(":checked") ? 1 : 0;
  
    var request = $.ajax({
            url: "/update-is-active?isActive="+isActive+"&id="+id,
            type: "GET",
    });
    
    request.done(function(data) {
       console.log("updated!!");
    });

    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });
}

var locations = [];
var counter = 0;
function initAutocomplete() {

 
  const options = {
    componentRestrictions: { country: "in" },
    //fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
  };
  var autocomplete = new google.maps.places.Autocomplete($("#location")[0], options);
  //autocomplete.setFields(["ChIJn7G1RJnuDzkRJbShn1OvRyM", "geometry", "57, Mohali Bypass, Phase 6, Sector 58, Sahibzada Ajit Singh Nagar"]);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var lat = place.geometry['location'].lat();
      var lng = place.geometry['location'].lng();
      console.log(place)
      var lati = $("#latitude").val(lat);
      var lngi = $("#lngtitude").val(lng);
      fillInAddress('', lat, lng);
  });
  
}

function fillInAddress(flag, latitude, longitude) {
  $("#map_id").show();
  var location_name = $("#location").val();
  locations.push([location_name, latitude, longitude, locations.length])
  $("#location").val("");

       
     saveQRCode(location_name, latitude, longitude);


var map = new google.maps.Map(document.getElementById('map_id'), {
zoom: 10,
center: new google.maps.LatLng(latitude, longitude),
mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < locations.length; i++) {  
marker = new google.maps.Marker({
  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
  map: map
});

google.maps.event.addListener(marker, 'click', (function(marker, i) {
  return function() {
    infowindow.setContent(locations[i][0]);
    infowindow.open(map, marker);
  }
})(marker, i));
}




  //   var lat = latitude;
  //   var lng = longitude;

  
  //  var myCenter = new google.maps.LatLng(lat,lng);
  //  var map_Canvas = document.getElementById("map");
  //  var mapOptions = {center: myCenter, zoom: 14 , scrollwheel: false,disableDefaultUI: false,mapTypeId: google.maps.MapTypeId.ROADMAP};
  //  var map = new google.maps.Map(document.getElementById("map_id"),mapOptions);   
  //  var marker = new google.maps.Marker({
  //   position: new google.maps.LatLng(lat, lng),
  //   map: map
  // });
} 

function downloadQRCode(){
  var a = document.createElement('a');
  a.href = "img.png";
  a.download = "output.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


function saveQRCode (location_name, latitude, longitude) { 
  var formData = new FormData();
        
  formData.append("location_name",location_name);
  formData.append("latitude",latitude);
  formData.append("longitude",longitude);
  formData.append("flag",'ajax');
  var data = {
    location_name:location_name,
    latitude:latitude,
    longitude:longitude,
    flag:'ajax'
  }

  var request = $.ajax({
    url: "/add-qr-code",
    type: "POST",
    type :  'post',
    cache: false, 
    data : data,
  });
  
  request.done(function(data) {
        console.log(data);

         
  var html = "<tr>"+

  "<td><img src='"+data.data+"' style='height: 79px;'></td>"+
  "<td>"+location_name+"</td>"+
  "<td>  <a href='#'  onclick='return confirm('Are you sure you want to delete?')' class='btn btn-danger'>Delete</a></td>"+
"</tr>";
$("#qr_code_body").append(html);      

    
  });

  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });

  counter++;
}