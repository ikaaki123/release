
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  action:string;
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<EditTableComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    this.local_data = {...data};
    this.action = this.local_data.action; 
   }

  ngOnInit(): void {
    
  }
  doAction(){
    if( this.local_data.fieldFormatTypeId == 4){
      if (typeof this.local_data.value === 'string' || this.local_data.value instanceof String) {
        this.dialogRef.close({event:this.action,data:this.local_data});
      } else {
        const offset = this.local_data.value.getTimezoneOffset()
        this.local_data.value = new Date(this.local_data.value.getTime() - (offset*60*1000))
        this.local_data.value = this.local_data.value.toISOString().split('T')[0]
         this.dialogRef.close({event:this.action,data:this.local_data});
      }     
    }else {
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
    
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
