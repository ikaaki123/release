import { Component, DefaultIterableDiffer, OnInit } from '@angular/core';
import { DestroyBoxServiceService } from '../services/DestroyBox/DestroyBoxService.service';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-DestroyBox',
  templateUrl: './DestroyBox.component.html',
  styleUrls: ['./DestroyBox.component.css']
})
export class DestroyBoxComponent implements OnInit {
  response: any = [];
  filesours!: any;
  token = localStorage.getItem('token');
  maxDate!: Date;
  date: any;
  correctDate: any;
  constructor(
    private destroyBoxService: DestroyBoxServiceService,
    private dialog: MatDialog,
  ) {
    this.maxDate = new Date();
   }

  ngOnInit() {
  }
  getDateRange() {
    var date = new Date(this.date),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    this.correctDate = [date.getFullYear(), mnth, day].join("-");
  }

  chooseFile(e: any) {
    this.filesours = e.target.files[0];
  }

  uploadFiles() {
    this.getDateRange();
    if (this.correctDate == null || this.correctDate == '1970-01-01' || this.correctDate == 'NaN-aN-aN') {
      alert('გთხოვთ აირჩიეთ თარიღი.')
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {header:'ნამდვილად გსურთ ყუთის განადგურება?'}
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        if(result.result == true) {
          const formData = new FormData();
          formData.append('file', this.filesours);
          this.destroyBoxService.uploadFile(formData,this.correctDate).subscribe(res => {
            this.filesours = null;
          });
        } else {
          this.dialog.closeAll();
        }
      });
    }
  }
}