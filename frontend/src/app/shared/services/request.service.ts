import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewRequestUserType} from "../../../types/new-request-user.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  getNewRequestPhone(name: string, phone: string, service: string, type: string): Observable< NewRequestUserType | DefaultResponseType> {
    return this.http.post<NewRequestUserType | DefaultResponseType>(environment.api + 'requests', {name, phone, service, type})
  }
}
