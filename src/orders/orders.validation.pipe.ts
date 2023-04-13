import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { ZodNumber, z } from "zod";

@Injectable()
export class CreateOrderPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const supplierSchema = z.object({
      note: z.string(),
      orderedBy: z.number(),
      products: z.array(z.number())
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
export class UpdateOrderPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const supplierSchema = z.object({
      note: z.string().optional(),
      orderedBy: z.number().optional(),
      products: z.array(z.number()).optional()
    });

    const parsedValue = supplierSchema.safeParse(value);

    if (parsedValue.success) {
      return parsedValue.data;
    }

    //@ts-ignore
    throw new BadRequestException(parsedValue.error.toString());
  }
}