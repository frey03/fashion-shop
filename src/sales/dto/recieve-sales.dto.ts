import { IsNotEmpty } from 'class-validator';

export class RecieveSalesDto {
  @IsNotEmpty()
  userName: string;
  age: number;
  height: string;
  gender: string;
  sales: number;
  lastPurchaseDate: Date;
}
