$(document).ready((function () {
	getCityLocations();
}))

function getCityLocations() {
	$('#location_id').empty();
  $('#vehicle_id').empty();
	$('#location_id')
		.append($('<option>', {
				value: ""
			})
			.text("Select Location"));

  $('#vehicle_id')
		.append($('<option>', {
				value: ""
			})
			.text("Select Vehicle"));

	var city_id = $("#city_id").val();
	if (!city_id) {
		return false;
	}
	var request = $.ajax({
		url: "/get-locations?city_id=" + city_id,
		type: "GET",
	});

	request.done(function (data) {
		if (data.status) {
			$.each(data.location, function (key, value) {
				var lat_long = {
					id: value.id,
					latitude: value.latitude,
					lngtitude: value.lngtitude
				}
				$('#location_id')
					.append($('<option>', {
							value: JSON.stringify(lat_long)
						})
						.text(value.location));
			});

      $.each(data.vehicle, function (key, value) {
				 var driver_name = value.driver_name +' '+(value.vehicle_number);
				$('#vehicle_id')
					.append($('<option>', {
							value: value.id
						})
						.text(driver_name));
			});
		}

		if ($("#location_id_").val()) {
			$("#location_id").val($("#location_id_").val());
		}

	});

	request.fail(function (jqXHR, textStatus) {
		alert("Request failed: " + textStatus);
	});
}

function activeInactive(id) {
	var isActive = $("#isActive_" + id).is(":checked") ? 1 : 0;

	var request = $.ajax({
		url: "/update-is-active?isActive=" + isActive + "&id=" + id,
		type: "GET",
	});

	request.done(function (data) {
		console.log("updated!!");
	});

	request.fail(function (jqXHR, textStatus) {
		alert("Request failed: " + textStatus);
	});
}

var locations = [];
var checkPoints = [];
var counter = 0;

function initAutocomplete() {


	const options = {
		componentRestrictions: {
			country: "in"
		},
		//fields: ["address_components", "geometry", "icon", "name"],
		strictBounds: false,
		types: ["establishment"],
	};
	var autocomplete = new google.maps.places.Autocomplete($("#location")[0], options);
	//autocomplete.setFields(["ChIJn7G1RJnuDzkRJbShn1OvRyM", "geometry", "57, Mohali Bypass, Phase 6, Sector 58, Sahibzada Ajit Singh Nagar"]);

	google.maps.event.addListener(autocomplete, 'place_changed', function () {
		var place = autocomplete.getPlace();
		var lat = place.geometry['location'].lat();
		var lng = place.geometry['location'].lng();
		var lati = $("#latitude").val(lat);
		var lngi = $("#lngtitude").val(lng);
		if ($("#location").attr('placeholder') == "Checkpoint") {
			fillInAddress('', lat, lng);
		}

	});

}
var map;
var marker;
var geocoder;
var checkpoint_no_unique;
function fillInAddress(flag, latitude, longitude) {
	$("#map_id").show();
	
	var center_latitude = $("#center_latitude").val();
	var center_lngtitude = $("#center_lngtitude").val();
	map = new google.maps.Map(document.getElementById('map_id'), {
		zoom: 15,
		center: new google.maps.LatLng(center_latitude, center_lngtitude),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
        strictBounds: true,
	});
	if (flag == "showMap") {
		return false;
	}
	if(flag != 'remove') {
		var location_name = $("#location").val();
		locations.push([location_name, latitude, longitude, locations.length])
		$("#location").val("");
		saveQRCode(-1, location_name, latitude, longitude);
		
	}
	
	google.maps.event.addListener(map, 'click', function(event) {
		var result = [event.latLng.lat(), event.latLng.lng()];
		
	});
	geocoder = new google.maps.Geocoder();
	addMarker();
	
}




function addMarker(){
  var infowindow = new google.maps.InfoWindow();

	var marker, i;


	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			draggable: true,
			animation: google.maps.Animation.DROP,
			//originalPos: locations[i][1]+'-'+locations[i][2],
			counter_index:i
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]+' '+locations[i][1]+' '+locations[i][2]);
				infowindow.open(map, marker);
			}
		})(marker, i));
		//markers.push(marker);
		google.maps.event.addListener(marker, 'dragend', function () {
			//console.log(this.originalPos)
			// infoWindow.setContent("marker originally at this position: " + this.originalPos + " was dragged to: " + this.position);
			// infoWindow.open(map, this);
			
			
			geocodePosition(this.getPosition(),this.counter_index);
		});
	}
}



//Callback function of the drag event.
function geocodePosition(pos, counter_index) {

   
	
	geocoder.geocode
		({
			latLng: pos
		},
			function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var lat = results[0].geometry['location'].lat();
					var lng = results[0].geometry['location'].lng();
				 console.log( lat, lng, results[0] );
					locations[counter_index][0] = results[0].formatted_address;
					locations[counter_index][1] = lat;
					locations[counter_index][2] = lng;

					
					saveQRCode(counter_index, results[0].formatted_address,lat, lng );
					//fillInAddress('', '', '');
					//setTimeout(fillInAddress('remove', '', ''), 000);
				} else {
					console.log('Cannot determine address at this location.' + status);
				}
			}
		);
}

function downloadQRCode() {
	var a = document.createElement('a');
	a.href = "img.png";
	a.download = "output.png";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}


function saveQRCode(counter_index, location_name, latitude, longitude) {
    var vehicle_id = $("#vehicle_id").val();
	var or_code_id  = randomString();
	var data = {
		location_name: location_name,
		latitude: latitude,
		longitude: longitude,
		vehicle_id:vehicle_id,
		or_code_id:or_code_id,
		flag: 'ajax'
	}

	var request = $.ajax({
		url: "/add-qr-code",
		type: "POST",
		type: 'post',
		cache: false,
		data: data,
	});
	console.log(latitude, longitude,'-------------------')

	request.done(function (data) {
		 checkpoint_no_unique = parseInt(checkpoint_no_unique)+1;

		if(counter_index >= 0) {
			checkPoints[counter_index].checkpoint_location = location_name;
			checkPoints[counter_index].latitude = latitude;
			checkPoints[counter_index].lngtitude = longitude;
			checkPoints[counter_index].checkpoint_qr_code = data.data;
			//checkPoints[counter_index].or_code_id = or_code_id;
		
         
			
			var tr_id = $('#qr_code_body tr')[counter_index].id;
			var $row = $("#"+tr_id);
			//$("#"+tr_id).remove();
			console.log(tr_id)
			var file_name = $('#'+tr_id+ ' td:eq(2) a')[1].download;
			
			var html = "<tr id='remove_"+or_code_id+"'>" +

			"<td><img src='" + data.data + "' style='height: 79px;'></td>" +
			"<td>" + location_name + "</td>" +
			"<td>  <a href='#' id='"+or_code_id+"' class='btn btn-danger delete_checkpoint' style='margin-right:5px'>Delete</a>"+
			"<a href='" + data.data + "'  class='btn btn-warning ' Download='"+file_name+".png'>Download</a></td>" +
			"</tr>";
			$row.replaceWith(html);
			
			//$("#qr_code_body").append(html);
		} else {
			
			 checkPoints.push({
				checkpoint_location: location_name,
				latitude: latitude,
				lngtitude : longitude,
				checkpoint_qr_code :data.data,
				or_code_id:or_code_id
			  })
			  saveCheckPoint('new');
		// 	  var html = "<tr id='remove_"+or_code_id+"'>" +

		// 	  "<td><img src='" + data.data + "' style='height: 79px;'></td>" +
		// 	  "<td>" + location_name + "</td>" +
		// 	  "<td>  <a href='#' id='"+or_code_id+"' class='btn btn-danger delete_checkpoint' style='margin-right:5px'>Delete</a>"+
		// 	  "<a href='" + data.data + "'  class='btn btn-warning ' Download='checkpoint-"+checkpoint_no_unique+".png'>Download</a>" +
		// 	  "</td>" +
		// 	  "</tr>";
		//   $("#qr_code_body").append(html);

		}
   
    
	


	});

	request.fail(function (jqXHR, textStatus) {
		alert("Request failed: " + textStatus);
	});

	counter++;
}

function randomString() {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var length = 32;
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result+'-'+Math.floor(Date.now() / 1000);
}
var rString = randomString(32);

function selectVehicletype(flag) {
	var vehicle_type = $("#Vehicle_Type_").val();
	if (vehicle_type == "other") {
		$("#other_vehicle_type").show();
		var value = "";
		if (flag) {
			value = flag;
		} else {
			value = '';
		}
		var html = "<input required class='form-control' value='" + value + "' name='other_vehicle_type' id='other_vehicle_type' type='text' placeholder='Other Vehicle Type' />" +
			"<label for='inputEmail'>Other Vehicle Type</label>";
		$("#other_vehicle_type").html(html);
	} else {
		$("#other_vehicle_type").html('');
		$("#other_vehicle_type").hide();
	}
}

window.addEventListener('keydown', function (event) {

	// if the keyCode is 16 ( shift key was pressed )
	if (event.keyCode === 16) {

		// prevent default behaviour
		event.preventDefault();

		return false;
	}

});


function changeGetLocation() {
  locations = [];
  checkPoints = [];
  $("#is_deleted_checkpoint_id").val('');
  var vehicle_id =$("#vehicle_id").val();
  var location_id =$("#location_id").val();
  var city_id =$("#city_id").val();
  checkpoint_no_unique =$("#checkpoint_no_unique").val();
  if(vehicle_id && location_id) {
    var location = JSON.parse(location_id);
    $("#center_latitude").val(location.latitude);
    $("#center_lngtitude").val(location.lngtitude);
    fillInAddress('showMap', location.latitude, location.lngtitude);
    getCheckPoints(vehicle_id, city_id, location.id);
  
    $("#qr_code_body").empty();
    $("#showmap_and_search_").show();
 } else {
  
  $("#showmap_and_search_").hide();
 }
 $("#checkpoint_id").val("");
}


function changeGetVehicle() {
  locations = [];
  checkPoints = [];
  $("#is_deleted_checkpoint_id").val('');
  var vehicle_id =$("#vehicle_id").val();
  var location_id =$("#location_id").val();
  var city_id =$("#city_id").val();
  checkpoint_no_unique =$("#checkpoint_no_unique").val();
  if(vehicle_id && location_id) {
    var location = JSON.parse(location_id);
    $("#showmap_and_search_").show();
    fillInAddress('showMap', '', '');
    getCheckPoints(vehicle_id, city_id, location.id);
  } else {
    $("#showmap_and_search_").hide();
  }
  $("#checkpoint_id").val("");
}


function getCheckPoints(vehicle_id,city_id, location_id){
   checkPoints = [];
   locations= [];
   var request = $.ajax({
		url: "/get-by-id-checkpoints?vehicle_id=" + vehicle_id+'&city_id='+city_id+'&location_id='+location_id,
		type: "GET",
	});

	request.done(function (data) {
    var res = data.data;
	$("#qr_code_body").empty();
    if(res.length > 0) {
      
      $("#showmap_and_search_").show();
      $("#checkpoint_id").val(data.checkpoint_id);
    
      var count = 0;
       res.forEach(element => {
		 
        checkPoints.push({
          checkpoint_location: element.checkpoint_location,
          latitude: element.latitude,
          lngtitude : element.lngtitude,
          checkpoint_qr_code :element.checkpoint_qr_code,
          or_code_id:element.or_code_id
        })
        locations.push([element.checkpoint_location, parseFloat(element.latitude), parseFloat(element.lngtitude), count])

          var html = "<tr id='remove_"+element.or_code_id+"'>" +

          "<td><img src='" + element.checkpoint_qr_code + "' style='height: 79px;'></td>" +
          "<td>" + element.checkpoint_location + "</td>" +
          "<td>  <a href='#' id='"+element.or_code_id+"' class='btn btn-danger delete_checkpoint' style='margin-right:5px'>Delete</a>"+
		  "<a href='" + element.checkpoint_qr_code + "'  class='btn btn-warning ' Download='checkpoint-"+element.id+".png'>Download</a></td>" +
          "</tr>";
        $("#qr_code_body").append(html);
        count++;
       });
       
       setTimeout(fillInAddress('remove', '', ''), 000);
       
    }
  });

  request.fail(function (jqXHR, textStatus) {
		alert("Request failed: " + textStatus);
	});
}

function saveCheckPoint(flag) {
  var checkpoint_no = $("#checkpoint_no").val();
  var vehicle_id = $("#vehicle_id").val();
  var city_id = $("#city_id").val();
  var location = $("#location_id").val();
  var checkpoint_id = $("#checkpoint_id").val();
  var is_deleted_checkpoint_id = $("#is_deleted_checkpoint_id").val();
  
  if(!vehicle_id) {
    alert("Please select Vehicle");
    return false;
  }
  if(!city_id) {
    alert("Please select city");
    return false;
  }
  if(!city_id) {
    alert("Please select location");
    return false;
  }
  if(checkPoints.length == 0) {
    alert("Please add checkpoints");
    return false;
  }
  var data = {
		checkpoint_no: checkpoint_no,
		vehicle_id: vehicle_id,
		location_id: JSON.parse(location).id,
		city_id: city_id,
        checkPoints:JSON.stringify(checkPoints),
        checkpoint_id:checkpoint_id,
        is_deleted_checkpoint_id:is_deleted_checkpoint_id
	}

	var request = $.ajax({
		url: "/add-checkpoint",
		type: "POST",
		cache: false,
		data: data,
	});

  request.done(function (data) {
	  if(flag=='new'){
		 getCheckPoints(vehicle_id, city_id, JSON.parse(location).id);
	  } else {
		window.location="checkpoints";
	  }
    
  });

  request.fail(function (jqXHR, textStatus) {
		alert("Request failed: " + textStatus);
	});
}

var is_deleted_checkpoint_id = [];
$(document).on("click", '.delete_checkpoint', function(event) { 
  if(confirm("Are you sure you want to delete?")) {
      const index = checkPoints.findIndex(data => data.or_code_id === event.target.id);
       checkPoints.splice(index, 1)
       locations.splice(index, 1);
       fillInAddress("remove",'','')
       delete_checkPoint(event.target.id);
       $("#remove_"+event.target.id).remove();
       
  }
    
});


function delete_checkPoint(id) {

	var request = $.ajax({
		url: "/delete-checkpoint?id=" + id,
		type: "POST",
		cache: false,
	});

	request.done(function (data) {
		console.log("updated!!");
	});

	request.fail(function (jqXHR, textStatus) {
		alert("Request failed: " + textStatus);
	});
}

