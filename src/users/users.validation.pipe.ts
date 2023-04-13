import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { z } from "zod";

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const supplierSchema = z.object({
      firstname: z.string(),
      lastname: z.string(),
      email: z.string().email(),
      password: z.string().min(7)
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
export class LoginUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const supplierSchema = z.object({
      email: z.string().email(),
      password: z.string().min(7)
    });

    const parsedValue = supplierSchema.safeParse(value);

    if (parsedValue.success) {
      return parsedValue.data;
    }

    //@ts-ignore
    throw new BadRequestException(parsedValue.error.toString());
  }
}

@Injectable()
export class UpdateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const supplierSchema = z.object({
      firstname: z.string().optional(),
      lastname: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string().min(7).optional(),
      role: z.string().optional()
    });

    const parsedValue = supplierSchema.safeParse(value);

    if (parsedValue.success) {
      return parsedValue.data;
    }

    //@ts-ignore
    throw new BadRequestException(parsedValue.error.toString());
  }
}