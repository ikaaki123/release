import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { subtract } from 'ngx-bootstrap/chronos';
import { PackageItemService } from 'src/app/services/package-item/package-item.service';

@Component({
  selector: 'app-deleteDocumentPopUp',
  templateUrl: './deleteDocumentPopUp.component.html',
  styleUrls: ['./deleteDocumentPopUp.component.css']
})
export class DeleteDocumentPopUpComponent implements OnInit {

  constructor(public refDialog: MatDialogRef<DeleteDocumentPopUpComponent>,
              private packageService: PackageItemService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteDocumentPopUpComponent>,) { 
               
              }
 


  ngOnInit() {
  }

  onConfirm(){
    this.packageService.deleteFileDocumentForRelease(this.data.documentId).subscribe(res => {
      this.dialogRef.close({result:res});
    })
  }

  closePopup(){
      this.refDialog.close()
  }


}
