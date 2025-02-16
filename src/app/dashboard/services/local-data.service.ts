import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  private baseUrl = enviroments.baseUrl;

  constructor() {}
}
