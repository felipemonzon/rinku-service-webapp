import { Delivery } from './delivery';

export interface DeliveryResponse {
    currentPage: number;
    totalPages: number;
    deliveries: Delivery[];
}
