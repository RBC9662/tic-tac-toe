import { Component, OnInit } from '@angular/core';
import Minimax from 'tic-tac-toe-minimax';
const { GameStep } = Minimax;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public gameState: Array<number|string> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  public winner: string|undefined;
  public playing = false;
  public computerFirst = false;
  public difficulty: 'Easy'|'Normal'|'hard' = 'Normal';

  constructor() { }

  ngOnInit(): void {
  }

  toggleGame(toggle: boolean) {
    if (toggle === this.playing) {
      return;
    }

    this.gameState = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    if (toggle && this.computerFirst) {
      this.makeComputerMove();
    }

    this.playing = toggle;
  }

  makeComputerMove() {
    const symbols = {
      huPlayer : 'O',
      aiPlayer : 'X'
    }

    const winnerMapping: {[index: string]: string} = {
      huPlayer : 'Human won!',
      aiPlayer: 'Computer won!',
      draw: 'Draw a match'
    }

    const result = GameStep(this.gameState, symbols, this.difficulty);
    this.gameState = result.board;

    if (result.winner) {
      this.winner = winnerMapping[result.winner];
      this.playing = false;
    }
  }

  makeHumanMove(field: number): void {
    if (!this.playing && typeof this.gameState[field] === 'number') {
      return;
    }

    this.gameState[field] = 'O';
    this.makeComputerMove();
  }

}
