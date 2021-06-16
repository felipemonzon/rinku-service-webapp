import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class MessagingNotification {
    static ERROR_TYPE = 'error';
    static SUCCESS_TYPE = 'success';
    static WARNING_TYPE = 'warning';
    static QUESTION_TYPE = 'question';

    static create(type: any, title: string, text: string) {
      Swal.fire({
        type,
        title,
        text,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
  }

  static reaload(type: any, title: string, text: string) {
    Swal.fire({
      type,
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then( () => {
      location.reload();
    });
  }
}