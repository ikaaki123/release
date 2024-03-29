import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddDocumentsComponent } from '../document/add-documents/add-documents.component';
import { EditDrawbackComponent } from '../document/edit-drawback/edit-drawback.component';
import { Packages } from '../Models/package.model';
import { PackageItemService } from '../services/package-item/package-item.service';
//import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-drawback',
  templateUrl: './drawback.component.html',
  styleUrls: ['./drawback.component.css']
})
export class DrawbackComponent implements OnInit {
  fillPackage: any = [];
  fillFilePackage: any = [];
  documentErrorStatus: any = [];
  // endGrid
  filter: any = [];
  packageInfo!: Packages;
  fileTable: boolean = false;
  packageTable: boolean = true;
  totalRecords ? : number = 0;
  totalItemsPerPage ? : number = 0;
  changeItemsPerPage ? : number = 10;
  show: boolean = true
  pageSize!: number;
  previousPageIndex!: number;
  pageIndex!: number;
  pagenations: any = {
    pageSize: 10,
    pageNumber: 1
  }
  fileStatus: any = [];
  test: number = 1;

  filterText ? : any;
  tabName!: string;
  tabIndex!: number;


  constructor(
              private packageService: PackageItemService,
              private router: Router,
              public dialog: MatDialog,
              // private loader: NgxSpinnerService 
              ) {}

  ngOnInit(): void {

    this.filter = this.packageService.packgeGridFilter;
    this.fillPackageGrid();
    this.tabName = "შეკვრა";
    this.tabIndex = 0;
  }

 /* Drawback end grid */ 
  displayedColumns: string[] = ['boxNumber', 'packageNumber', 'businessEntity',
    'documentType', 'documentSubType', 'startDate', 'endDate', 'registrator',
    'status', 'checkResult', 'errorStatus', 'errorStatusClient', 'clientComment', 'dastaComments', 'icons'
  ];

  displayeFileColumns: string[] = ['boxNumber', 'packageNumber', 'businessEntity',
  'customerName', 'customerId', 'sentToDastaDate',
  'errorStatus', 'errorStatusClient', 'clientComment', 'dastaComment', 'icons'];

  displayeDocumentColumns: string[] = ['boxNumber', 'packageNumber', 'documentType',
  'customerName', 'customerId', 'sentToDastaDate',
  'checkResult', 'errorStatusClient', 'clientComment', 'dastaComment', 'icons'];


  fillPackageGrid() {
    if (this.filterText) {
      this.fillPackageOnFilter(this.filterText)
    } else {
      this.packageService.fillPackageGrid(this.pagenations).subscribe(res => {
        this.fillPackage = res;
        this.totalRecords = this.fillPackage.totalRecords;
      })
    }
  }
  fillFilePackageGrid(){
    if (this.filterText) {
      this.fillPackageOnFilter(this.filterText)
    } else {
      this.packageService.fillFilePackageGrid(this.pagenations).subscribe(res => {
        this.fillFilePackage = res;
        this.totalRecords = this.fillFilePackage.totalRecords;
      })
    }
  }

  documentStatusErrorGrd() {
    this.packageService.documentStatusErrorGrd(this.pagenations).subscribe(
      (response) => {
        this.documentErrorStatus = response;
        this.totalRecords = this.documentErrorStatus.totalRecords;
      }
    );
  }

  tabChanged(event:any){
    this.tabName = (event.tab.textLabel);
    this.tabIndex = (event.index);
    this.filterText = null;
    // this.tabId = (event.index);
    switch (this.tabName) {
      case "შეკვრა": {
        this.fillPackageGrid();
        
        break;
      }
      case "საქმე": {
        this.fillFilePackageGrid();
        //  this.fillPackageOnFilter(this.filter);
        break;
      }
      case "საბუთი": {
        this.documentStatusErrorGrd();
        //  this.fillPackageOnFilter(this.filter);
        break;
      }
    }
    
  }

  fillPackageOnFilter(filter: any) {
    this.filterText = filter;
    switch (this.tabName) {
      case "შეკვრა": {
        this.packageService.searchErrorPackage(this.filter, this.pagenations)
        .subscribe(response => {
          this.fillPackage = response;
          this.totalRecords = this.fillPackage.totalRecords;
        });
        break;
      }
      case "საქმე": {
        this.packageService.searchErrorFile(this.filter, this.pagenations)
        .subscribe(response => {
          this.fillFilePackage = response;
          this.totalRecords = this.fillPackage.totalRecords;
        });
        break;
      }
      case "საბუთი": {
        this.packageService.searchdocumentStatusError(this.filter, this.pagenations)
        .subscribe(response => {
          this.documentErrorStatus = response;
          this.totalRecords = this.fillPackage.totalRecords;
        });
        break;
      }

    }
  }

  pagenation(e: any) {
    this.pagenations.pageSize = e.pageSize;
    this.pagenations.pageNumber = e.pageIndex + 1;
    this.totalRecords = this.fillPackage.totalCount;
    switch (this.tabName) {
      case "შეკვრა": {
        // this.dataSource.filteredData.slice(startIndex, endIndex);
        this.fillPackageGrid()
        //  this.fillPackageOnFilter(this.filter);
        break;
      }
      case "საქმე": {
        this.fillFilePackageGrid();
        break;
      }
      case "საბუთი": {
        this.documentStatusErrorGrd();
        break;
      }
    }
   
  }
/* Drawback end grid */
  getFileStatus() {
    this.packageService.getFileStatus().subscribe(res => {
      this.fileStatus = res;
    })
  }
// test
  onFilter(e:any){}


  shows() {
    this.show = false;
  }



  packageinfo(fileId: any) {
    this.router.navigate(['home/packageDetail'])
    localStorage.setItem('fID', fileId);
    this.packageService.fileID = fileId;
  }
  showPackages() {
    this.packageTable = true;
    this.fileTable = false;
  }
 
  modalApproveNotApprove(gridRow: any, approve: boolean) {
    let typeId:number;
    switch (this.tabIndex) {
      case 0: {
        typeId = 1
        break;
      }
      case 1: {
        typeId = 2
        break;
      }
      case 2: {
        typeId = 3
        break;
      }
    }
    
    let dialogRef = this.dialog.open(EditDrawbackComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      const model = {
        TypeId: typeId,
        Approve: approve,
        Comment: result.Commetn,
        Id: gridRow.id,
        FromAdmin: true
      }
      
      this.packageService.ApproveNotApproveUser(model).subscribe(res => {
        this.fillPackageGrid();
      })
    });
  }

  getDate(dateCreated: Date,dateTime: string){
    if(dateCreated == null){
      this.fillPackageOnFilter(this.filter);
    }else{
    // let formattedDt = date.getDay + '-' + date.getMonth + '-' + date.getFullYear 
    var date = new Date(dateCreated),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  let fullDate  = [date.getFullYear(), mnth, day].join("-");
  const key = dateTime;
  Object.assign(this.filter, { [key]: fullDate });
  // this.filter = object;
  this.fillPackageOnFilter(this.filter);
    }
  }

  DownloadPackage() {
     //this.loader.show();
     this.packageService
       .downloadPackage(this.filter)
       .subscribe(
         (fileData) => {
           const filename = 'error_packages_';
           this.handleDownload(fileData, filename);
         },
       );
   }
   DownloadFile() {
    //this.loader.show();
    this.packageService
      .downloadFile(this.filter)
      .subscribe(
        (fileData) => {
          const filename = 'error_packages_';
          this.handleDownload(fileData, filename);
        },
      );
  }
  DownloadDocument() {
    //this.loader.show();
    this.packageService
      .downloadDocument(this.filter)
      .subscribe(
        (fileData) => {
          const filename = 'error_packages_';
          this.handleDownload(fileData, filename);
        },
      );
  }

  handleDownload(fileData:any, fileName:string) {
    fileName = fileName + Math.floor(Date.now() / 1000) + '.xlsx';
    //this.loader.hide();
    const blob: any = new Blob([fileData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
    

}
