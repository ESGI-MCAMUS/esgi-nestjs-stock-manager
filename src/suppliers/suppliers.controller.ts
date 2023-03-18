import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {}
