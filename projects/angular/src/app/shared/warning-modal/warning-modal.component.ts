import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {
  @Input() showModal: boolean=false;
  @Input() outsideClickable?:boolean=false;
  @Output() onClickedOutSide: EventEmitter<any>=new EventEmitter();

  constructor() { }

  closeModal(){
    if(this.outsideClickable){
    this.showModal=false;
    this.onClickedOutSide.emit();
  }
  }

  ngOnInit(): void {
  }

}
