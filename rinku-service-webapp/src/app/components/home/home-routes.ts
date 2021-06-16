import { DeliveryRetrieveComponent } from './../deliveries/delivery-retrieve/delivery-retrieve.component';
import { EmployeeRetrieveComponent } from './../employees/employee-retrieve/employee-retrieve.component';
import { Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';


export const HomeRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'menu'},
    { path: 'menu', component: MenuComponent },
    { path: 'employees', component: EmployeeRetrieveComponent},
    { path: 'deliveries', component: DeliveryRetrieveComponent},
];
