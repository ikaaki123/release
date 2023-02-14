import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-print-package',
  templateUrl: './print-package.component.html',
  styleUrls: ['./print-package.component.css']
})
export class PrintPackageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    //private alertiFy: AlertifyService,
   // private packageService: PackagesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("printData", this.data);
  }

  closePopup(){
    this.dialog.closeAll()
  }

  printComponent() {
    window.print();
  }


}
