import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CpfUtils } from '../utils/CpfUtils';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;

  if (!valor) return null;

  const cpfValido = CpfUtils.validar(valor);

  return cpfValido ? null : { cpfInvalido: true };
}