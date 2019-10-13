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
    this.p1Deck = [];
    this.p2Deck = [];
  }
  createDeck(){
    let suit = ["Hearts", "Diamonds", "Clubs", "Spades"];
    let rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
    let score = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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
  distributeCards(){
    this.p1Deck = this.cards.slice(0,26);
    this.p2Deck = this.cards.slice(26);
  }

}
// let mainDeck = new Deck();
// mainDeck.createDeck();
//
// mainDeck.shuffle(mainDeck.cards);
// mainDeck.distributeCards();


//The cards that have been played go into this pile
// var playedCards = [];

class Board {
  constructor(){
    this.newDeck = new Deck();
    this.playedCards = [];

  }
  setUpGame(){
    this.newDeck.createDeck();
    this.newDeck.shuffle(this.newDeck.cards);
    this.newDeck.distributeCards();
  }
  playCard(){
    if(this.newDeck.p1Deck.length < 52 && this.newDeck.p2Deck.length < 52){
      this.playedCards.push(this.newDeck.p1Deck.pop());
      this.playedCards.push(this.newDeck.p2Deck.pop());
      console.log(`Player 1 played a ${this.playedCards[0].rank} of ${this.playedCards[0].suit}. Player 2 played a ${this.playedCards[1].rank} of ${this.playedCards[1].suit}.`);
    }
    else if(this.newDeck.p1Deck.length === 0){
      console.log(`Game over! Player 2 wins`);
    }
    else{
      console.log(`Game over! Player 1 wins`);
    }
  }
  compareCards(clear){
    if(this.playedCards[0].score > this.playedCards[1].score){
      console.log(`Player 1 wins!`);
      for(let i = 0; i < this.playedCards.length; i++){
        this.newDeck.p1Deck.unshift(this.playedCards[i]);
      }
    }
    else if(this.playedCards[0].score < this.playedCards[1].score){
      console.log(`Player 2 wins!`);
      for(let j = 0; j < this.playedCards.length; j++){
        this.newDeck.p2Deck.unshift(this.playedCards[j]);
      }
    }
    else{
      if(this.newDeck.p1Deck.length > 3 && this.newDeck.p2Deck.length > 3){
        console.log(`War! Each player puts down 4 cards, the player whose last card is the highest takes the pile!`);
        this.war();
      }
      else if(this.newDeck.p1Deck.length > this.newDeck.p1Deck.length){
          console.log(`Game Over! Player 1 Wins!`);
      }
      else{
        console.log(`Game Over! Player 2 Wins!`);
      }
    }
    console.log(`Player 1 has ${this.newDeck.p1Deck.length} card(s). Player 2 has ${this.newDeck.p2Deck.length} card(s).`);
    this.clear();
  }
  clear(){
    this.playedCards = [];
  }
  war(){
    for(let n = 0; n < 4; n++){
      this.playedCards.push(this.newDeck.p1Deck.pop());
      this.playedCards.push(this.newDeck.p2Deck.pop());
    }
    console.log(`The cards in the war pile are:`);
    for(let u = 0; u < this.playedCards.length; u++){
      console.log(`${this.playedCards[u].rank} of ${this.playedCards[u].suit}`);
    }
    console.log(`Player 1's last card is ${this.playedCards[this.playedCards.length-2].rank} of ${this.playedCards[this.playedCards.length-2].suit}. Player 2's last card is ${this.playedCards[this.playedCards.length-1].score} of ${this.playedCards[this.playedCards.length-1].suit} `);
    if(this.playedCards[this.playedCards.length-2].score > this.playedCards[this.playedCards.length-1].score){
      console.log(`Player 1 wins War!`);
      for(let o = 0; o < this.playedCards.length; o++){
        this.newDeck.p1Deck.unshift(this.playedCards[o]);
      }
    }
    else{
      console.log(`Player 2 wins War!`);
      for(let p = 0; p < this.playedCards.length; p++){
        this.newDeck.p2Deck.unshift(this.playedCards[p]);
      }
    }
    console.log(`Player 1 has ${this.newDeck.p1Deck.length} card(s). Player 2 has ${this.newDeck.p2Deck.length} card(s).`);
  }

}

let myBoard = new Board();
//Push the player's decks into the pile of played cards.
// function playCard(playerDeck, playedCards){
//   if( mainDeck.p1Deck.length < 52 && mainDeck.p2Deck.length < 52){
//   playedCards.push(playerDeck.pop());
//   }
//   else{
//     if(mainDeck.p1Deck.length === 0){
//       console.log(`Game Over! Player 2 Wins!`);
//     }
//     else{
//       console.log(`Game Over! Player 1 Wins`);
//     }
//   }
// }
// myBoard.newDeck.p1Deck[25].score = 5;
// myBoard.newDeck.p2Deck[25].score = 5;
// function war(){
//   for(var n = 0; n < 4; n++){
//     playedCards.push(p1Deck.pop());
//     playedCards.push(p2Deck.pop());
//   }
//   console.log(playedCards);
//   if(playedCards[(playedCards.length-2)].score > playedCards[(playedCards.length-1)].score){
//     console.log("Player 1 wins War!");
//     for(var o = 0; o < playedCards.length; o++){
//       mainDeck.p1Deck.unshift(playedCards[o]);
//     }
//   }
//   else{
//     console.log("Player 2 wins War!");
//     for(var p = 0; p < playedCards.length; p++){
//       mainDeck.p2Deck.unshift(playedCards[p]);
//     }
//   }
// }
// function compareCards(clear){
//
//   if(playedCards[0].score > playedCards[1].score){
//     console.log(`Player 1 wins`);
//     for(var i = 0; i < playedCards.length; i++){
//       mainDeck.p1Deck.unshift(playedCards[i]);
//     }
//   }
//   else if(playedCards[0].score < playedCards[1].score){
//     console.log(`Player 2 wins`);
//     for(var j = 0; j < playedCards.length; j++){
//       mainDeck.p2Deck.unshift(playedCards[j]);
//     }
//   }
//   else{
//     if(mainDeck.p1Deck.length > 3 && mainDeck.p2Deck.length > 3){
//       console.log("War!");
//       war();
//     }
//     else{
//
//       if(p1Deck.length > p2Deck.length){
//         console.log(`Game Over Player 1 Wins!`);
//       }
//       else{
//         console.log(`Game Over Player 2 Wins!`);
//       }
//     }
//   }
//   console.log(`Player 1 has ${mainDeck.p1Deck.length} cards. Player 2 has ${mainDeck.p2Deck.length} cards`);
// clear();
// }

// function clearPlayedCards(){
//   playedCards = [];
// }

//Start the game
function startGame(){
  shuffle(mainDeck.cards);
  distributeCards();
}
//Each player puts down a card to start the round

function beginRound(){
  playCard(mainDeck.p1Deck, playedCards);
  playCard(mainDeck.p2Deck, playedCards);
}

// startGame();
// while( mainDeck.p1Deck.length > 0 && mainDeck.p2Deck.length > 0){
//   beginRound();
//   compareCards(clearPlayedCards);
// }
