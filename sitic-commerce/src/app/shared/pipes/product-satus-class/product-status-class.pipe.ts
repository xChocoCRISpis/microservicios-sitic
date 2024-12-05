import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productStatusClass'
})
export class ProductStatusClassPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
