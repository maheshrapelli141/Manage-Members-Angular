import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
  	private http: HttpClient,
  ) { }

  saveMember(body): Observable<any> {
    return this.http.post(baseUrl + '/api/member/', body);
  }

  fetchMembers(): Observable<any> {
    return this.http.get(baseUrl + '/api/member/');
  }

  fetchMember(memberId): Observable<any> {
    return this.http.get(baseUrl + '/api/member/' + memberId);
  }

  deleteMember(memberId): Observable<any> {
    return this.http.delete(baseUrl + '/api/member/' + memberId);
  }
}
