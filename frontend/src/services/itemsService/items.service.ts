import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  ElasticsearchResponse,
  ElasticsearchQuery
} from 'src/app/filters/services/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly api_end_point: string = environment.endPoint;
  constructor(private http: HttpClient) {}

  getItems(query: ElasticsearchQuery): Observable<ElasticsearchResponse> {
    return this.http.post(this.api_end_point, query);
  }
}
