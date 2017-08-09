var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready( function() {
  var difficulty = 'easy';

  $('.difficultyBtn').on('click', function() {
    if ($(this).attr('id') === 'easy') {
      difficulty = 'easy';
      $(this).css('backgroundColor', 'rgb(51, 204, 51)');
      $(this).next().css('backgroundColor', 'rgb(32, 64, 86)');
      $('#counter').remove();
    } else {
      difficulty = 'hard';
      $(this).css('backgroundColor', 'rgb(51, 204, 51)');
      $(this).prev().css('backgroundColor', 'rgb(32, 64, 86)');
      $('#counter').remove();
    }

    var cardOrders = MatchGame.generateCardValues(difficulty);
    var $ourGame = $('#game');
    MatchGame.renderCards(cardOrders, $ourGame, difficulty);
  });
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function (difficulty) {
  var setOrder = [];
  var cardCount;

  if (difficulty === 'easy') {
    cardCount = 8;
  } else {
    cardCount = 18;
  }

  for (i = 1; i < cardCount+1; i++ ) {
    setOrder.push(i);
    setOrder.push(i);
  }

  var randomOrder = [];

  while (setOrder.length > 0) {
    var indexNumber = Math.floor(Math.random() * (setOrder.length));
    randomOrder.push(setOrder[indexNumber]);
    setOrder.splice(indexNumber, 1)
  }

  return randomOrder;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game, difficulty) {

  $game.data('numberFlippedCards', []);

  $game.empty();

  $game.data('clickCounter', 0);

  var colours = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)', 'hsl(40, 85%, 65%)', 'hsl(75, 85%, 65%)', 'hsl(140, 85%, 65%)', 'hsl(190, 85%, 65%)', 'hsl(235, 85%, 65%)', 'hsl(290, 85%, 65%)', 'hsl(330, 85%, 65%)', 'hsl(345, 85%, 65%)', 'hsl(120, 85%, 65%)', 'hsl(250, 85%, 65%)'];


  if (difficulty === 'easy') {
    for (i = 0; i < cardValues.length; i++) {
      var $card = $('<div class="card col-xs-3"></div>');
      $card.data('value', cardValues[i]);
      $card.data('flipped', false);
      $card.data('color', colours[cardValues[i] - 1]);
      $game.append($card);
    }
  } else {
    for (i = 0; i < cardValues.length; i++) {
      var $card = $('<div class="card col-xs-2"></div>');
      $card.data('value', cardValues[i]);
      $card.data('flipped', false);
      $card.data('color', colours[cardValues[i] - 1]);
      $card.css('height', '7rem');
      $card.css('lineHeight', '7rem');
      $card.css('fontSize', '3rem');
      $game.append($card);
    }
  }

  $('.instructions').append('<p id="counter"><strong>Clicks: </strong>' + $game.data('clickCounter') + '</p>');

  $('#game .card').click( function() {

    MatchGame.flipCard($(this), $game);

  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  if ($card.data('flipped') === true) {
    return;
  } else {
    $card.css('background-color', $card.data('color'));
    $card.text($card.data('value'));
    $card.data('flipped', true);
    var clCount = $game.data('clickCounter');
    clCount++;
    $('#counter').remove();
    $('.instructions').append('<p id="counter"><strong>Clicks: </strong>' + clCount + '</p>');
    $game.data('clickCounter', clCount);
  }

  $game.data('numberFlippedCards').push($card);

  if ($game.data('numberFlippedCards').length === 2) {

    var card1 = $game.data('numberFlippedCards')[0];
    var card2 = $game.data('numberFlippedCards')[1];

    if (card1.data('value') === card2.data('value')) {
      card1.css('background-color', 'rgb(153, 153, 153)');
      card2.css('background-color', 'rgb(153, 153, 153)');
      card1.css('color', 'rgb(204, 204, 204)');
      card2.css('color', 'rgb(204, 204, 204)');
    } else {
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)');
        card2.css('background-color', 'rgb(32, 64, 86)');
        card1.text('');
        card2.text('');
        card1.data('flipped', false);
        card2.data('flipped', false);
      }, 500);
    }

    $game.data('numberFlippedCards', []);

  }

};
