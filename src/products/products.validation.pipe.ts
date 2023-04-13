import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { z } from "zod";

@Injectable()
export class CreateProductPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const supplierSchema = z.object({
      name: z.string(),
      description: z.string(),
      ean13: z.string(),
      price: z.number()
    });

    const parsedValue = supplierSchema.safeParse(value);

    if (parsedValue.success) {
      return parsedValue.data;
    }

    // Error with vscode when trying to access parsedValue.error
    //@ts-ignore
    throw new BadRequestException(parsedValue.error.toString());
  }
}

@Injectable()
export class UpdateProductPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const supplierSchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      ean13: z.string().optional(),
      price: z.number().optional()
    });

    const parsedValue = supplierSchema.safeParse(value);

    if (parsedValue.success) {
      return parsedValue.data;
    }

    //@ts-ignore
    throw new BadRequestException(parsedValue.error.toString());
  }
}