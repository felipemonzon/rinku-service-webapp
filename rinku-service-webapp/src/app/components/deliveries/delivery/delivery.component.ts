import { RolModel } from './../../../models/RolModel';
import { RoleService } from '../../../services/role.service';
import { DeliveryService } from './../../../services/delivery.service';
import { Delivery } from './../../../models/delivery';
import { EmployeeModel } from './../../../models/EmployeeModel';
import { EmployeeService } from './../../../services/employee-service';
import { GlobalFunction } from './../../../config/GlobalFunctions';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { MessagesConstant } from 'src/app/utilities/messages-constants';
import { MessagingNotification } from 'src/app/utilities/messaging-notification';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styles: [
  ]
})
export class DeliveryComponent implements OnInit {
  @ViewChild('employeeNumber', { static: true })
  public employeeNumber!: ElementRef;
  @ViewChild('surename', { static: true })
  public surename!: ElementRef;
  @ViewChild('deliveries', { static: true })
  public deliveries!: ElementRef;

  private delivery!: Delivery;
  roles: RolModel[] = [];
  frmDelivery!: FormGroup;


  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
    private deliveryService: DeliveryService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.frmDelivery = this.formBuilder.group({
      employeeNumber: ['', [
        Validators.required,
        GlobalFunction.lettersAndNumbersValidator
      ]],
      deliveries: ['', [
        Validators.required
      ]],
      assignedRol: ['0', [
        Validators.required
      ]]
    });

    this.roleService.getAllRoles().subscribe((response: RolModel[]) => {
      this.roles = response;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.employeeNumber.nativeElement.focus();
    }, 100);
  }

  saveDelivery() {
    this.delivery = this.frmDelivery.value;
    this.deliveryService.saveDelivery(this.delivery).subscribe((response: Delivery) => {
      MessagingNotification.reaload(MessagingNotification.SUCCESS_TYPE,
        MessagesConstant.SUCCESS_TITLE, "Entrega Registrada con Exito. \n Folio: " + response.invoiceBranch
      );
    });
  }

  searchEmployee(search: string) {
    search = search.trim();
    if (search.length > 3) {
      this.employeeService.getEmployeeBy('byEmployee', search).subscribe((data: EmployeeModel) => {
        this.surename.nativeElement.value = data.firstname + ' ' + data.lastanme;
        this.deliveries.nativeElement.focus();
      });
    }
  }
}
