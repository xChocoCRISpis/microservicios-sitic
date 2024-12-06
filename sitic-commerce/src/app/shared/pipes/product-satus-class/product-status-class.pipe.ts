import { Pipe, PipeTransform } from '@angular/core';
import { eStockStatus } from '../../interfaces/stock_status/enums_stock_status.interface';

@Pipe({
  name: 'productStatusClass'
})
export class ProductStatusClassPipe implements PipeTransform {

  transform(currentStock:number, minStock:number, maxStock:number): 
  {bg:string;text:string;border:string;
    bg_text:string;bg_border:string;bg_text_border:string;
    text_border:string;} {
    enum eSections {
      background,
      text,
      border,
    }

    //low = amarillo
    //out = rojo
    //in = green

    const classes = new Map<eStockStatus,Map<eSections,string>>([
      [eStockStatus.inStock,new Map([
          [eSections.text,'bg-emerald-700'],
          [eSections.background,'text-green-100'],
          [eSections.border,'border-emerald-950 ring-2 ring-emerald-950 shadow-green-300']
        ])],
      [eStockStatus.lowStock,new Map([
        [eSections.text, 'text-yellow-600'],
        [eSections.background, 'bg-yellow-100'],
        [eSections.border, 'border-yellow-600 ring-2 ring-yellow-600 shadow-yellow-300']
      ])],
      [eStockStatus.outOfStock,new Map([
        [eSections.text, 'text-red-600'],
        [eSections.background, 'bg-red-100'],
        [eSections.border, 'border-red-600 ring-2 ring-rose-600 shadow-rose-300']
      ])],
      [eStockStatus.None, new Map([
        [eSections.text, 'text-grey-600'],
        [eSections.background, 'bg-grey-100'],
        [eSections.border, 'border-grey-600']
      ])]
    ]);

    let stockStatus: eStockStatus;

    switch(true){
      case(currentStock <= minStock): //out of stock
        stockStatus = eStockStatus.outOfStock;
        break;
      case((currentStock >= minStock) && (currentStock <= (maxStock*0.5))): //low stock
        stockStatus = eStockStatus.lowStock;
        break;
      case(currentStock >= (maxStock*0.5)): //in stock
        stockStatus = eStockStatus.inStock;
        break;
      default:
        stockStatus = eStockStatus.None;
        break;
    }


    const primaryParts = {
      bg: classes.get(stockStatus).get(eSections.background),
      text:classes.get(stockStatus).get(eSections.text),
      border:classes.get(stockStatus).get(eSections.border)
    };

    return {
      bg:primaryParts.bg,
      text:primaryParts.text,
      border:primaryParts.border,
      bg_border:`${primaryParts.bg} ${primaryParts.border}`,
      bg_text:`${primaryParts.bg} ${primaryParts.text}`,
      bg_text_border:`${primaryParts.bg} ${primaryParts.text} ${primaryParts.border}`,
      text_border:`${primaryParts.text} ${primaryParts.border}`
    }
  }
}
