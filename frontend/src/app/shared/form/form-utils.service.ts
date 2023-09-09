import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  getErrorMessage( formGroup: UntypedFormGroup, fieldName: string )
  {
    const field = formGroup.get( fieldName ) as UntypedFormControl;
    return this.getErrorMessageFromField( field );
  }

  getErrorMessageFromField( field: UntypedFormControl )
  {
    if( field?.hasError( 'required' ) )
    {
      return 'Campo obrigatório';
    }
    if( field?.hasError( 'minlength' ) )
    {
      const requiredLength = field.errors ? field.errors[ 'minlength' ][ 'requiredLength' ] : 5;
      return `Tamanho mínimo precisa ser de ${ requiredLength } caracteres.`;
    }
    if( field?.hasError( 'maxlength' ) )
    {
      const requiredLength = field.errors ? field.errors[ 'maxlength' ][ 'requiredLength' ] : 200;
      return `Tamanho máximo de ${ requiredLength } caracteres excedido.`;
    }
    return 'Campo inválido';
  }

  getFormArrayFieldErrorMessage( formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number )
  {
    const formArray = formGroup.get( formArrayName ) as UntypedFormArray;
    const field = formArray.controls[ index ].get( fieldName ) as UntypedFormControl;
    return this.getErrorMessageFromField( field );
  }

  isFormArrayRequired( formGroup: UntypedFormGroup, formArrayName: string )
  {
    const formArray = formGroup.get( formArrayName ) as UntypedFormArray;
    return ! formArray.valid && formArray.hasError('required') && formArray.touched;
  }
}