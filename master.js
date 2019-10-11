/*jshint esversion: 6 */
/*
PSEUDOCODE
Goal:
To be the first player to win all 52 cards. Therefore When one player has 52 cards the game ends.
Put another way: when one of the player arrays has an 'array.length' of 52 the game ends.
-
-
Dealing:
1. deck with 52 cards
2. shuffle that deck
3. split that deck into two equal parts
-
-
Playing:
Each player turns up a card at the same time.
The player with the higher card takes both cards and puts them, face down, on the bottom of their stack.
If the cards are the same rank, it is war
Each player flips another card --> the higher card wins
If these cards are the same rank it is war
Each player flips another card --> the higher card wins
And so on until one player wins and then they take all the cards.
-
-
Scoring:
Keep tracking of the number of cards each player has through out the game.
-
-
What to Code:
Create 52 cards;
Split the 52 cards into two arrays randomly, so that each array has 26 cards
deckArray = 52 cards
randomly distribute cards
player1 array = 26 cards
player2 array = 26 cards
*/

var deck = [
  {suit: "Hearts", card: "Ace", rank: 1},
  {suit: "Hearts", card: "2", rank: 2},
  {suit: "Hearts", card: "3", rank: 3},
  {suit: "Hearts", card: "4", rank: 4},
  {suit: "Hearts", card: "5", rank: 5},
  {suit: "Hearts", card: "6", rank: 6},
  {suit: "Hearts", card: "7", rank: 7},
  {suit: "Hearts", card: "8", rank: 8},
  {suit: "Hearts", card: "9", rank: 9},
  {suit: "Hearts", card: "10", rank: 10},
  {suit: "Hearts", card: "Jack", rank: 11},
  {suit: "Hearts", card: "Queen", rank: 12},
  {suit: "Hearts", card: "King", rank: 13},

  {suit: "Spades", card: "Ace", rank: 1},
  {suit: "Spades", card: "2", rank: 2},
  {suit: "Spades", card: "3", rank: 3},
  {suit: "Spades", card: "4", rank: 4},
  {suit: "Spades", card: "5", rank: 5},
  {suit: "Spades", card: "6", rank: 6},
  {suit: "Spades", card: "7", rank: 7},
  {suit: "Spades", card: "8", rank: 8},
  {suit: "Spades", card: "9", rank: 9},
  {suit: "Spades", card: "10", rank: 10},
  {suit: "Spades", card: "Jack", rank: 11},
  {suit: "Spades", card: "Queen", rank: 12},
  {suit: "Spades", card: "King", rank: 13},

  {suit: "Diamonds", card: "Ace", rank: 1},
  {suit: "Diamonds", card: "2", rank: 2},
  {suit: "Diamonds", card: "3", rank: 3},
  {suit: "Diamonds", card: "4", rank: 4},
  {suit: "Diamonds", card: "5", rank: 5},
  {suit: "Diamonds", card: "6", rank: 6},
  {suit: "Diamonds", card: "7", rank: 7},
  {suit: "Diamonds", card: "8", rank: 8},
  {suit: "Diamonds", card: "9", rank: 9},
  {suit: "Diamonds", card: "10", rank: 10},
  {suit: "Diamonds", card: "Jack", rank: 11},
  {suit: "Diamonds", card: "Queen", rank: 12},
  {suit: "Diamonds", card: "King", rank: 13},

  {suit: "Clubs", card: "Ace", rank: 1},
  {suit: "Clubs", card: "2", rank: 2},
  {suit: "Clubs", card: "3", rank: 3},
  {suit: "Clubs", card: "4", rank: 4},
  {suit: "Clubs", card: "5", rank: 5},
  {suit: "Clubs", card: "6", rank: 6},
  {suit: "Clubs", card: "7", rank: 7},
  {suit: "Clubs", card: "8", rank: 8},
  {suit: "Clubs", card: "9", rank: 9},
  {suit: "Clubs", card: "10", rank: 10},
  {suit: "Clubs", card: "Jack", rank: 11},
  {suit: "Clubs", card: "Queen", rank: 12},
  {suit: "Clubs", card: "King", rank: 13},
];
var p1 = []; /* player 1's hand */
var p2 = []; /* player 2's hand */
var p1Card;  /* The card player 1 puts down */
var p2Card;  /*The card player 2 puts down*/
var warPile = [];
var war = [];

//Shuffling the deck
function shuffle(array){
  var m = array.length, t, i;
  while(m){
    i = Math.floor(Math.random()* m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

//Distributing the deck to the two players - each player should have 26 cards
function distributeCards(){
  p1 = deck.slice(0,26);
  p2 = deck.slice(26);
  return p1, p2;
}

// Playing eachplayer's cards
function playCards(){
  if(p1.length > 0 && p2.length > 0){
    p1Card = p1.pop();
    p2Card = p2.pop();
    console.log(`Player 1 played a ${p1Card.card} of ${p1Card.suit} Player 2 played a ${p2Card.card} of ${p2Card.suit}`);


  return p1Card, p2Card;
  }
  else {
    alert("Game Over");
    if(p1.length > p2.length){
      alert("Player 1 wins");
    }
    else{
      alert("Player 2 wins");
    }
}
}
//pushes all the cards into the array warPile/
function warScenario() {
  p1Card = p1.pop();
  warPile.push(p1Card);
  p1Card = p1.pop();
  warPile.push(p1Card);
  p1Card = p1.pop();
  warPile.push(p1Card);

  p2Card = p2.pop();
  warPile.push(p2Card);
  p2Card = p2.pop();
  warPile.push(p2Card);
  p2Card = p2.pop();
  warPile.push(p2Card);
  console.log(warPile);
}
//takes the cards from war pile and shifts them into the winners deck
function warWinner(winnerDeck){
  warBooty = warPile.pop();
  winnerDeck.unshift(warBooty);
  warBooty = warPile.pop();
  winnerDeck.unshift(warBooty);
  warBooty = warPile.pop();
  winnerDeck.unshift(warBooty);
  warBooty = warPile.pop();
  winnerDeck.unshift(warBooty);
  warBooty = warPile.pop();
  winnerDeck.unshift(warBooty);
  warBooty = warPile.pop();
  winnerDeck.unshift(warBooty);
}

//Compare the played cards and determine a winner
function compareCardsInPlay(){
  if( p1Card.rank > p2Card.rank){
    console.log("Player 1 wins round");
    p1.unshift(p1Card, p2Card);
    if(warPile.length >  0){
      warWinner(p1);
    }

    p1Card = 0;
    p2Card = 0;
  }
  else if(p2Card.rank > p1Card.rank){
    console.log("Player 2 wins round");
    p2.unshift(p1Card, p2Card);
    if(warPile.length >  0){
      warWinner(p2);
    }


    p1Card = 0;
    p2Card = 0;

  }
  else{
    alert("War!");
    if(p1.length > 3 && p2.length > 3){
    warScenario();
    playCards();
    compareCardsInPlay();
  }
  else{
    alert("Game Over!");
    if(p1.length > p2.length){
      console.log("Player 1 wins the game!");
    }
    else{
      console.log("Player 2 wins the game!");
    }
  }
}
}

function startGame(){
  shuffle(deck);
  distributeCards();
  alert("The Game has started and the cards are shuffled!");
}

function playRound(){
  playCards();
  compareCardsInPlay();
  console.log(`Player 1 has ${p1.length} cards. Player 2 has ${p2.length} cards`);
}

// document.addEventListener("keydown", playRound);
