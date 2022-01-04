import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  show = false;
  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.show = !this.show;
  }
}
