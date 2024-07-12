import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewspaceService {
  token = localStorage.getItem('token');
  baseUrl: string = 'https://releaseapi.drm.ge/api';


  constructor(private http: HttpClient) {}
  generateHeader() {
    if (this.token !== localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
    }
    let newHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    })
    return newHeaders;
  }
  ///NEW SPACE MANAGER SERVICE
  uploadFile(correctDate: any, formData: any) {
    let headers = this.generateHeader()
    return this.http.post(this.baseUrl + '/Package/uploadBoxByXlsx/' + correctDate, formData, {
      headers: headers,
      responseType: 'text'
    })
  }

  ///NEW SPACE MANAGER OPERATOR
  getDataByBoxNumber(boxNumber: any) {
    let headers = this.generateHeader()
    return this.http.get(this.baseUrl + '/Package/GetPackageByBoxNumebr/' + boxNumber, {
      headers: headers
    })
  }

  createBox(model:any){
    let headers = this.generateHeader()
    return this.http.post(this.baseUrl + '/Package/CreateBox',model,{headers: headers})
  }
}
