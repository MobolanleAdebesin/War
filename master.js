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


//this class is used to create a template for the cards within the deck. Each card has a suit, a rank, and a score.
class Cards{
  constructor(suit, rank, score){
    this.suit = suit;
    this.rank = rank;
    this.score = score;

  }
}
//This class is used to create the deck. The class contains an array that holds all 52 cards and one array to hold each players cards too. Th
class Deck{
  constructor(){
    // this.length = 52;
    this.cards = [];
    this.p1Deck = []; /*Player 1's deck */
    this.p2Deck = []; /*Player 2's deck */
  }
  //This method creates the 52 cards using the Card class to create 52 instances of the card.
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
  //This method shuffles the deck source: https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
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
  //This method distributes the cards to each of the players arrays. Half the deck goes to player 1 and half to player 2.
  distributeCards(){
    this.p1Deck = this.cards.slice(0,26);
    this.p2Deck = this.cards.slice(26, 52);
  }

}


class Board {
  constructor(){
    //Creating a deck using the Deck class within the Board class. This way all the methods in the Board class have access to the deck.
    this.newDeck = new Deck();
    //Created an array called playedCards to hold the cards that each player puts down on their turn.
    this.playedCards = [];
    this.round = 1;

  }
  //This method is used to actually shuffle  the newly created deck and distribute the shuffled cards to each player.
  setUpGame(){
    this.newDeck.createDeck();
    this.newDeck.shuffle(this.newDeck.cards);
    this.newDeck.distributeCards();
  }
  //This method is used to pull the last card from each player's array.
  playCard(){
    if( this.newDeck.p1Deck.length > 0 && this.newDeck.p2Deck.length > 0){
      this.playedCards.push(this.newDeck.p1Deck.pop()); /*pop the last item from player 1's array into the playedCards array*/
      this.playedCards.push(this.newDeck.p2Deck.pop());/*pop the last item from player 2's array into the playedCards array*/
      console.log(`Player 1 played a ${this.playedCards[0].rank} of ${this.playedCards[0].suit}. Player 2 played a ${this.playedCards[1].rank} of ${this.playedCards[1].suit}.`); /*Logs the cards from each player*/
    }
    else if (this.newDeck.p1Deck.length === 0){
      for(let y = 0; y < this.playedCards.length; y++){
      this.newDeck.p2Deck.unshift(this.playedCards[y]);
      }
      console.log(`Player 2 wins`);
    }
    else if(this.newDeck.p2Deck.length === 0){
      for(let z = 0; z < this.playedCards.length; z++){
        this.newDeck.p1Deck.unshift(this.playedCards[z]);
      }
      console.log(`Player 1 wins`);
    }
  }
    //Compares the cards within the playedCards array to see which card has a higher score.
  compareCards(){
    if( this.playedCards.length > 0){ //This will only check the cards if there are actually cards in the playedCards array.
    if(this.playedCards[0].score > this.playedCards[1].score){ /*If the first card in the array (from player 1) has a score higher than the second card in the array (from player 2) than player 1 wins.*/
      console.log(`Player 1 wins the round!`);
      for(let i = 0; i < this.playedCards.length; i++){ //move all of the cards from the playedCards array into player 1's deck.
        this.newDeck.p1Deck.unshift(this.playedCards[i]);
      }
      this.clear();
    }
    else if(this.playedCards[0].score < this.playedCards[1].score){ //If the first card in the array is less than the second card in the array than player 2 wins.
      console.log(`Player 2 wins the round`);
      for(let j = 0; j < this.playedCards.length; j++){ //move all of the cards from the playedCards array into player 2's deck.
        this.newDeck.p2Deck.unshift(this.playedCards[j]);
      }
      this.clear();
    }
    else{ // if player 1's card is not greater than player 2's card and vice versa, then they must be equal. So there must be war.
      // if(this.newDeck.p1Deck.length > 3 && this.newDeck.p2Deck.length > 3){
        console.log(`War! Each player puts down 4 cards, the player whose last card is the highest takes the pile!`);
        this.war(); //Call the war function.
      // }
      //If both players do not have enough cards for war than the player with more cards automatically wins the game.
    //   else if(this.newDeck.p1Deck.length > this.newDeck.p2Deck.length){
    //       console.log(`Game Over! Player 1 Wins!`);
    //   }
    //   else{
    //     console.log(`Game Over! Player 2 Wins!`);
    //   }
    }
    console.log(`Player 1 has ${this.newDeck.p1Deck.length} card(s). Player 2 has ${this.newDeck.p2Deck.length} card(s).`); //Logs the number of cards each player currently has.
    this.clear(); //calls the clear function to remove the cards from the playedCards pile.
    }
    else{
      if(this.newDeck.p1Deck.length > this.newDeck.p2Deck.length){
        console.log(`Game Over! Player 1 Wins!`);
      }
      else{
        console.log(`Game Over! Player 2 Wins!`);
      }

    }
  }
  clear(){
    this.playedCards = [];
  }
  war(){

    for(let n = 0; n < 4; n++){
      if(this.newDeck.p1Deck.length > 0 && this.newDeck.p2Deck.length > 0){
      this.playedCards.push(this.newDeck.p1Deck.pop());
      this.playedCards.push(this.newDeck.p2Deck.pop());
      }
      else if(this.newDeck.p1Deck === 0){
        for(let w = 0; w < this.playedCards.length; w++){
        this.newDeck.p2Deck.unshift(this.playedCards[w]);
        }
        this.clear();
      return;
      }
      else if(this.newDeck.p2Deck === 0){
        for(let w = 0; w < this.playedCards.length; w++){
        this.newDeck.p1Deck.unshift(this.playedCards[w]);
        }
        this.clear();
        return;


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
      this.clear();
    }
    else if(this.playedCards[this.playedCards.length-2].score < this.playedCards[this.playedCards.length-1].score){
      console.log(`Player 2 wins War!`);
      for(let p = 0; p < this.playedCards.length; p++){
        this.newDeck.p2Deck.unshift(this.playedCards[p]);
      }
      this.clear();
    }
    else{
      this.playCard();
      this.compareCards();
    }
    console.log(`Player 1 has ${this.newDeck.p1Deck.length} card(s). Player 2 has ${this.newDeck.p2Deck.length} card(s).`);
  }
}

  playRound(){



    this.playCard();
    this.compareCards();
    // if(this.newDeck.p1Deck.length === 52){
    //   console.log(`Player 1 wins`);
    // }
    // else if(this.newDeck.p2Deck.length === 52){
    //   console.log(`Player 1 wins`);
    // }
  }
  playGame(){
    while(this.newDeck.p1Deck.length > 0 && this.newDeck.p2Deck.length > 0 ){
      this.playRound();
    }
      console.log(`This is round ${this.round}`);
      this.playRound();
      this.round++;

    if(this.newDeck.p1Deck.length > this.newDeck.p2Deck.length){
      console.log(`Player 1 wins the Game!`);
    }
    else if (this.newDeck.p1Deck.length < this.newDeck.p2Deck.length){
      console.log(`Player 2 wins the Game!`);
    }
  }

// }
}
let myBoard = new Board();
myBoard.setUpGame();
