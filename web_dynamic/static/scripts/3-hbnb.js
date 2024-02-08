$(document).ready(function () {
  let listChecked = {};

  $('li input[type="checkbox"]').change(function () {
    const id = this.dataset.id;
    const name = this.dataset.name;

    if (this.checked) {
      listChecked[id] = name;
    } else {
      delete listChecked[id];
    }

    // Iterate through the object and join values
    const checkedNames = Object.values(listChecked).join(', ');

    // Update the content of the <h4> element with the checked items
    $('.amenities h4').text(checkedNames);
  });

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data['status'] === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    },
    error: function (xhr, status, error) {
      // Handle errors here
      console.error('Error fetching data:', error);
      $('div#api_status').removeClass('available');
    },
  });

  let jsonData = {};
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    method: 'POST',
    dataType: 'json',
    data: JSON.stringify(jsonData),
    contentType: 'application/json',
    success: function (data) {
      // Sort the data by place name
      data.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      $.each(data, function (index, place) {
        var article = $('<article>');
        var titleBox = $('<div class="title_box">');
        var title = $('<h2>').text(place.name);
        var priceByNight = $('<div class="price_by_night">').text(
          '$' + place.price_by_night
        );
        var information = $('<div class="information">');
        var maxGuest = $('<div class="max_guest">').text(
          place.max_guest + (place.max_guest != 1 ? ' Guests' : ' Guest')
        );
        var numberRooms = $('<div class="number_rooms">').text(
          place.number_rooms
        );
        var numberBathrooms = $('<div class="number_bathrooms">').text(
          place.number_bathrooms
        );
        var user = $('<div class="user">').html(
          '<b>Owner:</b> ' + place.user_id
        );
        var description = $('<div class="description">').html(
          place.description
        );

        titleBox.append(title, priceByNight);
        information.append(maxGuest, numberRooms, numberBathrooms);
        article.append(titleBox, information, description);

        $('.places').append(article);
      });
    },
    error: function (xhr, status, error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    },
  });
});
