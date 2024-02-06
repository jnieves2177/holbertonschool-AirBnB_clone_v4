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
});