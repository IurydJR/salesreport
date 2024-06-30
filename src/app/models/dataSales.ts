export class DataSales {
  private _categories: any[] = [];
  private _products: any[] = [];
  private _brands: any[] = [];
  private _sales: any[] = [];

  constructor(sales: any[], categories: any[], products: any[], brands: any[]) {
    this._categories = categories;
    this._products = products;
    this._brands = brands;
    this._sales = sales;
  }

  // Getter for categories
  get categories(): any[] {
    return this._categories;
  }

  // Setter for categories
  set categories(value: any[]) {
    if (value && Array.isArray(value)) {
      this._categories = value;
    } else {
      throw new Error('Invalid categories');
    }
  }

  // Getter for products
  get products(): any[] {
    return this._products;
  }

  // Setter for products
  set products(value: any[]) {
    if (value && Array.isArray(value)) {
      this._products = value;
    } else {
      throw new Error('Invalid products');
    }
  }

  // Getter for brands
  get brands(): any[] {
    return this._brands;
  }

  // Setter for brands
  set brands(value: any[]) {
    if (value && Array.isArray(value)) {
      this._brands = value;
    } else {
      throw new Error('Invalid brands');
    }
  }

  // Getter for sales
  get sales(): any[] {
    return this._sales;
  }

  // Setter for sales
  set sales(value: any[]) {
    if (value && Array.isArray(value)) {
      this._sales = value;
    } else {
      throw new Error('Invalid sales');
    }
  }
}
