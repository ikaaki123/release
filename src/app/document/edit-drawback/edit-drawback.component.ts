import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DrawbackComponent } from 'src/app/drawback/drawback.component';

@Component({
  selector: 'app-edit-drawback',
  templateUrl: './edit-drawback.component.html',
  styleUrls: ['./edit-drawback.component.css']
})
export class EditDrawbackComponent implements OnInit {
  comment!: string;
  constructor( public refDialog: MatDialogRef<DrawbackComponent>, ) { }

  ngOnInit(): void {
  }

  onConfirm(){
    if(this.comment != null) this.refDialog.close({Commetn:this.comment})
  }

  closePopup(){
      this.refDialog.close()
  }
}
