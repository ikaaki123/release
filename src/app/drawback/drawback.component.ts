import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddDocumentsComponent } from '../document/add-documents/add-documents.component';
import { EditDrawbackComponent } from '../document/edit-drawback/edit-drawback.component';
import { Packages } from '../Models/package.model';
import { PackageItemService } from '../services/package-item/package-item.service';

@Component({
  selector: 'app-drawback',
  templateUrl: './drawback.component.html',
  styleUrls: ['./drawback.component.css']
})
export class DrawbackComponent implements OnInit {
  item:any = [];
  filter:any = [];
  packageInfo!: Packages;
  fileTable: boolean = false;
  packageTable: boolean = true;
  totalRecords?: number = 0;
  totalItemsPerPage?: number = 0;
  changeItemsPerPage?: number = 10;
  show:boolean = true
  pageSize!: number;
  previousPageIndex!: number;
   pageIndex!: number;
   pagenations:any= {
    pageSize: 10,
    pageNumber: 1
   }
   fileStatus:any = [];
   test:number =1;

filterText?:any;

  
  constructor( private packageService: PackageItemService,
    private router: Router,
    public dialog: MatDialog,) { }

    ngOnInit(): void {
   
      this.filter = this.packageService.packgeGridFilter;
       
     
          this.getErrorPackages();
      
    }

    displayedColumns: string[] = ['boxNumber', 'packageNumber', 'businessEntity',
    'documentType', 'documentSubType', 'startDate', 'endDate', 'registrator',
    'status', 'checkResult', 'errorStatus', 'errorStatusClient', 'icons'];
  
    getErrorPackages(){
    if(this.filterText){
      this.onFilter(this.filterText)
    }else{
      this.packageService.getErrorPackages(this.pagenations).subscribe(res=>{
      this.item = res;
      this.totalRecords = this.item.totalRecords;
    })
  }
}
getFileStatus(){
    this.packageService.getFileStatus().subscribe(res=>{
      this.fileStatus = res;
    })
}


  onFilter(filter :any) {
    
    this.filterText = filter;
    
    this.packageService.searchPackage(this.filter,this.pagenations)
      .subscribe(response => {
        this.item = response;
        this.totalRecords = this.item.totalCount;
      });
  }
pagenation(e:any){
  this.pagenations.pageSize = e.pageSize;
  this.pagenations.pageNumber = e.pageIndex + 1;
  this.totalRecords = this.item.totalCount;
  
  this.getErrorPackages()
}


shows(){
  this.show = false;
}



  packageinfo(fileId: any){
    this.router.navigate(['home/packageDetail'])
     localStorage.setItem('fID', fileId);
    this.packageService.fileID = fileId;
  }
  showPackages() {
    this.packageTable = true;
    this.fileTable = false;
  }
  
  modalApproveNotApprove() {

    let dialogRef = this.dialog.open(EditDrawbackComponent
      , {
        
        width: '500px',
        }
      );
}
}
