import { Component, OnInit } from '@angular/core';
import { PackageItemService } from '../../services/package-item/package-item.service'
import { Packages } from '../../Models/package.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddClientsComponent } from '../../../app/package-items/add-clients/add-clients.component'
import { NotificationsService } from 'angular2-notifications';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DeleteileForReleaseComponent } from '../../../app/package-items/deleteFileForRelease/deleteFileForRelease.component';


@Component({
  selector: 'app-pkg-without-file',
  templateUrl: './pkg-without-file.component.html',
  styleUrls: ['./pkg-without-file.component.css']
})
export class PkgWithoutFileComponent implements OnInit {
 jwtHelper = new JwtHelperService();
  decodedToken: any;
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
checkRowClick: boolean = false;
token:any;
pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(
    private packageService: PackageItemService,
    private router: Router,
    public dialog: MatDialog,
    private NotificationService: NotificationsService,
  ) {
   }

  ngOnInit(): void {
    var pageSize = localStorage.getItem('pageSizeRelease')
    this.token = localStorage.getItem('token')
    this.decodedToken = this.jwtHelper.decodeToken(this.token );

    this.filter = this.packageService.packgeGridFilter;
    this.pagenations.pageSize = pageSize == null ? 10 :pageSize;
      if(this.filter == null ) {
        this.getPackageItem();
      } else {
        this.onFilter(this.filter)
      }

    this.getFileStatus();
    this.packageService.receiveMessage().subscribe((res: boolean)=> {
      this.fileTable = res;
    })
  this.packageService.documntID
  }
  displayedColumns: string[] =
  ['boxNumber',
                                'packageNumber',
                                // 'caseId',
                                'caseNumber',
                                'clientName',
                                'clientId',
                                'checkerDate',
                                 'dateOfInspection',
                                 'creator',
                                'checkingUser',
                                'caseStatur',
                                'actionIcons',


                              ];
  getPackageItem(){
    if(this.filterText){
      this.onFilter(this.filterText)
    }else{
      this.packageService.getPackageWithoutFile(this.pagenations).subscribe((res: any)=>{
      this.item = res;
      this.totalRecords = this.item.totalCount;
      if(this.item.totalCount == 0) this.onAlert();
    })
  }
}

onAlert(){
  this.NotificationService.warn('Warn','პაკეტი არ არის რეგისტრირებული',{
    position: ["right", "top"],
    timeOut: 2000,
  });
}

getFileStatus(){
    this.packageService.getFileStatus().subscribe((res: any)=>{
      this.fileStatus = res;
    })
}


onFilter(filter :any) {
    this.filterText = filter;

    this.packageService.searchPackageWithoutFile(this.filter,this.pagenations)
      .subscribe((response: any) => {
        this.item = response;
        this.totalRecords = this.item.totalCount;
       if(this.item.totalCount == 0) this.onAlert();
      });
  }
pagenation(e:any){
  localStorage.setItem('pageSizeRelease',e.pageSize)
  this.pagenations.pageSize = e.pageSize;
  this.pagenations.pageNumber = e.pageIndex + 1;
  this.totalRecords = this.item.totalCount;
  this.getPackageItem();
}

handleDownload(fileData:any, fileName:any) {
  fileName = fileName + Math.floor(Date.now() / 1000) + ".xlsx";
  const blob: any = new Blob([fileData], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  let link = document.createElement("a");

  if (link.download !== undefined) {
    let url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

download(){
  this.packageService.downloadPackageData(this.filter,this.pagenations)
  .subscribe(
    (fileData: any)=>{
      let filename = "Release_report";
      this.handleDownload(fileData, filename);
  });
}

shows(){
  this.show = false;
}

getDate(dateCreated: Date,dateTime: string){
  // let formattedDt = date.getDay + '-' + date.getMonth + '-' + date.getFullYear
  var date = new Date(dateCreated),
  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  day = ("0" + date.getDate()).slice(-2);
let fullDate  = [date.getFullYear(), mnth, day].join("-");
const key = dateTime;
Object.assign(this.filter, { [key]: fullDate });
// this.filter = object;
this.onFilter(this.filter);


}

packageinfo(fileId: any,event:any){
  if(event != null){
  const targetClasses = (event.target).classList;
  if ((targetClasses.contains('mat-column-boxNumber') ||
      targetClasses.contains('mat-column-packageNumber') ||
      targetClasses.contains('mat-column-caseNumber') ||
      targetClasses.contains('mat-column-clientName') ||
      targetClasses.contains('mat-column-clientId')) || targetClasses.length == 3){
    return;
  }
}
  if(this.checkRowClick == false){
    this.router.navigate(['home/packageDetail'])
    localStorage.setItem('fID', fileId);
   this.packageService.fileID = fileId;
  }
  }
  showPackages() {
    this.packageTable = true;
    this.fileTable = false;
  }

  addClient(packageId: number,packageNumber: string, checkRowClick: boolean){
    this.checkRowClick = checkRowClick
    let dialogRef = this.dialog.open(AddClientsComponent
      , {
        width: '500px',
        data: { packageId: packageId,
                packageNumber: packageNumber}
        }
      );
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
        this.checkRowClick = false;
        this.getPackageItem();
        }
      });
  }

  deletePackage(fileId: any, checkRowClick: boolean){
    this.checkRowClick = checkRowClick
      let dialogRef = this.dialog.open(DeleteileForReleaseComponent
        , {
          width: '500px',
          data: { fileId: fileId }
          }
        );
        dialogRef.afterClosed().subscribe(result => {
          this.checkRowClick = false
          this.getPackageItem();
        });

  }
}
