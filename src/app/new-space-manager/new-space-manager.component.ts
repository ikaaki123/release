import { Component, OnInit} from '@angular/core';
import { NewspaceService } from '../services/NewSpaceManager/newspace.service';

@Component({
  selector: 'app-new-space-manager',
  templateUrl: './new-space-manager.component.html',
  styleUrls: ['./new-space-manager.component.css']
})
export class NewSpaceManagerComponent implements OnInit {
  response: any = [];
  filesours!: any;
  token = localStorage.getItem('token');
  maxDate!: Date;
  date: any;
  correctDate: any;
  constructor(
    private newSpaceService: NewspaceService
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {}
  
  getDateRange() {
    var date = new Date(this.date),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    console.log([date.getFullYear(), mnth, day].join("-"));
    this.correctDate = [date.getFullYear(), mnth, day].join("-");
  }


  chooseFile(e: any) {
    this.filesours = e.target.files[0];
  }


  uploadFile() {
    this.getDateRange();
    if (this.correctDate == null || this.correctDate == '1970-01-01' || this.correctDate == 'NaN-aN-aN') {
      alert('გთხოვთ აირჩიეთ თარიღი.')
    } else {
      const formData = new FormData();
      formData.append('file', this.filesours);

      this.newSpaceService.uploadFile(this.correctDate, formData).subscribe(res => {
        console.log(res);
        alert(res);
      });
    }
  }

}
