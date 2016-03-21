var url = 'http://pokeapi.co/api/v1/pokemon';
var limit = 12;
var page = 1;

$(window).scroll(function() {

  var view = $('#pokemon');
  var offset = view.offset();
  var left = offset.left;
  var right = offset.right;
  var top = offset.top;
  var width = $('#pokemon').width();
  var height = $('.view').height();
  var scrollTop = $(window).scrollTop();
  if (scrollTop >= top) {
    $('#pokemon').css({
      position: 'fixed',
      // top:top +'px'
      //  width:width + 'px'
    })
  }
});

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
    template += '<div class="type-' + type.name + '">' + type.name + '</div>';
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
            <img class="image" src="${getPokemonImageUrl(pokemon.national_id)}" /><br>
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
        <b>Type:</b>${getTypes(pokemon.types)}<br>
        <b>Attack:</b>${pokemon.attack}<br>
        <b>Defense:</b> ${pokemon.defense}<br>
        <b>HP:</b> ${pokemon.hp}<br>
        <b>SP Attack:</b> ${pokemon.sp_atk}<br>
        <b>SP Defence:</b> ${pokemon.sp_def}<br>
        <b>Speed:</b> ${pokemon.speed}<br>
        <b>Weight:</b> ${pokemon.weight}<br>
        <b>Total moves:</b> ${pokemon.moves.length}<br>
      </div>
      `;

      $('#pokemon').html(template);
      $('#pokemon-loader').hide();
    });
}

$('#load-more').click(loadMorePokemons);


$('#pokemon-list').delegate('.pokemon', 'click', function (event) {
  $("#pokemon").css('display','block');
  loadPokemon($(this).attr('id'));

  var par = $('li:has(div[class =' +  event.target.className + '])');
  $('.pokemon').delegate('.' + event.target.className, 'click', function(){
       $('li').not(par).css('display','none');
   })




});



$(document).ready(loadMorePokemons);
