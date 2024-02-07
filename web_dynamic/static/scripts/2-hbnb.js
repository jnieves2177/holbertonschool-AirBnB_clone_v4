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
});
