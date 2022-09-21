import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PackageItemService } from 'src/app/services/package-item/package-item.service';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit {
  clientInfo = {
    packageId: null,
    clientName: "",
    clientId: "",
  }
  
  constructor(
    private packageService: PackageItemService,
    public dialogRef: MatDialogRef<AddClientsComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.clientInfo.packageId = data.packageId
  }

  ngOnInit(): void {
  }

  addClient(e: any){
    this.packageService.addClient(e).subscribe(res=>{this.dialogRef.close();})
  }

}
