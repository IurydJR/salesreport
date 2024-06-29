import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule, NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'


@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
})
export class SalesListComponent implements OnInit {
  public sales: any[] = [];
  public categories: any[] = [];
  public products: any[] = [];
  public brands: any[] = [];
  public categoryId:number = 0; 
  public productId:number = 0; 
  public brandId:number = 0;
  
  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadCategories();
  }
  loadCategories(): void {
    this.salesService.getAll().subscribe(data => {
      this.categories = data;
      
      if (this.categories.length > 0) {
        this.loadProducts(this.categories[0].products);
      }
    });
  }

  loadProducts(products: any[]): void {
    this.products = products;

    if (this.products.length > 0) {
      this.loadBrands(this.products[0].brands);
    }
  }

  loadBrands(brands: any[]): void {
    this.brands = brands;
  }

  onCategoryChange(event: any): void {
    this.categoryId = Number(event.target.value);
    const selectedCategory = this.categories.find(cat => Number(cat.id) === this.categoryId);
    if (selectedCategory) {
      this.loadProducts(selectedCategory.products);
    }
  }

  onProductChange(event: any): void {
    this.productId = Number(event.target.value); 
    const selectedProduct = this.products.find(prod => Number(prod.id) === this.productId);
    if (selectedProduct) {
      this.loadBrands(selectedProduct.brands);
      this.sales = selectedProduct.brands[0].sales
    }
    let i = 0;
  }

  onBrandChange(event: any): void {
    this.brandId = Number(event.target.value); 
    const selectedBrand = this.brands.find(prod => Number(prod.id) === this.brandId);
    if (selectedBrand) {
      this.sales = selectedBrand.sales
    }
  }
}
