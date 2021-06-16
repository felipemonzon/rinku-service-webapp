import { EmployeeModel } from './../models/EmployeeModel';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/AppConfig';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }

    /**
     * Retrieve all employees.
     */
    public getAllEmployees() {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('uuid', uuidv4());

        return this.httpClient.get<EmployeeModel[]>(`${AppConfig.employeeResource}`, {
            headers,
        });
    }

    /**
     * Consulta un empleado por una opcion.
     * @param option opcion a buscar
     * @param value valor a consultar
     * @returns el empleado encontrado
     */
    public getEmployeeBy(option: string, value: string) {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('uuid', uuidv4());
        return this.httpClient.get<EmployeeModel>(`${AppConfig.employeeResource}/${option}/${value}`, { headers });
    }
}
