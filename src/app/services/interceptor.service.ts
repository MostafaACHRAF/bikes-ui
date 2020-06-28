import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getTokenSilently$().pipe(
      mergeMap(token => {
        console.log("Fetched token = " + token);
        //token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZiT0pqSGl6WC1XSTZJcVA5WmJJbyJ9.eyJpc3MiOiJodHRwczovL2Rldi0ycnlncTIxNC5hdXRoMC5jb20vIiwic3ViIjoiaVoyNll3bzQwMEF3bzBUM2NuSkhLYnk4Sm5WMFRzNXpAY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImlhdCI6MTU5MzAzNTg2MSwiZXhwIjoxNTkzMTIyMjYxLCJhenAiOiJpWjI2WXdvNDAwQXdvMFQzY25KSEtieThKblYwVHM1eiIsInNjb3BlIjoidmlldzpiaWtlcyB2aWV3OmJpa2VEZXRhaWxzIGFkZDpiaWtlIHJlYWQ6bWVzc2FnZXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6WyJ2aWV3OmJpa2VzIiwidmlldzpiaWtlRGV0YWlscyIsImFkZDpiaWtlIiwicmVhZDptZXNzYWdlcyJdfQ.Ar--NHlVTTfrZD_zbUM6O8epFhjHJRE2MXcXUZNbEaoa4PONNzZAjHkt_MJAUkzgrHVvkMdsJ4dcCMpZkyOIbnYC_iWagW2ZApS3oG4wz7416G6aDlm7Ou1FNJ5OdcPxprXsZ6PRgM0w7HEWFa8ITXVW9FqpOWQLtoMPAwI8jJfpgrfjsoPaK-qnyoeqGSFNuELYF6f313Tss_g9f61U_JBoHvYk1UtnBDWiYEFAn22F9HuUI4xzDeBjdmzXNT0-ul5MJffUBlGRDWwfP6AlPxXPlTb2rCgABepHWTHDLp5LFwCWTp-FSkh9kKJTUPybzWJYBZsWhjtxLfnwk3YQ1Q";
        const tokenReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }

}
