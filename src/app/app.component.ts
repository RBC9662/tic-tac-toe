import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = '';
  isAuthenticated: boolean = false;

  constructor(route: Router, location: Location) {
    let str = location.path(false);
    this.title = str.replace(/\\|\//g,'');
  }
  
}
