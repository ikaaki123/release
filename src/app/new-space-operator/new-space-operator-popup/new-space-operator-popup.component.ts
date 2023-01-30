import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewSpaceOperatorComponent } from '../new-space-operator.component';

@Component({
  selector: 'app-new-space-operator-popup',
  templateUrl: './new-space-operator-popup.component.html',
  styleUrls: ['./new-space-operator-popup.component.css']
})
export class NewSpaceOperatorPopupComponent implements OnInit {
date: any = new Date();
  constructor(public refDialog: MatDialogRef<NewSpaceOperatorComponent>,) { }

  ngOnInit(): void {
  }

  getDateRange() {
    var date = new Date(this.date),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    this.date = [date.getFullYear(), mnth, day].join("-");
  }


  onConfirm(){
    if (this.date == null || this.date == '1970-01-01' || this.date == 'NaN-aN-aN'){
      this.date =   new Date()
    }
    this.getDateRange();
   this.refDialog.close({SendToDastaDate:this.date})
  }

  closePopup(){
      this.refDialog.close()
  }

}
