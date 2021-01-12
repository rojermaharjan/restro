import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-card-two',
  templateUrl: './item-card-two.component.html',
  styleUrls: ['./item-card-two.component.scss']
})
export class ItemCardTwoComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

}
