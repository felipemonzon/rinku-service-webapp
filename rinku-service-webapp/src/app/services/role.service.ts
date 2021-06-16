import { RolModel } from './../models/RolModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/AppConfig';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  /**
  * Retrieve all roles.
  */
  public getAllRoles() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('uuid', uuidv4());

    return this.httpClient.get<RolModel[]>(`${AppConfig.rolResource}`, {
      headers,
    });
  }
}
