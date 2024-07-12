
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
export class DestroyBoxServiceService {
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
  ///Destroy Box
  uploadFile(formData: any, correctDate:string) {
    let headers = this.generateHeader()
    return this.http.post(this.baseUrl + '/Package/DestoryBoxByXlsx/'+ correctDate, formData, {
      headers: headers,
      responseType: 'text'
    })
  }
}

