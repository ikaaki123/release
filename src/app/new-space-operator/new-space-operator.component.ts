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
//import { NewspaceoperatorService } from '../services/NewSpaceOperator/NewSpaceOperator.service';
import {
  NewSpaceOperatorPopupComponent
} from './new-space-operator-popup/new-space-operator-popup.component';
import { RegisterFormPackageComponent } from './registerFormPackage/register-form-package/register-form-package.component';

@Component({
  selector: 'app-new-space-operator',
  templateUrl: './new-space-operator.component.html',
  styleUrls: ['./new-space-operator.component.css']
})
export class NewSpaceOperatorComponent implements OnInit {
  item: any = [];
  boxNumber!: any ;
  packageNumber!:any;
  result!: any ;
  constructor(
    private newSpaceService: NewspaceoperatorService,
    public dialog: MatDialog,
    private NotificationService: NotificationsService,
  ) {}

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['boxNumber', 'packageNumber'];

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
          this.searchBoxNumber();
          this.packageNumber = null;
          this.onSuccessAlert();
        }else if(this.result.needAddPackage == true)
        {
          const dialogRef = this.dialog.open(RegisterFormPackageComponent
            , {
              disableClose: true,
              width: '700px',
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
      });
  }

  finishBox(){
    this.boxNumber = '';
    this.packageNumber = '';
    this.item = []
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
}
