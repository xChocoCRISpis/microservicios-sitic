import { Pipe, PipeTransform } from '@angular/core';
import { eChoiceType} from '../../interfaces/comun/enums.interface';

@Pipe({
  name: 'choiceClass'
})
export class ChoiceClassPipe implements PipeTransform {

  transform(type:eChoiceType):string  {
    const typesScreen = new Map<eChoiceType, string> ([
      [eChoiceType.None, 'border-gray-300 text-gray-700'],
      [eChoiceType.Accept, 'border-blue-500 text-blue-700'],
      [eChoiceType.Caution, 'border-red-500 text-red-700']
    ]);

    return typesScreen.has(type) ? typesScreen.get(type) : typesScreen.get(eChoiceType.None);
  }

}
