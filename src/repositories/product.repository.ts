import AppDataSource from "@/database/connection";
import { CreateProductDTO, UpdateProductDTO } from "@/dto/product.dto";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";

export class ProductRepository {

  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product)
  }
  async getAll(): Promise<Product[]> {
    return await this.repository.find()
  }

  async create(newProduct: CreateProductDTO): Promise<Product> {
    const product = new Product
    product.name = newProduct.name
    product.weight = newProduct.weight
    product.description = newProduct.description

    return await this.repository.create(product);
  }

  async findOneBy(id: string): Promise<Product | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByOrFail(id: string): Promise<Product> {
    return await this.repository.findOneByOrFail({ id })
  }

  async update(updateProduct: UpdateProductDTO): Promise<Product | null> {
    const product = await this.findOneByOrFail(updateProduct.id);
    if (!product) {
      return null
    }

    product.name = updateProduct.name;
    product.description = updateProduct.description;
    product.weight = updateProduct.weight;

    return await this.repository.save(product);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}
