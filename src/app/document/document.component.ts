import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Detail } from '../Models/detail.model';
import { PackageItemService } from '../services/package-item/package-item.service';
import {AddDocumentsComponent} from "./add-documents/add-documents.component";
import {MatDialog} from "@angular/material/dialog";
import {HttpHeaders} from "@angular/common/http";
import { NotificationsService } from "angular2-notifications";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EditTableComponent } from './edit-table/edit-table.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  item:any = [];
  data: any;
  comment: boolean = false;
  correct: boolean = false;
  notChecked: boolean = false;
  edit: boolean = false;
  documentDetail:any;
  fileId!:any;
  additionalFields = this.item.additionalFields;
  tests :boolean = false;
  





  displayedColumns: string[] =
  [   'checker1',
                                'checker2',
                                'checker3',
                                'checker4',
                                'checker5',

                              ];
dataSource = new MatTableDataSource<any>();



  constructor(private service: PackageItemService, 
              private RT: Router,
              public dialog: MatDialog,
              private NotificationService: NotificationsService,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getDocument();
  }

getDocument(){
  this.service.getDocumet().subscribe(res => {
    this.documentDetail = res;
    this.item = res;
  })
}
  onsuccess(){
    this.NotificationService.success('Success','წარმატებით დასრულდა შენახვა',{
      position: ["bottom", "left"],
    timeOut: 700,
      
    });
  }

  save(){
    this.onsuccess();
  const documentJson = {

    documentId: this.documentDetail.id,
    FileId: this.documentDetail.fileId,
    FileDocumetTypeId: this.documentDetail.documentTypeId,
    Comment:this.documentDetail.comment,
    ValueCorrect:this.documentDetail.documentIsCorret,
    ValueCorrection:this.documentDetail.documentCorrected,
    ValueCannotBeChecked:this.documentDetail.unableToCheckDocumet,
    NotInBox:this.documentDetail.documentNotInBox,
    Space: this.documentDetail.space,
    AdditionalInformation: this.documentDetail.additionalInformation,
    AdditionalFildsForRelease: this.item.additionalFields

  }

    this.service.saveDocument(documentJson).subscribe(res=>{

  
        this.getDocument();
        this.RT.navigate(['/home/packageDetail']);

    })

  }

  checkedEmptyBox(event: any){
  if(event.checked == true){
    this.comment = true;
  }else {
    this.comment = false;
  }
  }



  addDocument() {

    let dialogRef = this.dialog.open(AddDocumentsComponent
      , {
        disableClose: true,
        width: '700px',
        data: { fileId: this.documentDetail.fileId }
      });
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
    
    this.item.additionalFields[i] = e;
  }
}