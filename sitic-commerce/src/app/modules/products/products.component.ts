import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { MatTableDataSource } from "@angular/material/table";

// Componentes
import { ProductDialogComponent } from "./components/product-dialog/product-dialog.component";

// Servicios
import { ProductsService } from "src/app/shared/services/products.service";

// Interfaces
import { eChoiceType, eErrorType, eScreenStatus } from "src/app/shared/interfaces/comun/enums.interface";
import { ProductsResponse } from "src/app/shared/interfaces/products/products-response.interface";
import { Product } from "src/app/shared/interfaces/products/product.interface";
import { ChoiceDialogComponent } from "./components/choice-dialog/choice-dialog.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    "actions",
    "imgPath",
    "name",
    "description",
    "price",
    "currentStock",
    "updatedAt",
    "tags",
  ];
  productList: Product[] = [];
  dataSource = new MatTableDataSource<Product>(this.productList);
  loading: boolean = false;
  notFindProduct : boolean = false;
  lastFailedTerm :string="";
  errorImageLoad:boolean = false;

  searchElement:HTMLInputElement;

  constructor(private dialog: MatDialog, private productsService: ProductsService) {}

  async ngOnInit(): Promise<void> {
    this.dataSource = new MatTableDataSource();
    await this.getAllProducts();
  }


  async search(input: HTMLInputElement, reqMoreItem: boolean = true): Promise<void> {
    this.loading = true;
  
    const searchTerm = input.value.trim().toLowerCase();
    
    //Valida si hay una entrada de datos a la funcion
    if (!searchTerm) {
      this.dataSource.data = this.productList;
      this.notFindProduct = false;
      this.loading = false;
      this.lastFailedTerm = "";
      return;
    }
  
    //Si hay un termino fallido y este es igual a como empieza el termino de entrada
    //se hace un return para no realizar procesamiento ni peticiones
    if (this.lastFailedTerm && searchTerm.startsWith(this.lastFailedTerm)) {
      this.dataSource.data = [];
      this.notFindProduct = true;
      this.loading = false;
      return;
    }

  
    const filteredProducts = this.productList.filter((product) =>
      product.name.toLowerCase().startsWith(searchTerm)
    );
    
    //Realizar una segunda peticion a todos los productos, solo por si acaso (no sé si vaya a afectar en la peticiones)
    if (filteredProducts.length === 0 && reqMoreItem) {
      await this.getAllProducts();
      await this.search(input, false);
      return;
    }

    //Se encuentra o no se encuentr un producto en el objeto
    if (filteredProducts.length === 0) {
      this.lastFailedTerm = searchTerm; 
      this.notFindProduct = true;
      this.dataSource.data = [];
    } else {
      this.lastFailedTerm = "";
      this.notFindProduct = false;
      this.dataSource.data = filteredProducts;
    }
  
    this.loading = false;
  }
  

  async getAllProducts() {
    this.loading = true;
    await this.productsService
      .getAllProducts()
      .then((resp: ProductsResponse) => {
        this.loading = false;
        if (resp.error && resp.error.errorType !== eErrorType.None) {
          console.error(resp.error);
          return;
        }
        this.productList = resp.products;
        this.dataSource.data = resp.products;
      })
      .catch(err => {
        this.loading = false;
        console.error(err);
      });
  }

  async onClickDelete(item: Product) {
    const result = await this.showDialogChoice(eChoiceType.Caution, eScreenStatus.Delete, item.id);

    if (result.refreshProducts) await this.getAllProducts();
  }

  onClickReadMore(item: Product) {
    this.showDialogProduct(eScreenStatus.ViewDetail, item.id);
  }

  async onClickModify(item: Product) {
    let result = await this.showDialogProduct(eScreenStatus.Updating, item.id);

    if (result.refreshProducts) this.getAllProducts();
  }

  async onClickAdd() {
    let result = await this.showDialogProduct(eScreenStatus.Adding);

    if (result.refreshProducts) this.getAllProducts();
  }

  async showDialogProduct(eScreenStatus: eScreenStatus, id?: number): Promise<any> {
    const dialogProduct = this.dialog.open(ProductDialogComponent, {
      data: {
        eScreenStatus,
        id,
      },
      disableClose: true,
    });

    return await lastValueFrom(dialogProduct.afterClosed()).then(result => {
      return Promise.resolve(result);
    });
  }

  async showDialogChoice(choiceType: eChoiceType, screenStatus: eScreenStatus, id?: number): Promise<any> {
    const dialogChoice = this.dialog.open(ChoiceDialogComponent, {
      data: {
        screenStatus,
        choiceType,
        id,
      },
      disableClose: true,
    });

    return await lastValueFrom(dialogChoice.afterClosed()).then(result => {
      return Promise.resolve(result);
    });
  }

  errorImageHandler(){
    this.errorImageLoad = true;
  }
}
