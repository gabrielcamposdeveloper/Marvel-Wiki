// marvel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private baseUrl = 'https://gateway.marvel.com/v1/public';
  private publicKey = 'SUA_PUBLIC_KEY';
  private privateKey = 'SUA_PRIVATE_KEY';

  constructor(private http: HttpClient) {}

  private getAuthParams(): HttpParams {
    const ts = new Date().getTime().toString();
    const hash = md5(ts + this.privateKey + this.publicKey);
    return new HttpParams()
      .set('ts', ts)
      .set('apikey', this.publicKey)
      .set('hash', hash as unknown as string);
  }

  getCharacters(nameStartsWith?: string): Observable<any> {
    let params = this.getAuthParams().set('limit', '20');
    if (nameStartsWith) {
      params = params.set('nameStartsWith', nameStartsWith);
    }
    return this.http.get(`${this.baseUrl}/characters`, { params });
  }

  getCharacterById(id: number): Observable<any> {
    const params = this.getAuthParams();
    return this.http.get(`${this.baseUrl}/characters/${id}`, { params });
  }

  getComicsByCharacter(id: number): Observable<any> {
    const params = this.getAuthParams().set('limit', '10');
    return this.http.get(`${this.baseUrl}/characters/${id}/comics`, { params });
  }

  getSeriesByCharacter(id: number): Observable<any> {
    const params = this.getAuthParams().set('limit', '10');
    return this.http.get(`${this.baseUrl}/characters/${id}/series`, { params });
  }
}
function md5(arg0: string) {
  throw new Error('Function not implemented.');
}

