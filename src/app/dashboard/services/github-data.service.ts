import { Injectable } from '@angular/core';
import { enviroments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private baseUrl = enviroments.baseUrl;

  constructor() {}
}
