import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecieveSalesDto } from './dto/recieve-sales.dto';
import { Sales } from './sales.model';
import { SalesService } from './sales.service';
import csv from 'csvtojson';
import _ from 'lodash';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get('/report')
  get_sales_report() {
    try {
      const reportData = this.salesService.get_all_sales();
      let timer = false;
      setTimeout(function () {
        timer = true;
      }, 15000);
      return !reportData.length
        ? 'no records found'
        : timer
        ? 'process timeout cant get data please try again'
        : reportData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  // process uploaded file
  @Post('record')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
    }),
  )
  async uploadSingle(@UploadedFile() file) {
    try {
      const jsonArray = await csv().fromFile(`./uploads/${file.filename}`);
      const salesData = [];
      // creating data process
      jsonArray.forEach(async (sales) => {
        const newObj = _.mapKeys(sales, (value, key) => _.camelCase(key));
        const returnDate = await this.salesService.recieve_sales_record(newObj);
        salesData.push(returnDate);
      });
      return salesData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
