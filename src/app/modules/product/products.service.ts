import { Injectable, NotFoundException } from '@nestjs/common';
 
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: dto });
  }

  async findAll(query: any) {
    const { categoryId, minPrice, maxPrice, page = 1, limit = 10 } = query;
    return this.prisma.product.findMany({
      where: {
        categoryId: categoryId ? Number(categoryId) : undefined,
        price: {
          gte: minPrice ? Number(minPrice) : undefined,
          lte: maxPrice ? Number(maxPrice) : undefined,
        },
      },
      skip: (page - 1) * limit,
      take: Number(limit),
      include: { category: true },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, dto: Partial<CreateProductDto>) {
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
