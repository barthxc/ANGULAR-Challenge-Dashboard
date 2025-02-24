import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private activeRequests = 0;
  private isLoading = signal<boolean>(false);

  isLoadingSignal = () => this.isLoading;

  setLoadingState(isLoading: boolean) {
    if (isLoading) {
      this.activeRequests++;
    } else {
      this.activeRequests = Math.max(0, this.activeRequests - 1);
    }
    this.isLoading.set(this.activeRequests > 0);
  }
}
