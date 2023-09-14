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
  constructor(
    private destroyBoxService: DestroyBoxServiceService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  chooseFile(e: any) {
    this.filesours = e.target.files[0];
  }

  uploadFiles() {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        console.log(result.result);
        if(result.result == true) {
          const formData = new FormData();
          formData.append('file', this.filesours);
          this.destroyBoxService.uploadFile(formData).subscribe(res => {
            alert(res);
            this.filesours = null;
          });
        } else {
          this.dialog.closeAll();
        }
      });
    }
  }
  