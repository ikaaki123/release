import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import {
  NewspaceService
} from '../services/newspace/newspace.service';
import {
  NewSpaceOperatorPopupComponent
} from './new-space-operator-popup/new-space-operator-popup.component';

@Component({
  selector: 'app-new-space-operator',
  templateUrl: './new-space-operator.component.html',
  styleUrls: ['./new-space-operator.component.css']
})
export class NewSpaceOperatorComponent implements OnInit {
  item: any = [];
  boxNumber!: any;
  constructor(
    private newSpaceService: NewspaceService,
    public dialog: MatDialog,
    private NotificationService: NotificationsService,
  ) {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['boxNumber', 'packageNumber'];

  onsuccess(){
    this.NotificationService.success('Success','წარმატებით დასრულდა შენახვა',{
      position: ["bottom", "left"],
    timeOut: 1000,
      
    });
  }

  searchPakage() {
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
}
