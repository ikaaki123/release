import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DestroyBoxComponent } from '../DestroyBox/DestroyBox.component';

@Component({
  selector: 'app-ConfirmDialog',
  templateUrl: './ConfirmDialog.component.html',
  styleUrls: ['./ConfirmDialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  header!:string;
  constructor(
    public dialogRef: MatDialogRef<DestroyBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.header = this.data.header;
  }
  closePopup(){
    this.dialogRef.close({result: false});
  }
  confirmClick(){
    this.dialogRef.close({result:true});
  }

}
