import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewSpaceOperatorComponent } from '../new-space-operator.component';

@Component({
  selector: 'app-finish-box',
  templateUrl: './finish-box.component.html',
  styleUrls: ['./finish-box.component.css']
})
export class FinishBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewSpaceOperatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  closePopup(){
    this.dialogRef.close({result: false});
  }
  confirmClick(){
    this.dialogRef.close({result:true});
  }


}
