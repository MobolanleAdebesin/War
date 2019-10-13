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



class Cards{
  constructor(suit, rank, score){
    this.suit = suit;
    this.rank = rank;
    this.score = score;

  }
}
class Deck{
  constructor(){
    // this.length = 52;
    this.cards = [];
  }
  createDeck(){
    let suit = ["Hearts", "Diamonds", "Clubs", "Spades"];
    let rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
    let score = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    for(var q = 0; q < suit.length; q++){
      for(var r = 0; r < rank.length; r++){
        this.cards.push( new Cards(suit[q], rank[r], score[r]));
      }
    }
  }
  shuffle(array){
    var m = array.length, t,s;
    while(m){
      s = Math.floor(Math.random()* m--);
      t = array[m];
      array[m] = array[s];
      array[s] = t;
    }
    return array;
  }

}
let mainDeck = new Deck();
mainDeck.createDeck();

mainDeck.shuffle(mainDeck.cards);


//The players' deck
var p1Deck = []; /* player 1's deck */
var p2Deck = []; /* player 2's deck */

//The cards that have been played go into this pile
var playedCards = [];

//Function to shuffle the main deck.
// function shuffle(array){
//   var m = array.length, t,s;
//   while(m){
//     s = Math.floor(Math.random()* m--);
//     t = array[m];
//     array[m] = array[s];
//     array[s] = t;
//   }
//   return array;
// }

//Distribute the cards to each player
function distributeCards(){
  p1Deck = mainDeck.cards.slice(0,26);
  p2Deck = mainDeck.cards.slice(26);
  return p1Deck, p2Deck;
}

//Push the player's decks into the pile of played cards.
function playCard(playerDeck, playedCards){
  if( p1Deck.length < 52 && p2Deck.length < 52){
  playedCards.push(playerDeck.pop());
  }
  else{
    if(p1Deck.length === 0){
      console.log(`Game Over! Player 2 Wins!`);
    }
    else{
      console.log(`Game Over! Player 1 Wins`);
    }
  }
}

function war(){
  for(var n = 0; n < 4; n++){
    playedCards.push(p1Deck.pop());
    playedCards.push(p2Deck.pop());
  }
  console.log(playedCards);
  if(playedCards[(playedCards.length-2)].score > playedCards[(playedCards.length-1)].score){
    console.log("Player 1 wins War!");
    for(var o = 0; o < playedCards.length; o++){
      p1Deck.unshift(playedCards[o]);
    }
  }
  else{
    console.log("Player 2 wins War!");
    for(var p = 0; p < playedCards.length; p++){
      p2Deck.unshift(playedCards[p]);
    }
  }
}
function compareCards(clear){

  if(playedCards[0].score > playedCards[1].score){
    console.log(`Player 1 wins`);
    for(var i = 0; i < playedCards.length; i++){
      p1Deck.unshift(playedCards[i]);
    }
  }
  else if(playedCards[0].score < playedCards[1].score){
    console.log(`Player 2 wins`);
    for(var j = 0; j < playedCards.length; j++){
      p2Deck.unshift(playedCards[j]);
    }
  }
  else{
    if(p1Deck.length > 3 && p2Deck.length > 3){
      console.log("War!");
      war();
    }
    else{

      if(p1Deck.length > p2Deck.length){
        console.log("Game Over Player 1 Wins!");
      }
      else{
        console.log("Game Over Player 2 Wins!");
      }
    }
  }
  console.log(`Player 1 has ${p1Deck.length} cards. Player 2 has ${p2Deck.length} cards`);
clear();
}

function clearPlayedCards(){
  playedCards = [];
}

//Start the game
function startGame(){
  shuffle(mainDeck.cards);
  distributeCards();
}
//Each player puts down a card to start the round

function beginRound(){
  playCard(p1Deck, playedCards);
  playCard(p2Deck, playedCards);
}

// startGame();
// while( p1Deck.length > 0 && p2Deck.length > 0){
//   beginRound();
//   compareCards(clearPlayedCards);
// }
