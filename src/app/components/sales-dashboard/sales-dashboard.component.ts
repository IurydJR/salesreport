import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SalesService } from '../../services/sales.service';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { concatMap, of } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [
    BaseChartDirective, 
    NgFor, 
    FormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
  ],
  templateUrl: './sales-dashboard.component.html',
  styleUrl: './sales-dashboard.component.scss'
})
export class SalesDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

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

  ngAfterViewInit(): void {
    this.applyGradients();
  }

  applyGradients(): void {
    if (this.chart && this.chart.chart) {
      const ctx = this.chart.chart.ctx;
      const height = this.chart.chart.height;

      const blueGradient = ctx.createLinearGradient(0, 0, 0, height);
      blueGradient.addColorStop(0, "#38caff"); 
      blueGradient.addColorStop(1, "##104db0"); 

      const greenGradient = ctx.createLinearGradient(0, 0, 0, height);
      greenGradient.addColorStop(0, "#63f549");       
      greenGradient.addColorStop(1, "#0b701f"); 

      const yellowGradient = ctx.createLinearGradient(0, 0, 0, height);
      yellowGradient.addColorStop(0, "#f7ec0c"); 
      yellowGradient.addColorStop(1, "#b5b50b"); 

      const orangeGradient = ctx.createLinearGradient(0, 0, 0, height);
      orangeGradient.addColorStop(0, "#fcd5a2"); 
      orangeGradient.addColorStop(1, "#c96d04"); 

      this.barChartData.datasets[0].backgroundColor = blueGradient;
      this.barChartData.datasets[1].backgroundColor = greenGradient;
      this.barChartData.datasets[2].backgroundColor = yellowGradient;
      this.barChartData.datasets[3].backgroundColor = orangeGradient;

      this.chart.update();
    }
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [22], label: 'January', backgroundColor: 'blue' },
      { data: [2], label: 'February', backgroundColor: 'green'},
      { data: [9], label: 'March', backgroundColor: 'yellow'},
      { data: [1], label: 'April', backgroundColor: 'orange'}
    ],
  };

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  loadData(): void {
    this.salesService.getAll().pipe(
      concatMap(categories => this.setCategories(categories)),
      concatMap(() => this.setProducts(this.categories[0].products)),
      concatMap(() => this.setBrands(this.products[0].brands)),
      concatMap(() => this.setSales(this.brands[0].sales))
    ).subscribe(() => { this.updateGraph() });
  }

  setCategories(categories: any[]): Observable<any> {
    this.categories = categories;
    return of(categories);
  }

  setProducts(products: any[]): Observable<any> {
    this.products = products;
    return of(products);
  }

  setBrands(brands: any[]): Observable<any> {
    this.brands = brands;
    return of(brands);
  }

  setSales(sales: any[]): Observable<any> {
    this.sales = sales;
    return of(sales);
  }

  onCategoryChange(event: any): void {
    this.categoryId = Number(event.target.value);
    const selectedCategory = this.categories.find(cat => Number(cat.id) === this.categoryId);
    if (selectedCategory) {
      this.setProducts(selectedCategory.products).subscribe(() => {
        this.setBrands(this.products[0].brands).subscribe(() => {
          this.setSales(this.brands[0].sales).subscribe(() => {
            this.updateGraph();
          });
        });
      });
    }
  }

  onProductChange(event: any): void {
    this.productId = Number(event.target.value); 
    const selectedProduct = this.products.find(prod => Number(prod.id) === this.productId);
    if (selectedProduct) {
      this.setBrands(selectedProduct.brands).subscribe(() => {
        this.setSales(this.brands[0].sales).subscribe(() => {
          this.updateGraph();
        });
      });
    }
  }

  onBrandChange(event: any): void {
    this.brandId = Number(event.target.value); 
    const selectedBrand = this.brands.find(brand => Number(brand.id) === this.brandId);
    if (selectedBrand) {
      this.setSales(selectedBrand.sales).subscribe(() => {
        this.updateGraph();
      });
    }
  }

  updateGraph(): void {
    this.barChartData.datasets[0].data = [this.sales[0].quantity];
    this.barChartData.datasets[1].data = [this.sales[1].quantity];
    this.barChartData.datasets[2].data = [this.sales[2].quantity];
    this.barChartData.datasets[3].data = [this.sales[3].quantity];
    if (this.chart) {
      this.chart.update();
    }
  }
}
