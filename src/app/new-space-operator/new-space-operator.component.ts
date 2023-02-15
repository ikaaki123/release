import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';

import { NewspaceoperatorService } from '../services/NewSpaceOperator/newspaceoperator.service';
import { ChangeBoxNumberPopupComponent } from './change-box-number-popup/change-box-number-popup.component';
import { EditPackageComponent } from './edit-package/edit-package.component';
import { FinishBoxComponent } from './finish-box/finish-box.component';
//import { NewspaceoperatorService } from '../services/NewSpaceOperator/NewSpaceOperator.service';
import {
  NewSpaceOperatorPopupComponent
} from './new-space-operator-popup/new-space-operator-popup.component';
import { PrintPackageComponent } from './print-package/print-package.component';
import { RegisterFormPackageComponent } from './registerFormPackage/register-form-package/register-form-package.component';

@Component({
  selector: 'app-new-space-operator',
  templateUrl: './new-space-operator.component.html',
  styleUrls: ['./new-space-operator.component.css']
})
export class NewSpaceOperatorComponent implements OnInit {
  item: any = [];
  boxNumber: any = 100460957;
  packageNumber:any;
  result!: any ;
  finishBoxCheckStatus: any;
  constructor(
    private newSpaceService: NewspaceoperatorService,
    public dialog: MatDialog,
    private NotificationService: NotificationsService,
  ) {}

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['boxNumber', 'packageNumber','actionIcons'];

  onsuccess(){
    this.NotificationService.success('Success','წარმატებით დასრულდა შენახვა',{
      position: ["bottom", "left"],
    timeOut: 1000,
      
    });
  }

  searchBoxNumber() {
    if (this.boxNumber == undefined || this.boxNumber == "") {
      this.item = []
    } else {
      this.newSpaceService.getDataByBoxNumber(this.boxNumber).subscribe(res => {
        this.item = res;
        if (this.item.status == 2) {
          let dialogRef = this.dialog.open(NewSpaceOperatorPopupComponent, {
            width: '500px',
          });
          dialogRef.afterClosed().subscribe(result => {
            const model = {
              BoxNumber: this.boxNumber,
              SendToDastaDate: result.SendToDastaDate
            }
            this.newSpaceService.createBox(model).subscribe(res => {
              this.onsuccess();
            })
          });
        }
      })
    }
  }

  searchPackageNumber(){
    if(this.boxNumber == null)
    {
      this.onAlert();
    }else{
      var json = {
        boxNumber: this.boxNumber,
        packageNumber: this.packageNumber
      }
      this.newSpaceService.UpdatePackageStatusForRelease(json).subscribe(res => {
        this.result = res;
        
        if(this.result.packageAddSuccess == true)
        {
          if(this.result.isSavedPackge ==  true)
          {
            alert("პაკეტს სტატუსი აქვს შენახული, გთხოვთ დაბეჭდოთ.")
            return
          }
          this.searchBoxNumber();
          this.packageNumber = null;
          this.onSuccessAlert();
        }else if(this.result.needAddPackage == true)
        {
          const dialogRef = this.dialog.open(RegisterFormPackageComponent
            , {
              disableClose: true,
              width: '900px',
              data: {boxnumber: this.boxNumber}
            });
            dialogRef.afterClosed().subscribe(result => {
              this.searchBoxNumber();
              this.packageNumber = '';
            });
        }else 
        {
          const dialogRef = this.dialog.open(ChangeBoxNumberPopupComponent
            , {
              disableClose: true,
              width: '700px',
              data: {
                boxNumber: this.boxNumber,
                currentBoxNumber: this.result.currentBoxNumber
              }
            });
            dialogRef.afterClosed().subscribe((response) => {
              if(response.result)
              {
                var json = {
                  boxNumber: this.boxNumber,
                  packageNumber: this.packageNumber
                }
                this.newSpaceService.ChangeBoxForPackage(json).subscribe(res => {
                  this.packageNumber = '';
                  this.onSuccessAlert();
                }) 
              }
              this.packageNumber = '';
            })
        }
      })
    };
  }

  registerPackage(){
    const dialogRef = this.dialog.open(RegisterFormPackageComponent
      , {
        disableClose: true,
        width: '700px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.searchBoxNumber();
      });
  }

  finishBox(){
    this.newSpaceService.FinishBox(this.boxNumber).subscribe(res => {
      this.finishBoxCheckStatus = res;
     if( this.finishBoxCheckStatus.result == true){
      const dialogRef = this.dialog.open(FinishBoxComponent
        , {
          width: '700px',
          disableClose: true,
        });
      dialogRef.afterClosed().subscribe(res => {
        if(res.result == false){
          this.boxNumber = '';
          this.packageNumber = '';
          this.item = []
        }
      });
     }else
     {
      this.boxNumber = '';
      this.packageNumber = '';
      this.item = []
     }
    })
  }

  printPackageinfo(packageId: number) {
    this.newSpaceService
      .printPackage(packageId)
      .subscribe(
        (response) => {
          this.searchBoxNumber();
          const dialogRef = this.dialog.open(PrintPackageComponent
            , {
              width: '900px',
              disableClose: true,
              data: response
            });
          dialogRef.afterClosed().subscribe(result => {
            // console.log(result);
          });
        },
      );
  }

  onAlert(){
    this.NotificationService.error('Warn','შეავსეთ ყუთის ნომერი',{
      position: ["right", "top"],
      timeOut: 2000,
    });
  }

  onSuccessAlert(){
    this.NotificationService.success('Success','ოპერაცია წარმატებით დასrულდა',{
      position: ["right", "top"],
      timeOut: 2000,
    });
  }

  editPackage(editPackages: any){
    const dialogRef = this.dialog.open(EditPackageComponent
      , {
        disableClose: true,
        width: '700px',
        data: {editPackages}
      });
      dialogRef.afterClosed().subscribe(result => {
         this.searchBoxNumber();
         this.onSuccessAlert();
      });
  }
}
