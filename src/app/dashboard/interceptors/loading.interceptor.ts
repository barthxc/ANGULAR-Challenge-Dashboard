import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Activar isLoading antes de hacer la solicitud
    this.loadingService.setLoadingState(true);

    // Manejar la solicitud y la respuesta
    return next.handle(req).pipe(
      finalize(() => {
        // Desactivar isLoading una vez que la respuesta haya sido recibida
        this.loadingService.setLoadingState(false);
      })
    );
  }
}
