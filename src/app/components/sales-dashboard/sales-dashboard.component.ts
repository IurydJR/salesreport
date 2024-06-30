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
import { DataSales } from '../../models/dataSales';

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

  public dataSales = new DataSales([], [], [], []);
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
      blueGradient.addColorStop(1, "#104db0"); 

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
    labels: [""],
    datasets: [
      { data: [], label: 'January', backgroundColor: 'blue' },
      { data: [], label: 'February', backgroundColor: 'green'},
      { data: [], label: 'March', backgroundColor: 'yellow'},
      { data: [], label: 'April', backgroundColor: 'orange'}
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
      concatMap(categories => this.dataSales.categories = categories),
      concatMap(() => this.dataSales.products = this.dataSales.categories[0].products),
      concatMap(() => this.dataSales.brands = this.dataSales.products[0].brands),
      concatMap(() => this.dataSales.sales = this.dataSales.brands[0].sales)
    ).subscribe(() => { this.updateGraph() });
  }

  onCategoryChange(event: any): void {
    this.categoryId = Number(event.target.value);
    const selectedCategory = this.dataSales.categories.find(cat => Number(cat.id) === this.categoryId);
    if (selectedCategory) {
      this.dataSales.products = selectedCategory.products.subscribe(() => {
        this.dataSales.brands = this.dataSales.products[0].brands.subscribe(() => {
          this.dataSales.sales = this.dataSales.brands[0].sales.subscribe(() => {
            this.updateGraph();
          });
        });
      });
    }
  }

  onProductChange(event: any): void {
    this.productId = Number(event.target.value); 
    const selectedProduct = this.dataSales.products.find(prod => Number(prod.id) === this.productId);
    if (selectedProduct) {
      this.dataSales.brands = selectedProduct.brands.subscribe(() => {
        this.dataSales.sales = this.dataSales.brands[0].sales.subscribe(() => {
          this.updateGraph();
        });
      });
    }
  }

  onBrandChange(event: any): void {
    this.brandId = Number(event.target.value); 
    const selectedBrand = this.dataSales.brands.find(brand => Number(brand.id) === this.brandId);
    if (selectedBrand) {
      this.dataSales.sales = selectedBrand.sales.subscribe(() => {
        this.updateGraph();
      });
    }
  }

  updateGraph(): void {
    this.barChartData.datasets[0].data = [this.dataSales.sales[0].quantity];
    this.barChartData.datasets[1].data = [this.dataSales.sales[1].quantity];
    this.barChartData.datasets[2].data = [this.dataSales.sales[2].quantity];
    this.barChartData.datasets[3].data = [this.dataSales.sales[3].quantity];
    if (this.chart) {
      this.chart.update();
    }
  }
}
