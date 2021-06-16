import { Injectable } from '@angular/core';

@Injectable()
export class MessagesConstant {
        // TITULOS
    static WARNING_TITLE = 'Advertencia!!';
    static ERROR_TITLE = 'Error';
    static SUCCESS_TITLE = 'Èxito';
        // MENSAJES
    static GENERIC_ERROR = 'Ocurrio un Error. \n Intentelo más tarde!!';
    static NOT_FOUND = 'Dato no Encontrado';
    static BAD_REQUEST = "Ocurrio un Error al Registrar los Datos. \n Intentelo más tarde!!";
}