import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms'

@Injectable()
export class GlobalFunction {
    static ONLY_LETTERS_NUMBERS = /^[a-zA-Z0-9\-\_\.\t\b\s]*$/;
    static ONLY_NUMBERS = /^[0-9\.]*$/;
    static ONLY_LETTERS = /^[a-zA-Z\.\t\b\s]*$/;
    static RE_LOGIN = /^[a-zA-Z0-9\-\_\.\t\b]*$/;
    static SPECIAL_KEYS = ['Backspace', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    public static lettersAndNumbersValidator(control: AbstractControl): {
        [key: string]: any
    } | null {
        const valid = GlobalFunction.ONLY_LETTERS_NUMBERS.test(control.value);
        return valid ? null : {
            invalidNumber: {
                valid: false,
                value: control.value
            }
        };
    }

    public static numberValidator(control: AbstractControl): {
        [key: string]: any
    } | null {
        const valid = GlobalFunction.ONLY_NUMBERS.test(control.value);
        return valid ? null : {
            invalidNumber: {
                valid: false,
                value: control.value
            }
        };
    }

    public static loginValidator(control: AbstractControl): {
        [key: string]: any
    } | null {
        const valid = GlobalFunction.RE_LOGIN.test(control.value);
        return valid ? null : {
            invalidNumber: {
                valid: false,
                value: control.value
            }
        };
    }

    public static onlyLettersNumbers(e: string) {
        return GlobalFunction.ONLY_LETTERS_NUMBERS.test(e);
    }

    public static onlyNumber(e: string) {
        if (GlobalFunction.SPECIAL_KEYS.indexOf(e) !== -1) {
            return;
        }
        return GlobalFunction.ONLY_NUMBERS.test(e);
    }

    public static onlyLetters(e: string) {
        return GlobalFunction.ONLY_LETTERS.test(e);
    }

    public static login(e: string) {
        return GlobalFunction.RE_LOGIN.test(e);
    }
}
