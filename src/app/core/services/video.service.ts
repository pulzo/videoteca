import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { VozIA, MakeVideoRequest } from 'src/app/models/voz-ia';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private baseUrl = `${env.apiCerberoUrl}`;

  constructor(private http: HttpClient) { }

  listarVocesIA(): Observable<VozIA[]> {
    return this.http
      .get<{ code: string; data: VozIA[] }>(
        `${this.baseUrl}/request?event=voz-ia-listar-voces`
      )
      .pipe(
        map(response => response.data)
      );
  }

  makeVideo(payload: MakeVideoRequest){
    return this.http
      .post(
        //`${this.baseUrl}/request?event=video`,
        'http://localhost:8000/video',
        payload
      )
      .pipe(
        map(response => response)
      );
  }

  getStatus(postId: string|null): Observable<any> {
    //return this.http.get(`${this.baseUrl}/status/${postId}`);
    return this.http.get(`http://localhost:8000/status/${postId}`);
  }





  

}