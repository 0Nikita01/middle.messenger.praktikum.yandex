interface FormData {
  [name: string]: string,
}

const RegExps: Record<string, RegExp> = {
  login: /^[a-zA-Z][a-zA-Z0-9-_]{3,20}$/,
  password: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  oldPassword: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  newPassword: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  first_name: /^[A-ZА-Я][a-zа-я]+(-?)([A-ZА-Я]?)([a-zа-я]+)$/,
  second_name: /^[A-ZА-Я][a-zа-я]+(-?)([A-ZА-Я]?)([a-zа-я]+)$/,
  phone: /^(\+)?[0-9]{10,15}$/,
  message: /\S/,
};

function toggleInputError(input: HTMLInputElement, isFieldValid: boolean) {
  if (isFieldValid) {
    input.parentNode?.children[1].classList.add('error_show');
  } else {
    input.parentNode?.children[1].classList.remove('error_show');
  }
}

export function InputsValidate(value: string, type: string): boolean {
  if (type in RegExps) {
    return RegExps[type].test(value);
  }

  return false;
}

export function checkingFieldValidation(input: HTMLInputElement, inputType: string): void {
  if (input && input.name === inputType) {
    const isFieldValid: boolean = !InputsValidate(input.value, inputType);

    toggleInputError(input, isFieldValid);
  }
}

export function getValidFormData(event: any, ...names: string[]): FormData | null {
  const data : FormData = {};
  const form = event.target;

  names.forEach((name: string) => {
    data[name] = form.querySelector(`[name=${name}]`).value;
  });

  const isValidData: boolean = Object.entries(data)
    .reduce((acc, [name, value]) => (acc && InputsValidate(value, name)), true);

  return isValidData ? data : null;
}
