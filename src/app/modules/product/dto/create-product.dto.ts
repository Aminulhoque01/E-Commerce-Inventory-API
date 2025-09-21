import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty() name!: string;
  @ApiProperty() description: string = '';
  @ApiProperty() price: number = 0;
  @ApiProperty() stock!: number;
  @ApiProperty() categoryId: number = 0;
  @ApiProperty({ required: false, default: '' }) imageUrl?: string;
}
