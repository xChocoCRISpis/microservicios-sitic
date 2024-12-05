import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { eChoiceType, eErrorType, eScreenStatus } from 'src/app/shared/interfaces/comun/enums.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'choice-dialog',
  templateUrl: './choice-dialog.component.html',
  styleUrls: ['./choice-dialog.component.scss']
})
export class ChoiceDialogComponent implements OnInit {
  id:number;
  loading:boolean;
  choiceType:eChoiceType;
  screenStatus:eScreenStatus;

  product:Product;

  title:string;
  icon:string;

  //mat:warning mat:help

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sharedService: SharedService,
    private productsService: ProductsService,
    private snackbar: MatSnackBar,
  ) { 
    this.id = this.data.id;
    this.choiceType = this.data.choiceType;
    this.screenStatus = this.data.screenStatus;
  }




  async ngOnInit(): Promise<void> {

    switch(this.choiceType){
      case eChoiceType.None:
        this.title = this.data.title ? this.data.title : "Título genérico";
        this.icon = 'mat:notification_important';
      break;
      case eChoiceType.Accept:
        this.title = 'Aviso';
        this.icon = 'mat:report'
        break;
      case eChoiceType.Caution:
        this.title = "¡AVISO!";
        this.icon = "mat:warning";
        break;
      default:
        this.title = this.data.title ? this.data.title : "Título genérico";
        this.icon = 'mat:notification_important';
        break;
    }

    await this.getById(this.id);
  }

  onClose(){
    this.dialogRef.close();
  }

  onAccept(){
    switch(this.screenStatus){
      case eScreenStatus.Delete:
        this.onDelete();
        break;
      default:
        this.onClose();
        break;
    }
  }

  async onDelete(){
    this.loading = true;

    await this.productsService.deleteProduct(this.id)
    .then((response : ProductsResponse)=> {
      if (response.error && response.error.errorType !== eErrorType.None) {
        console.error(response.error);
        return;
      }
      
      if(response.isSuccess && response.isSuccess===true)
        this.sharedService.showSnackBar(this.snackbar, "Producto eliminado");

      this.dialogRef.close({refreshProducts:true,product:this.product});
    })
    .catch(err => {
      this.loading = false;
      console.error(err);
    })
    .finally(()=> this.loading = false)
  }


  async getById(id: number) {
    this.loading = true;
    await this.productsService
      .getById(id)
      .then((resp: ProductsResponse) => {
        this.loading = false;
        if (resp.error && resp.error.errorType !== eErrorType.None) {
          console.error(resp.error);
          return;
        }

        this.product = resp.product;

      })
      .catch(err => {
        this.loading = false;
        console.error(err);
      });
  }
}
