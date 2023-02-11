import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewspaceoperatorService } from 'src/app/services/NewSpaceOperator/newspaceoperator.service';
import { NewSpaceOperatorComponent } from '../new-space-operator.component';

@Component({
  selector: 'app-change-box-number-popup',
  templateUrl: './change-box-number-popup.component.html',
  styleUrls: ['./change-box-number-popup.component.css']
})
export class ChangeBoxNumberPopupComponent implements OnInit {
newNumber!:any;
currentBoxNumber!:any;
  constructor(
    private newSpaceOperService: NewspaceoperatorService,
    public dialogRef: MatDialogRef<NewSpaceOperatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.newNumber = this.data.boxNumber,
    this.currentBoxNumber = this.data.currentBoxNumber
  }

  closePopup(){
    this.dialogRef.close({result: false});
  }
  confirmClick(){
    this.dialogRef.close({result:true});
  }

}
