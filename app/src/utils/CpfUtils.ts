export class CpfUtils {
  static formatar(valor: string, mascarado: boolean): string {
    const numeros = valor.replace(/\D/g, '');

    if (!this.validar(numeros)) return 'error';

    if (mascarado) {
      return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (_, a, b, c, d) => {
        return `***.${b}.${c}-${d}`;
      });
    }

    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  static validar(valor: string): boolean {
    valor = valor.replace(/\D/g, '');

    if (valor.length !== 11 || /(\d)\1{10}/.test(valor)) return false;

    const nums = valor.split('').map(Number);

    const calc = (base: number) => {
      let soma = 0;
      for (let i = 0; i < base - 1; i++) {
        soma += nums[i] * (base - i);
      }
      return (soma * 10) % 11 % 10;
    };

    return calc(10) === nums[9] && calc(11) === nums[10];
  }
}