import { Request, Response } from 'express'
import { Product } from '../entities/product.entity'
import { validate } from 'class-validator';
import { ProductRepository } from '@/repositories/product.repository';
import CreateProductDTO, { UpdateProductDTO } from '@/dto/product.dto';

class ProductController {
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository
  }

  findAll = async (request: Request, response: Response): Promise<Response> => {

    const products = await this.productRepository.getAll()

    return response.status(200).send({
      data: products
    })
  }

  create = async (request: Request, response: Response): Promise<Response> => {
    const { name, description, weight } = request.body;

    const dto = new CreateProductDTO
    dto.name = name
    dto.description = description
    dto.weight = weight

    const erros = await validate(dto)
    if (erros.length > 0) {
      return response.json(422).send({
        error: erros
      })
    }

    const newProduct = await this.productRepository.create(dto);

    return response.status(201).send({
      data: newProduct
    })
  }

  findOne = async (request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id

    const product = await this.productRepository.findOneBy(id);

    if (!product) {
      return response.status(404).send({
        error: "Product not found"
      })
    }

    return response.status(200).send({
      data: product
    });
  }

  update = async (request: Request, response: Response): Promise<Response> => {
    const { id, name, description, weight } = request.body;
    const updateDTO = new UpdateProductDTO

    updateDTO.id = id
    updateDTO.name = name;
    updateDTO.description = description;
    updateDTO.weight = weight;

    const errors = validate(updateDTO);
    if ((await errors).length > 0) {
      return response.status(422).send({
        error: errors
      })
    }

    try {
      const updatedProduct = await this.productRepository.update(updateDTO);
      if (!updateDTO) {
        if (!updatedProduct) {
          return response.status(404).send({
            error: 'Product Not Found'
          })
        }
      }
      return response.status(200).send({
        data: updatedProduct
      })
    } catch (error) {
      return response.status(500).send({
        error: "Internal error"
      })
    }
  }

  delete = async (request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id;
    try {
      await this.productRepository.delete(id);
      return response.status(204).send({})
    } catch (error) {
      return response.status(400).send({
        error: 'Error deleting'
      })
    }
  }
}

export default new ProductController();
