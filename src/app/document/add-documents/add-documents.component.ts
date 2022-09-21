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
  // @ts-ignore

  id!: any;
  value!: number;

  errorMessage!: boolean;
  errorMessageInput!: boolean;
  documentTypeIsRequired!: boolean;

  myControl = new FormControl();
  // options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];;
  filteredOptions!: Observable<User[]>;
  

  constructor(
    private dialogRef: MatDialogRef<any>,
    private service: PackageItemService,
   @Inject(MAT_DIALOG_DATA) public data: {fileId: string}
  ) {

  }

  ngOnInit(): void {
    this.getDocType();
    setTimeout(() => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filter(name) : this.documentType.slice())),
      );
    }, 1000)
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.documentType.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValue));
  }
 

  getDocType(){
  this.service.getDocType().subscribe(res=>{
    this.documentType = res;
  })
  }

  onChange(docNumber:any){
    console.log(docNumber.id);
    
    if(docNumber.id == undefined){
      this.errorMessage = false;
    }else {
    this.service.getFildsDoc(docNumber.id).subscribe(res=>{
      this.documentsFilds = res;
      this.documentNumber = docNumber.id
      
      return false
    })}


  }

  onNoClick(): void {
    this.dialogRef.close();
  }




  onAdd(fieldId:number, $event:any) {
    debugger
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
     comment: this.comment

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
