import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-card-three',
  templateUrl: './item-card-three.component.html',
  styleUrls: ['./item-card-three.component.scss']
})
export class ItemCardThreeComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

}
