import { EmployeeService } from './../../../services/employee-service';
import { EmployeeModel } from './../../../models/EmployeeModel';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { DeliveryComponent } from '../../deliveries/delivery/delivery.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-retrieve',
  templateUrl: './employee-retrieve.component.html',
  styles: [
  ]
})
export class EmployeeRetrieveComponent implements OnInit {
  @ViewChild('btnSearch', { static: true })
  public btnSearch!: ElementRef;
  @ViewChild('search', { static: true })
  public search!: ElementRef;
  pageSize = 10;
  page: number = 1;
  private opc: string = '';
  employees: EmployeeModel[] = [];
  frmSearch: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private service: EmployeeService,
    private modalService: NgbModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.opc = '';
    this.frmSearch = this.formBuilder.group({
      search: ['']
    });

    this.service.getAllEmployees().subscribe((response) => {
      this.employees = response;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 100);
  }

  ngOnDestroy(): void {
    this.employees.length = 0;
  }

  radioChangeHandler(value: any) {
    if (value.target.value !== 'findAll') {
      this.btnSearch.nativeElement.disabled = false;
      this.search.nativeElement.disabled = false;
      this.search.nativeElement.value = '';
      this.search.nativeElement.focus();
      this.opc = value.target.value;
    } else {
      this.opc = '';
      this.search.nativeElement.value = '';
      this.search.nativeElement.disabled = true;
      this.btnSearch.nativeElement.disabled = true;

      this.service.getAllEmployees().subscribe((response) => {
        this.employees = response;
      });
    }
  }

  searchBy(): any {
    let search = this.search.nativeElement.value;
    if (search !== '') {
      this.service.getEmployeeBy(this.opc, search).subscribe((response: EmployeeModel[]) => {
        this.employees = response;
      });
    }
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.title = "Registrar Empleados";
    modalRef.componentInstance.page = DeliveryComponent;
  }

  updateEmployee(employeeNumber: string) {
    console.log("update " + employeeNumber);
    Swal.fire({
      title: 'Do you want to save the changes?',
      type: 'warning',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.value) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.dismiss) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  deleteEmployee(employeeNumber: string) {
    console.log("delet " + employeeNumber);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonText: `Save`,
      cancelButtonText: `Don't save`,
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
