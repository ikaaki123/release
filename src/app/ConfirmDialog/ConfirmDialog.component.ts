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
  constructor(
    public dialogRef: MatDialogRef<DestroyBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }
  closePopup(){
    this.dialogRef.close({result: false});
  }
  confirmClick(){
    this.dialogRef.close({result:true});
  }

}
