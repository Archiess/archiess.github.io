var url = 'http://pokeapi.co/api/v1/pokemon';
var limit = 12;
var page = 1;

function getPokemonUrl(id)
{
  return url + '/' + id;
}

function getLoadMoreUrl()
{
  return url + '?limit=' + limit + '&offset=' + (page - 1) * limit;
}

function getPokemonImageUrl(id)
{
  return 'http://pokeapi.co/media/img/' + id + '.png';
}

function getTypes(types)
{
  var template = '';

  $.each(types, function (i, type) {
    template += '<div class="type type-' + type.name + '">' + type.name + '</div>';
  });

  return template;
}

function loadMorePokemons()
{
    $('#pokemon-list-loader').show();

    $.get(getLoadMoreUrl(), function (data) {
      page++;

      var template = '';

      $.each(data.objects, function (i, pokemon) {
        template += `
          <li class="pokemon" id="${pokemon.national_id}">
            <img class="image pokemon-image" src="${getPokemonImageUrl(pokemon.national_id)}" /><br>
            <b>${pokemon.name}</b>
            <div>${getTypes(pokemon.types)}</div>
          </li>
        `;
      });

      $('#pokemon-list').append(template);
      $('#pokemon-list-loader').hide();
    });
}

function loadPokemon(id)
{
    $('#pokemon-loader').show();
    $('#pokemon').html(''); // clear

    $.get(getPokemonUrl(id), function (pokemon) {

      var template = `
      <div class="view">
        <img class = "view-image" src="${getPokemonImageUrl(id)}" /><br>
        <div class="text-center"><b>${pokemon.name}</b></div><br>

        <table class="table table-bordered">
        <tr><td><b>Type:</b></td><td>${getTypes(pokemon.types)}</td></tr>
        <tr><td><b>Attack:</b></td><td>${pokemon.attack}</td></tr>
        <tr><td><b>Defense:</b></td><td> ${pokemon.defense}</td></tr>
        <tr><td><b>HP:</b> </td><td>${pokemon.hp}</td></tr>
        <tr><td><b>SP Attack:</b> </td><td>${pokemon.sp_atk}</td></tr>
        <tr><td><b>SP Defence:</b></td><td> ${pokemon.sp_def}</td></tr>
        <tr><td><b>Speed:</b> </td><td>${pokemon.speed}</td></tr>
        <tr><td><b>Weight:</b></td><td> ${pokemon.weight}</td></tr>
        <tr><td><b>Total moves:</b></td><td> ${pokemon.moves.length}</td></tr>
        </table>

      </div>
      `;

      $('#pokemon').html(template);
      $('#pokemon-loader').hide();
    });
}

$('#load-more').click(loadMorePokemons);


$('#pokemon-list').delegate('.pokemon-image', 'click', function (event) {
  $("#pokemon").css('display','block');
  loadPokemon($(this).parent().attr('id'));
});

$('.filter').click(function (e) {
  e.preventDefault();

  var type = $(this).data('type');

  $('body').removeAttr('class');

  if (type != 'clear') {
    $('body').addClass('filtered');
    $('body').addClass(type);
  }
})

$(document).ready(loadMorePokemons);
