//validation
export interface ValiateTable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  } 
  
  export function validate (validateTableInput : ValiateTable){
    let isValid = true;
    if (validateTableInput.required) {
      isValid = isValid && validateTableInput.value.toString().trim().length !== 0;
    }
    if (
      validateTableInput.minLength != null &&
      typeof validateTableInput.value === 'string'
    ) {
      isValid =
        isValid && validateTableInput.value.length >= validateTableInput.minLength;
    }
    if (
      validateTableInput.maxLength != null &&
      typeof validateTableInput.value === 'string'
    ) {
      isValid =
        isValid && validateTableInput.value.length <= validateTableInput.maxLength;
    }
    if (
      validateTableInput.min != null &&
      typeof validateTableInput.value === 'number'
    ) {
      isValid = isValid && validateTableInput.value >= validateTableInput.min;
    }
    if (
      validateTableInput.max != null &&
      typeof validateTableInput.value === 'number'
    ) {
      isValid = isValid && validateTableInput.value <= validateTableInput.max;
    }
    return isValid;
  }
