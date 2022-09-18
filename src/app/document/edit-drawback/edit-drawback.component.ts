import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-drawback',
  templateUrl: './edit-drawback.component.html',
  styleUrls: ['./edit-drawback.component.css']
})
export class EditDrawbackComponent implements OnInit {

  constructor(public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  onConfirm(){
  this.dialog.closeAll();
  }

  closePopup(){
    this.dialog.closeAll();
  }
}
