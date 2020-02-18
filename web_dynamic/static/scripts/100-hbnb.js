const amenities = {};
const states = {};
const cities = {};
$(function () {
  $('.amenities input').change(function () {
    if (this.checked) {
      amenities[this.getAttribute('data-id')] = this.getAttribute('data-name');
    } else {
      delete amenities[this.getAttribute('data-id')];
    }
    $('.amenities h4').text(Object.keys(amenities).length === 0 ? '\xa0' : Object.values(amenities).join(', '));
  });
  console.log($('.states input'));
  $('.states input').change(function () {
    if (this.checked) {
      states[this.getAttribute('data-id')] = this.getAttribute('data-name');
    } else {
      delete states[this.getAttribute('data-id')];
    }
    $('.locations h4').text(Object.keys(states).length === 0 ? '\xa0' : Object.values(states).concat(Object.values(cities)).join(', '));
  });
  $('.cities input').change(function () {
    if (this.checked) {
      cities[this.getAttribute('data-id')] = this.getAttribute('data-name');
    } else {
      delete cities[this.getAttribute('data-id')];
    }
    $('.locations h4').text(Object.keys(cities).length === 0 ? '\xa0' : Object.values(states).concat(Object.values(cities)).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/'
  ).done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });
  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done(function (data) {
    data.forEach(function (place) {
      const htmlStr = `<article>

        <div class="title">

          <h2>${place.name}</h2>

          <div class="price_by_night">

      ${place.price_by_night}

          </div>
        </div>
        <div class="information">
          <div class="max_guest">
      <i class="fa fa-users fa-3x" aria-hidden="true"></i>

      <br />

      ${place.max_guest} Guests

          </div>
          <div class="number_rooms">
      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

      <br />

      ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

      <br />

      ${place.number_bathrooms} Bathroom

          </div>
        </div>

        <!-- **********************
       USER
       **********************  -->

        <div class="user">

        </div>
        <div class="description">

          ${place.description}

        </div>

      </article>`;
      $('section.places').append($(htmlStr));
    });
  });

  $('BUTTON').click(function () {
    $('SECTION.places ARTICLE').remove();
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        states: Object.keys(states),
        cities: Object.keys(cities)
      })
    }).done(function (data) {
      data.forEach(function (place) {
        const htmlStr = `<article>

          <div class="title">

          <h2>${place.name}</h2>

          <div class="price_by_night">

        ${place.price_by_night}

        </div>
          </div>
          <div class="information">
          <div class="max_guest">
          <i class="fa fa-users fa-3x" aria-hidden="true"></i>

          <br />

        ${place.max_guest} Guests

        </div>
          <div class="number_rooms">
          <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

          <br />

        ${place.number_rooms} Bedrooms
        </div>
          <div class="number_bathrooms">
          <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

          <br />

        ${place.number_bathrooms} Bathroom

        </div>
          </div>

          <!-- **********************
          USER
        **********************  -->

          <div class="user">

        </div>
          <div class="description">

        ${place.description}

        </div>

        </article>`;
        $('section.places').append($(htmlStr));
      });
    });
  });
});
