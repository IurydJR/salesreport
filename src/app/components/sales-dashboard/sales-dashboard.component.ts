import { Component, ViewChild, OnInit  } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SalesService } from '../../services/sales.service';
import { NgFor } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [BaseChartDirective, NgFor, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
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

      // Gradient color for chart bar
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

  public category: any[] = [];
  public product: any[] = [];
  public brand: any[] = [];

  // Chart options configuration
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 10,
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

  // Events to chart
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  // Load data from Api to fill select input
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

  // Update the another select values and the chart data when a select value changes 
  onCategoryChange(event: any): void {
    this.categoryId = Number(event.target.value);
    const selectedCategory = this.categories.find(cat => Number(cat.id) === this.categoryId);
    if (selectedCategory) {
      this.loadProducts(selectedCategory.products);
      this.sales = selectedCategory.products[0].brands[0].sales;
      this.updateGraph()
    }
  }

  onProductChange(event: any): void {
    this.productId = Number(event.target.value); 
    const selectedProduct = this.products.find(prod => Number(prod.id) === this.productId);
    if (selectedProduct) {
      this.loadBrands(selectedProduct.brands);
      this.sales = selectedProduct.brands[0].sales;
      this.updateGraph()
    }
    let i = 0;
  }

  onBrandChange(event: any): void {
    this.brandId = Number(event.target.value); 
    const selectedBrand = this.brands.find(prod => Number(prod.id) === this.brandId);
    if (selectedBrand) {
      this.sales = selectedBrand.sales;
      this.updateGraph()
    }
  }
 
  // Update chart data with updating data sale
  updateGraph() {
    this.barChartData.datasets[0].data = [this.sales[0]?.quantity || 0]
    this.barChartData.datasets[1].data = [this.sales[1]?.quantity || 0]
    this.barChartData.datasets[2].data = [this.sales[2]?.quantity || 0]
    this.barChartData.datasets[3].data = [this.sales[3]?.quantity || 0]
    if (this.chart) {
      this.chart.update();
    }
  }



}

