import { Component, Inject, OnInit, Optional } from '@angular/core';
import { PackageItemsComponent } from '../package-items.component';
import { PackageItemService } from 'src/app/services/package-item/package-item.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteileForRelease',
  templateUrl: './deleteFileForRelease.component.html',
  styleUrls: ['./deleteFileForRelease.component.css']
})


export class DeleteileForReleaseComponent implements OnInit {

  constructor(public refDialog: MatDialogRef<PackageItemsComponent>,
              private packageService: PackageItemService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteileForReleaseComponent>,) { 
               
              }

  ngOnInit() {
  }

  onConfirm(){
    this.packageService.deleteFileForRelease(this.data.fileId).subscribe(res => {
      this.dialogRef.close({result:res});
    })
  }

  closePopup(){
      this.refDialog.close()
  }
}