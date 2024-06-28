import { Brand } from "./Brand";

export interface Sale {
  date: Date;
  brand: Brand;
  quantity: Number;
  price: Number;
}