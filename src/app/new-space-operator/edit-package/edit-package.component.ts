import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { NewspaceoperatorService } from 'src/app/services/NewSpaceOperator/newspaceoperator.service';
import { NewSpaceOperatorComponent } from '../new-space-operator.component';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css']
})
export class EditPackageComponent implements OnInit {
  startDate: boolean = false;
  endDate: boolean = false;
  loan: boolean = false; 
  geni: boolean = false;
  personalId: boolean = false;
  fullName: boolean = false; 
  emplMail: boolean = false; 
  lbBundle: boolean = false;
  lbPackage: boolean = false;
  
  boxNumberLength!:any;
  checkedBoxNumberDBError: boolean = false;
  checkedBoxNumberDB!: any;
  
  companyId!: number;
  
  businessEntities: any = []; 
  documentTypes: any = []
  documentSubTypes: any = [];
  ShowExtaFild:any;
  
  today = new Date();
  
  invalid: boolean = false;
  errorBoxNumber: boolean = false;
  error: any = { isError: false, errorMessage: '' };
  endDates:any;
  startDates: any;  

  data = {
    id: null, 
    businessEntityId:null,
    boxNumber:'',
    documentTypeId: null,
    documentSubtypeId: null,
    geni:null,
    loan:null,
    personalId:'',
    fullName:null,
    lB_File:null,
    lB_Box:null,
    identification:null,
    documentSpecies: null,
    mail: null,
    comment: null,
    startDate:'',
    endDate: '',
    FromRelease:true
  }
  
  jwtHelper = new JwtHelperService();
  token : any;
  decodedToken:any;
    constructor(
      private newSpaceOperService: NewspaceoperatorService,
      public dialogRef: MatDialogRef<NewSpaceOperatorComponent>,
      @Inject(MAT_DIALOG_DATA) public d: any,
      public datepipe: DatePipe
  
    ) {}
  
    ngOnInit(): void {
      this.token = localStorage.getItem('token')
      this.decodedToken = this.jwtHelper.decodeToken(this.token);
      this.companyId = this.decodedToken.CompanyId;
      // this.data.boxNumber = this.d.boxnumber
      this.getBusinessEntities();
      this.data.id = this.d.editPackages.id
      this.data.boxNumber = this.d.editPackages.boxNumber;
      this.data.businessEntityId = this.d.editPackages.businessEntityId;
      this.data.comment = this.d.editPackages.comment;
      this.data.documentSpecies = this.d.editPackages.documentSpecies;
      this.data.documentSubtypeId = this.d.editPackages.documentSubtypeId;
      this.endDates = this.d.editPackages.endDate == '' ? '' : new Date(this.d.editPackages.startDate);
      this.data.fullName = this.d.editPackages.fullName;
      this.data.geni =this.d.editPackages.geni;
      this.data.identification = this.d.editPackages.identification == undefined ? "" : this.d.editPackages.identification;
      this.data.lB_Box = this.d.editPackages.lB_Box;
      this.data.lB_File =this.d.editPackages.lB_File;
      this.data.loan = this.d.editPackages.loan;
      this.data.mail = this.d.editPackages.mail;
      this.personalId = this.d.editPackages.personalId == undefined ? '' : this.d.editPackages.personalId;
      this.startDates = this.d.editPackages.startDate == '' ? '' : new Date(this.d.editPackages.startDate);
      this.GetDocumentType(this.d.editPackages.businessEntityId!);
      this.data.documentTypeId = this.d.editPackages.documentTypeId;
      this.GetDocumentSubType(this.d.editPackages.documentTypeId);
      this.data.documentSubtypeId = this.d.editPackages.documentSubtypeId;
    }
  
    getBusinessEntities(){
      this.newSpaceOperService.getBusinessEntities().subscribe(res =>{
        this.businessEntities = res
      })
    }
  
    GetDocumentType(documentTypeId: number){
      this.newSpaceOperService.GetDocumentType(documentTypeId).subscribe(res=>{
        this.documentTypes = res  
      })
    }
  
    GetDocumentSubType(documentTypeId: number){
      this.newSpaceOperService.GetDocumentSubType(this.data.documentTypeId!).subscribe(res=>{
        this.documentSubTypes = res  
      })
      this.ShowExtaFildByBusinessEntitiesId(this.data.documentTypeId!)
    }
    
    ShowExtaFildByBusinessEntitiesId(documentTypeId: number){
      this.newSpaceOperService.ShowExtaFildByBusinessEntitiesId(documentTypeId).subscribe((response: any)=>{
        this.startDate = response.startDate;
        this.endDate = response.endDate;
        this.loan = response.loan;
        this.geni = response.geni;
        this.personalId = response.personalId;
        this.fullName = response.fullName;
        this.emplMail = response.emplMail;  
        this.lbBundle = response.lB_Box;
        this.lbPackage = response.lB_File;
      })
    }
    save(){
          var startDate = this.endDates == ''? '': this.newSpaceOperService.dateToStringFormater(this.startDates.toString());
          var endDate = this.endDates == '' ? '' : this.newSpaceOperService.dateToStringFormater(this.endDates.toString());
          this.data.startDate = startDate!;
          this.data.endDate = endDate!;

      if(this.data.businessEntityId == null || 
        this.data.boxNumber == null || 
        this.data.documentTypeId == null ||
        this.data.documentSubtypeId == null
        )
        {
          this.invalid = true;
          return
        }else if(this.data.boxNumber.length < 9)
        {
         this.errorBoxNumber = true;
         return
        }else{
          this.errorBoxNumber = false;
        }
        if(!this.startDate || !this.endDate)
        {
          this.data.startDate = '';
          this.data.endDate = '';
        }else if(this.startDates == undefined || this.endDates == undefined)
        {
          this.invalid = true;
          return
        }
        //თარიღების შემოწმება
      if(this.startDates != "" && this.endDates != "") {
        if (
          this.endDates
          < this.startDates) {
          this.error = { isError: true, errorMessage: 'დაწყების თარიღი არ უნდა აღემატებოდეს დასრულების თარიღს' };
          return;
        }else {
          this.error = { isError: false, errorMessage: 'დაწყების თარიღი არ უნდა აღემატებოდეს დასრულების თარიღს' };
        }
        if (new Date(this.endDates) > this.today) {
          this.error = { isError: true, errorMessage: 'დასრულების თარიღი არ უნდა აღემატებოდეს მიმდინარე თარიღს' };
          return 
        }else{
          this.error = { isError: false, errorMessage: 'დასრულების თარიღი არ უნდა აღემატებოდეს მიმდინარე თარიღს' };
        }
      }
       
        if(String(this.data.boxNumber).length < 9)
        {
          this.errorBoxNumber = true;
          return
        }
        this.checkedBoxNumberDBError = false;
        this.newSpaceOperService.isBoxInDb(this.data.boxNumber).subscribe(res=>{
         this.checkedBoxNumberDB = res;
         if(this.checkedBoxNumberDB.result == false){
          this.checkedBoxNumberDBError = true;
         }else{
          this.newSpaceOperService.editPackage(this.data).subscribe(res=>{
            this.closePopup();
          })
         }
        })
    }
  
    closePopup(): void {
      this.dialogRef.close();
    }
  
  }
