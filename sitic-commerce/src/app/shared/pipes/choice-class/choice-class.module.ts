import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceClassPipe } from './choice-class.pipe';
import { eChoiceType } from '../../interfaces/comun/enums.interface';



@NgModule({
  declarations: [ChoiceClassPipe],
  imports: [
    CommonModule,
  ],
  exports:[ChoiceClassPipe]
})
export class ChoiceClassModule { }
