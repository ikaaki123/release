import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { catchError, observable, Observable,  throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private RT: Router, private NotificationService: NotificationsService
  ) {  }
  onsuccess(text: any){
    this.NotificationService.error('შეცდომა',text,{
      position: ["right", "top"],
      timeOut:2000,
    });
}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // const clonedRequest = req.clone({
      //   headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'),
      //   withCredentials: true
      // });
      

      return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse,res): Observable<any> => {
          if(error.status == 400 && error.error.statusCode == 401){
            this.onsuccess(error.error.message)
          }else if(error.status == 401){
            this.RT.navigate(['/login'])
            localStorage.clear()
          }
           throw new Error(error.error.message); 
        })
      );
      
  }
}
