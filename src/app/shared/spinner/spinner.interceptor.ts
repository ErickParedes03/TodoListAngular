import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerService } from "./spinner.service";
import { Observable, finalize } from "rxjs";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor( private readonly spinnerSvc : SpinnerService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        this.spinnerSvc.show();
        return next.handle(request).pipe(
            finalize( () => this.spinnerSvc.hide())
        );
        
    }
}