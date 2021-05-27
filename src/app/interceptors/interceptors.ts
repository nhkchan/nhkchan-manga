import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpHeaderInterceptor } from './http-header-interceptor.service';

export const interceptorProviders = 
   [
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true }
];