import * as yup from 'yup';
import { parse, isDate } from 'date-fns';

yup.setLocale({
  mixed: {
    required: '${path} é um campo obrigatório.',
    oneOf: '${path} inválido(a). Valores disponíveis: ${values}.',
    notType: function notType(_ref) {
      switch (_ref.type) {
        case 'array':
          return `${_ref.path} deve ser uma lista.`;
        case 'boolean':
          return `${_ref.path} deve ser um booleano.`;
        case 'date':
          return `${_ref.path} inválido(a).`;
        case 'number':
          return `${_ref.path} deve ser um número.`;
        case 'string':
          return `${_ref.path} deve ser uma string.`;
      }
    },
  },
  array: {
    min: '${path} deve ter no mínimo ${min} item(ns) na lista.',
  },
  date: {
    max: '${path} inválido(a). Deve ser menor que a data de hoje.',
    min: '${path} inválido(a). Deve ser maior que a data de hoje.',
  },
  number: {
    integer: '${path} deve ser um número inteiro.',
    max: '${path} inválido(a). Deve ser menor ou igual a ${max}.',
    min: '${path} inválido(a). Deve ser maior ou igual a ${min}.',
    positive: '${path} deve ser um número positivo.',
  },
  string: {
    email: 'E-mail inválido.',
    length: '${path} deve possuir exatamente ${length} caracteres.',
    matches: '${path} inválido(a).',
    max: '${path} deve possuir no máximo ${max} caracteres.',
    min: '${path} deve possuir no mínimo ${min} caracteres.',
    url: '${path} deve ser uma URL válida.',
  },
});

yup.addMethod<yup.DateSchema>(yup.date, 'formatDate', function() {
  return this.transform((value, originalValue) => {
    isDate(originalValue) ? originalValue : parse(originalValue, 'yyyy-MM-dd', new Date());
  });
});

yup.addMethod<yup.StringSchema>(yup.string, 'cpf', function() {
  return this.transform((value, originalValue) => {
    if (!originalValue) throw new yup.ValidationError('CPF inválido.', originalValue);
    if (!cpfIsValid(originalValue)) throw new yup.ValidationError('CPF inválido.', originalValue);
    else return originalValue.replace(/[\s.-]*/gim, '');
  });
});

yup.addMethod<yup.StringSchema>(yup.string, 'cnpj', function() {
  return this.transform((value, originalValue) => {
    if (!originalValue) throw new yup.ValidationError('CNPJ inválido.', originalValue);
    if (!cnpjIsValid(originalValue)) throw new yup.ValidationError('CNPJ inválido.', originalValue);
    else return originalValue.replace(/[^\d]+/g, '');
  });
});

// TODO: regex para transformar números com máscara (00) 00000-0000 em apenas números.
yup.addMethod<yup.StringSchema>(yup.string, 'phone', function() {
  return this.transform((value, originalValue) => {
    if (!originalValue) throw new yup.ValidationError('phone inválido.', originalValue);
    if (!phoneIsValid(originalValue)) throw new yup.ValidationError('phone inválido.', originalValue);
    else return originalValue.replace(/[\s()-]*/gim, '');
  });
});

// Functions.
function cpfIsValid(cpf: string) {
  cpf = cpf.replace(/[\s.-]*/gim, '');
  if (cpf.length !== 11) return false;

  for (let i = 0; i <= 9; i += 1) {
    const invalidCpf = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`;
    if (cpf === invalidCpf) return false;
  }

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i += 1) {
    sum += Number(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i += 1) {
    sum += Number(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(cpf.substring(10, 11))) return false;

  return true;
}

function cnpjIsValid(cnpj: string) {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj === '') return false;
  if (cnpj.length !== 14) return false;

  for (let i = 0; i <= 9; i += 1) {
    const invalidCnpj = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`;
    if (cnpj === invalidCnpj) return false;
  }

  const sequenceDigit1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sequenceDigit2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  let rest;

  for (let i = 0; i <= 11; i += 1) {
    sum += Number(cnpj[i]) * sequenceDigit1[i];
  }

  rest = sum % 11;
  rest = rest < 2 ? 0 : 11 - rest;
  if (rest !== Number(cnpj[12])) return false;

  sum = 0;
  rest = 0;
  for (let i = 0; i <= 12; i += 1) {
    sum += Number(cnpj[i]) * sequenceDigit2[i];
  }

  rest = sum % 11;
  rest = rest < 2 ? 0 : 11 - rest;
  if (rest !== Number(cnpj[13])) return false;

  return true;
}

function phoneIsValid(phone: string) {
  phone = phone.replace(/[^0-9]/, '');
  if (phone.length !== 11) return false;

  return true;
}

declare module 'yup' {
  interface DateSchema {
    formatDate(): DateSchema;
  }

  interface StringSchema {
    cpf(): StringSchema;
    cnpj(): StringSchema;
    phone(): StringSchema;
  }
}

export default yup;
