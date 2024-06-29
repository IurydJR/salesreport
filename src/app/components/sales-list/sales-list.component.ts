import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  sales: Object[] = [];
  test: string = "teste";

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    console.log("teste");
    this.salesService.searchHeroes().subscribe((sales: any) => {
      this.sales = sales;
      console.log(sales);
    })
  }
}
