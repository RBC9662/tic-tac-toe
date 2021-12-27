import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  display = '';
  private stack: (number|string)[] = [];

  constructor() { }

  // @HostListener('document:keypress', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   console.log("event key === ", event.key);
  // }

  ngOnInit(): void {
    this.display = '0';
    this.stack = ['='];
  }

  numberPressed(val: string) {
    let stackLength = this.stack.length;
    if (typeof this.stack[stackLength - 1] !== 'number') {
      this.display = val;
      this.stack.push(parseInt(this.display, 10));
      console.log("stack length for single digit number == ", this.stack);
    } else {
      this.display += val;
      this.stack[stackLength - 1] = parseInt(this.display, 10);
      console.log("stack length for two digit number == ", this.stack);
    }
  }

  operatorPressed(operator: string) {
    const precendenceMap: {[index: string]: any} = {'+': 0, '-': 1, '*': 1, '%': 1};

    console.log("stack after press operator == ", typeof this.stack[this.stack.length - 1]);

    if (typeof this.stack[this.stack.length - 1] === 'string') {
      console.log("stack length is string on operator pressed");
      this.stack.push(parseInt(this.display, 10));
    }

    const precedence: number = precendenceMap[operator];
    let reduce = true;
    while (reduce) {
      let i = this.stack.length - 1;
      console.log("i == ", i);
      let lastPrecedence = 100;

      while (i >= 0) {
        if (typeof this.stack[i] === 'string') {
          lastPrecedence = precendenceMap[this.stack[i]];
          break;
        }
        i--;
      }

      console.log("lastPrecedence == ", lastPrecedence);
      if (precedence <= lastPrecedence) {
        reduce = this.reduceLast();
      } else {
        reduce = false;
      }
    }

    this.stack.push(operator);
  }

  reduceLast(): boolean {
    if (this.stack.length < 4) { return false };
    const num2 = this.stack.pop() as number;
    const op = this.stack.pop() as string;
    const num1 = this.stack.pop() as number;
    let result = num1;
    switch (op) {
      case '+':
          result = num1 + num2;
          break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1/num2;
        break;
    }

    this.stack.push(result);
    this.display = result.toString(10);
    return true;
  }
 
  acPressed() {

  }

  cePressed() {
    
  }

  percentPressed() {

  }

  equalPressed() {
    if (typeof this.stack[this.stack.length - 1] === 'string') {
      this.stack.push(parseInt(this.display, 10));
    }
    while (this.reduceLast()) {}
    console.log("this stack after equal pressed == ", this.stack);
    this.stack.pop();
  }

}
