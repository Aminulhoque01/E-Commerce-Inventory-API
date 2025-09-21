import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: { products: true },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, dto: Partial<CreateCategoryDto>) {
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const products = await this.prisma.product.findMany({ where: { categoryId: id } });
    if (products.length > 0) {
      throw new BadRequestException('Cannot delete category with linked products');
    }
    return this.prisma.category.delete({ where: { id } });
  }
}
