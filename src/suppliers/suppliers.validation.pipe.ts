import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { z } from "zod";

@Injectable()
export class CreateSupplierPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const supplierSchema = z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
      email: z.string().email({ message: "Invalid email address" }),
      userId: z.number().optional()
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
export class UpdateSupplierPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const supplierSchema = z.object({
      name: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email({ message: "Invalid email address" }).optional(),
      userId: z.number().optional()
    });

    const parsedValue = supplierSchema.safeParse(value);

    if (parsedValue.success) {
      return parsedValue.data;
    }

    //@ts-ignore
    throw new BadRequestException(parsedValue.error.toString());
  }
}