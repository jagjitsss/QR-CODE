


$(document).ready((function(){
    getCityLocations();
}))
function getCityLocations () {
    $('#location_id').empty();

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

function initAutocomplete() {
 
  var autocomplete = new google.maps.places.Autocomplete($("#location")[0], {});
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      var lat = place.geometry['location'].lat();
      var lng = place.geometry['location'].lng();
    
      var lati = $("#latitude").val(lat);
      var lngi = $("#lngtitude").val(lng);
  });
  
}

function downloadQRCode(){
  var a = document.createElement('a');
  a.href = "img.png";
  a.download = "output.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

