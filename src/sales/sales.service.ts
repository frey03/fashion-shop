import { Injectable } from '@nestjs/common';
import { RecieveSalesDto } from './dto/recieve-sales.dto';
import { Sales } from './sales.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SalesService {
  private sales: Sales[] = [];

  get_all_sales(): Sales[] {
    try {
      return this.sales;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  recieve_sales_record(recieve_sales_dto: RecieveSalesDto): Sales {
    try {
      const { userName, age, height, gender, sales, lastPurchaseDate } =
        recieve_sales_dto;
      const sale: Sales = {
        id: uuid(),
        userName,
        age,
        height,
        gender,
        sales,
        lastPurchaseDate,
      };
      this.sales.push(sale);
      return sale;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
