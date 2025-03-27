
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Detail } from '../Models/detail.model';
import { PackageItemService } from '../services/package-item/package-item.service';
import {AddDocumentsComponent} from "../document/add-documents/add-documents.component";
import {MatDialog} from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { DeleteDocumentPopUpComponent } from './deleteDocumentPopUp/deleteDocumentPopUp.component';
import { JwtHelperService } from "@auth0/angular-jwt";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { EditTableComponent } from '../document/edit-table/edit-table.component';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PackageDelailsComponent implements OnInit {
  items: any = [];
  data: Detail;
  checkedClientName: boolean = true;
  checkedClientId: boolean = true;
  checkstatus:boolean = false;
  checkRowClick: boolean = false;
// @Input() packageInfo!: Packages
@Output() backToPackagePage = new EventEmitter<Boolean>();
fileTable: boolean = false;
item:any = []
itemForDocuments:any =[]
packageInfo!: any;
token: any;
decodedToken: any;
jwtHelper = new JwtHelperService();
documentDetail:any;
QRCode!: String;
saveQrTag!: String
documentId!: string;

//dataSourceForDocument = itemForDocumetn
expandedElement:any | null;

  constructor(private route: ActivatedRoute, private packageService: PackageItemService, private RT: Router,public dialog: MatDialog,private NotificationService: NotificationsService ) {
    this.data = new Detail();
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.decodedToken = this.jwtHelper.decodeToken(this.token );
    this.getFile();
  }

  displayedColumns: string[] =
   ['documentId',
    'documentTypeName',
    'notInBox',
    'documentStatusName',
    'countDocument',
    'additonalInfo',
    'actionIcons' ];

 displayedColumnsforDocument: string[] =
  [   'checker1',
       'checker2',
       'checker3',
       'checker4',
       'checker5'
    ];

  onsuccess(){
    this.NotificationService.success('Success','წარმატებით დასრულდა შენახვა',{
      position: ["right", "top"],
      timeOut:700,
    });
}

getDocuments(documentId:any){
this.documentId = documentId
  this.saveQrTag = ''
  this.packageService.getDocumet(documentId).subscribe(res=>{
   this.itemForDocuments = res;
   this.itemForDocuments = new MatTableDataSource(this.itemForDocuments.additionalFields);
  })

}

packageAction(e:any, i: number){
  const dialogRef = this.dialog.open(EditTableComponent, {
    width: '400px',
    data:e
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result.event == 'Cancel' && e.corrected) {
      e.corrected = false;
    } else {
      e.corrected = true;
    }
    e.value = result.data.value;
  });
  this.itemForDocuments[i] = e;
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
    DatsaComment: this.packageInfo.datsaComment
    }
    this.packageService.savaFile(saveFile).subscribe(res=>{
      if(res.status == 200){
        this.onsuccess();
      }
    })
  }

  document(event:any,item: any, fileID: any){
  //  var localName = event.target?.localName
  //   if(localName == "div" || localName == "span" || localName == "input" || localName == "i" ){
  //     this.checkRowClick = true
  //   }else{
  //     this.checkRowClick = false
  //   }

    //if(this.checkRowClick == false){
    this.RT.navigate(['home/document'])
    localStorage.setItem('itemID', item);
    this.packageService.documntID = item;
    //}
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
      this.items = res;
      this.item = res;

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

  addDocument(fileList:any, withQr:boolean){
      let dialogRef = this.dialog.open(AddDocumentsComponent
        , {
          disableClose: true,
          width: '700px',
          data: { fileId: this.packageInfo.fileId,
                  FileListInfo: fileList,
                  withQr: withQr}
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
  deletePackage(documentId: any, checkRowClick: boolean){

    this.checkRowClick = checkRowClick

      let dialogRef = this.dialog.open(DeleteDocumentPopUpComponent
        , {
          width: '500px',
          data: { documentId:  documentId}
          }
        );
        dialogRef.afterClosed().subscribe(result => {
          this.getFile();
        });
  }

  savePackage(data:any,documentID: number,e:any){
    this.checkRowClick = true
    if(data.additionalFields.length == 0){
      this.itemForDocuments.filteredData = [];
      const documentJson = {
        documentId: documentID,
        FileId: this.packageInfo.fileId,
        FileDocumetTypeId: data.documentTypeId,
        Comment: data.comment,
        ValueCorrect: data.documentIsCorret,
        ValueCorrection: data.documentCorrected,
        ValueCannotBeChecked: data.unableToCheckDocumet,
        NotInBox: data.notInBox,
        Space: false,
        AdditionalInformation: data.additionalInformation == '' ? null : data.additionalInformation,
        AdditionalFildsForRelease: this.itemForDocuments.filteredData == null ? [] : this.itemForDocuments.filteredData
       }
       this.packageService.saveDocument(documentJson).subscribe(res=>{
        this.checkRowClick = false
        data.additionalFields = null
        this.itemForDocuments.filteredData = []
        this.expandedElement = 'collapsed'
        this.onsuccess()
        this.getFile();
    })
    }else {
    if(this.itemForDocuments.filteredData != undefined) {
      if(this.itemForDocuments.filteredData[0].documentId == documentID){
        for (const { isCorret, corrected, unableToCheck } of this.itemForDocuments.filteredData) {
          if (!isCorret && !corrected && !unableToCheck) {
            alert("გთხოვთ დოკუმენტის ID: " + documentID + "-ის დამატებით ველებზე მონიშნოთ ერთ-ერთი პირობა: სწორეა, ვერ მოწმდება ან კორექტირება")
            return;
          }
        }
      const documentJson = {
        documentId: documentID,
        FileId: this.packageInfo.fileId,
        FileDocumetTypeId: data.documentTypeId,
        Comment: data.comment,
        ValueCorrect: data.documentIsCorret,
        ValueCorrection: data.documentCorrected,
        ValueCannotBeChecked: data.unableToCheckDocumet,
        NotInBox: data.notInBox,
        Space: false,
        AdditionalInformation: data.additionalInformation == '' ? null : data.additionalInformation,
        AdditionalFildsForRelease: this.itemForDocuments.filteredData == null ? [] : this.itemForDocuments.filteredData
       }
       this.packageService.saveDocument(documentJson).subscribe(res=>{
        this.checkRowClick = false
        data.additionalFields = null
        this.itemForDocuments.filteredData = []
        this.expandedElement.length = 0
        this.onsuccess()
        this.getFile();
    })

      }else{
        alert("გთხოვთ დოკუმენტის ID: " + documentID + "-ის დამატებით ველებზე მონიშნოთ ერთ-ერთი პირობა: სწორეა, ვერ მოწმდება ან კორექტირება")
      }
    } else {
      alert("გთხოვთ დოკუმენტის ID: " + documentID + "-ის დამატებით ველებზე მონიშნოთ ერთ-ერთი პირობა: სწორეა, ვერ მოწმდება ან კორექტირება")
    }
  }





    }

    checknotInBox(data: any){
      if(data.notInBox){
        data.additionalInformation = null
      }
    }

    generateDocWitQR(){

      this.packageService.generateDocumentByQRCode(this.QRCode, this.items.documentTypeId).subscribe(
             (response) => {
              this.addDocument(response, true);

             });
    }


  saveQrTagInDocument(){
    console.log(this.saveQrTag,this.documentId)
    this.packageService.saveQrTagInDocument(this.saveQrTag,this.documentId).subscribe(() => {
     this.getDocuments(this.documentId);
     this.saveQrTag = " ";
    })
  }

  onRowClick(t:any){
    console.log(t)
  }
}


