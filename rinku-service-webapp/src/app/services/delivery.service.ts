import { DeliveryResponse } from './../models/DeliveryResponse';
import { Delivery } from './../models/delivery';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/AppConfig';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieve all deliveries.
   */
  public getAllDeliveries() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('uuid', uuidv4());

    return this.httpClient.get<Delivery[]>(`${AppConfig.deliveryRetrieve}`, {
      headers,
    });
  }

  /**
   * Consulta una pagina de entregas registradas.
   */
  public getDeliveries(page: number) {
    const params = new HttpParams({
      fromString: `page=${page}`
    });
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('uuid', uuidv4());
    return this.httpClient.get<DeliveryResponse>(`${AppConfig.deliveryResource}`, { headers, params });
  }

  /**
   * Consulta una entrega por una opcion.
   * @param option opcion a consultar
   * @param value valor a consultar
   * @returns entrega consultada
   */
  public getDeliveryBy(option: string, value: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('uuid', uuidv4());
    return this.httpClient.get<Delivery[]>(`${AppConfig.deliveryResource}/${option}/${value}`, { headers });
  }

  /**
   * Registra una entrega
   * @param deliveryRequest  entrega a registrar
   * @returns 
   */
  public saveDelivery(deliveryRequest: Delivery) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('uuid', uuidv4());
    return this.httpClient.post<Delivery>(`${AppConfig.deliverySave}`, deliveryRequest, { headers});
  }
}
