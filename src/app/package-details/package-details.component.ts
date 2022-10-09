
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Detail } from '../Models/detail.model';
import { PackageItemService } from '../services/package-item/package-item.service';
import {AddDocumentsComponent} from "../document/add-documents/add-documents.component";
import {MatDialog} from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDelailsComponent implements OnInit {
  items: any = [];
  data: Detail;
  checkedClientName: boolean = true;
  checkedClientId: boolean = true;
  checkstatus:boolean = false;
// @Input() packageInfo!: Packages
@Output() backToPackagePage = new EventEmitter<Boolean>();
fileTable: boolean = false;
item:any = []
packageInfo!: any;


  constructor(private route: ActivatedRoute, private packageService: PackageItemService, private RT: Router,public dialog: MatDialog,private NotificationService: NotificationsService ) {
    this.data = new Detail();


  }

  ngOnInit(): void {
    this.getFile();
  }

  displayedColumns: string[] =
  ['documentId',
                                'documentTypeName',
                                'notInBox',
                                'documentStatusName',

                                'actionIcons'
                              ];

  onsuccess(){
    this.NotificationService.success('Success','წარმატებით დასრულდა შენახვა',{
      position: ["right", "top"],
      timeOut:700,
    });
}

 save(form: NgForm){
  
    // Object.assign(this.packageInfo);
  const saveFile = {
    FileId: this.packageInfo.fileId,
    FileNotInBox: this.packageInfo.fileNotInBox,
    ClientName: this.packageInfo.clientName,
    ClientId:this.packageInfo.clientId,
    ClientNameIsCorrect: this.packageInfo.clientNameIsCorrect,
    ClienNameCorrected:this.packageInfo.clienNameCorrected,
    UnambleToCheckName:this.packageInfo.unambleToCheckName,
    ClientIdIsCorrect: this.packageInfo.clientIdIsCorrect,
    clientIdCorrected:this.packageInfo.clientIdCorrected,
    UnableToCheckId:this.packageInfo.unableToCheckId,
    DatsaComment: this.packageInfo.DatsaComment
    }
    this.packageService.savaFile(saveFile).subscribe(res=>{
      if(res.status == 200){
        this.onsuccess();
      }
    })
  }

  document(item: any, fileID: any){
    this.RT.navigate(['home/document'])
    localStorage.setItem('itemID', item);
    this.packageService.documntID = item;
  }

  checkedEmptyBox(){

    if(this.packageInfo.fileNotInBox){
      this.checkstatus = false;
    }else{
      this.checkstatus = true;
      this.checkedClientName = true;
      this.packageInfo.ClientNameCorrected = false
      this.data.editName = false;
      this.data.correctId = false;
      this.data.editId = false;
      this.packageInfo.clientNameIsCorrect= false;
  this.packageInfo.clientIdIsCorrect= false;
  this.packageInfo.clienNameCorrected= false;
  this.packageInfo.clientIdCorrected= false;
  this.packageInfo.unambleToCheckName= false;
  this.packageInfo.unableToCheckId = false;

    }
  }
  back(){
    this.backToPackagePage.emit(true);
  }
  getFile() {
    this.packageService.getPackageDetail().subscribe(res => {
      this.packageInfo = res;
      this.item = res

    })
  }



/*===============================CHECKED==================*/

  clientIdIsCorrect(event:boolean){
    if(event){
      this.packageInfo.clientIdCorrected = false
      this.packageInfo.unableToCheckId = false
    }
  }
  clientIdCorrected(event:boolean){
    if(event){
      this.packageInfo.clientIdIsCorrect = false
      this.packageInfo.unableToCheckId = false
    }
  }

  unableToCheckId(event:boolean){
    if(event){
      this.packageInfo.clientIdIsCorrect = false
      this.packageInfo.clientIdCorrected = false
    }
  }

  clientNameIsCorrect(event:boolean){
    if(event){
      this.packageInfo.clienNameCorrected = false
      this.packageInfo.unambleToCheckName = false
    }
  }
  clienNameCorrected(event:boolean){
    if(event){
      this.packageInfo.clientNameIsCorrect = false
      this.packageInfo.unambleToCheckName = false
    }
  }

  unambleToCheckName(event:boolean){
    if(event){
      this.packageInfo.clientNameIsCorrect = false
      this.packageInfo.clienNameCorrected = false
    }
  }

  addDocument(){
      let dialogRef = this.dialog.open(AddDocumentsComponent
        , {
          disableClose: true,
          width: '700px',
          data: { fileId: this.packageInfo.fileId }
        });

      dialogRef.afterClosed().subscribe(result => {
        this.getFile();
        if (result == null || result.isEmpty)
          return;

      });
  }

  finishReleaseFile(fileId:number){
    const dataJson = {
      FileId: this.packageInfo.fileId,
      }
    this.packageService.finishReleaseFile(dataJson).subscribe(res =>{
      this.RT.navigate(['/home/packageitem']) 
    }); 
  }
  
}


