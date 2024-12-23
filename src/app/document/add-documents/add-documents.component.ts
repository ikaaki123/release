import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { map, Observable, startWith } from 'rxjs';
import {PackageItemService} from "../../services/package-item/package-item.service";

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.css']
})
export class AddDocumentsComponent implements OnInit {
  documentType: any = []
  documentsFilds:any =[];
  additionalFilds: DocAddFields[] = [];
  addFields: DocAddFields[] = [];
  documentNumber!: any;
  UnableToCheckComment!: string;
  NotInBox: boolean = false;
  comment!: string;
  OldDocumentId!: number;
  additionalFieldsValue: AdditionalFieldsForDocument[] = [];
  // @ts-ignore
  items: any[];

  id!: any;
  value!: number;

  errorMessage!: boolean;
  errorMessageInput!: boolean;
  documentTypeIsRequired!: boolean;
  isQr!:boolean;

  myControl = new FormControl();
  // options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];;
  filteredOptions!: any;
  

  constructor(
    private dialogRef: MatDialogRef<any>,
    private service: PackageItemService,
   @Inject(MAT_DIALOG_DATA) public data: {fileId: string,FileListInfo:any,withQr:boolean}
  ) {

  }

  ngOnInit(): void {
    if(!this.data.withQr){
      this.getDocType();
      setTimeout(() => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(name => (name ? this._filter(name) : this.documentType.slice())),
        );
      }, 1000)
    }else{
      this.getDocType();
      this.onChange(this.data.FileListInfo.fileDocumetTypeId)
      this.additionalFieldsValue = this.data.FileListInfo.additionalFieldList;
      this.additionalFilds = this.data.FileListInfo.additionalFieldList.map((x:any) => ({ id: x.id, value: x.value }));
  
    }
   
        
        
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.documentType.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValue));
  }
 
  // get fieldsToDisplay() {
  //   return this.data.withQr ? this.additionalFieldsValue : this.documentsFields;
  // }

  getDocType(){
  this.service.getDocType().subscribe(res=>{
    this.documentType = res;
    if(this.data.withQr){
      var t=  this.documentType.find((option:any) => option.id === this.data.FileListInfo.fileDocumetTypeId)
    this.myControl.setValue(t.name);
    }
  })
  }

  onChange(docNumber:any){
    var docNumberQR:any;
    if(this.data.withQr){
      docNumberQR = docNumber
    }
    else{
      docNumberQR = docNumber.id
    }
    if(docNumberQR == undefined){
      this.errorMessage = false;
    }else {
    this.service.getFildsDoc(docNumberQR).subscribe(res=>{
      
      this.documentsFilds = res;
      this.documentNumber = docNumberQR
      return false
    })}


  }

  onNoClick(): void {
    this.dialogRef.close();
  }




  onAdd(fieldId:number, $event:any) {
    if (this.additionalFilds.some(e => e.id == fieldId)) {
      // @ts-ignore
      this.additionalFilds.find(e => e.id == fieldId).value = $event.target.value;
    }
    else {
      this.additionalFilds.push(new DocAddFields(fieldId, $event.target.value));
    }
    for (var item in this.addFields) {
      if (this.addFields[item].id == fieldId) {
        this.addFields[item].value = $event.target.value
      }
      else if (this.addFields[item].value == undefined) {
        this.addFields[item].value = "";
      }
    }
  }





  onSubmit(){
   const saveDocumentJson = {
     additionalFilds: this.additionalFilds,
     fileDocumetTypeId: this.documentNumber,
     fileId: this.data.fileId,
     //UnableToCheckComment: this.UnableToCheckComment, დასტას კომენტარი
     //NotInBox: this.NotInBox, არ დევს საქმეში
     comment: this.comment,
     OldDocumentId: this.OldDocumentId
     

    }
    this.service.saveDoc(saveDocumentJson).subscribe(res=>{
      this.dialogRef.close();
    })

  // if(this.documetSaveJson.id == undefined || this.documetSaveJson.id == null) {
  //   this.errorMessage = true;
  // }else{
  //   this.errorMessage = false;
  // }
  //   for(let i = 0; i <= this.documentsFilds.length; i++){
  //     const element = this.documentsFilds[i];
  //     if(element.isRequired == true && this.documetSaveJson.name == undefined) {
  //       this.errorMessageInput = true;
  //       break;
  //     }

    // }
    

  }

}
export class DocAddFields {
  id: number
  value: any

  constructor(id: number, value: any) {
    this.id = id;
    this.value = value;
  }
}

export interface User {
  name: string;
  id: number
}


export interface AdditionalFieldsForDocument {
  id: number,
  name: string,
  isRequired: boolean,
  fieldFormatTypeId: number,
  showPopUp: boolean,


  //-for additonal field results;
  value: any
}