import { FastifyReply, FastifyRequest } from 'fastify'

import { CustomerRepository } from '@/adapter/driven/database/implementations/prisma'
import { ComboRepository } from '@/adapter/driven/database/implementations/prisma/ComboRepository'
import { OrderRepository } from '@/adapter/driven/database/implementations/prisma/OrderRepository'
import { ProductRepository } from '@/adapter/driven/database/implementations/prisma/ProductRepository'
import { ComboUseCase } from '@/core/domain/use-cases/ComboUseCase'
import { CustomerUseCase } from '@/core/domain/use-cases/CustomerUseCase'
import { OrderUseCase } from '@/core/domain/use-cases/OrderUseCase'
import { ProductUseCase } from '@/core/domain/use-cases/ProductUseCase'
import { CPF } from '@/core/domain/value-objects/CPF'
import { OrderCreateDto } from '../dtos/OrderDto'

const comboRepository = new ComboRepository()
const comboUseCase = new ComboUseCase(comboRepository)

const productRepository = new ProductRepository()
const productUseCase = new ProductUseCase(productRepository)

const customerRepository = new CustomerRepository()
const customerUseCase = new CustomerUseCase(customerRepository)

const orderRepository = new OrderRepository()
const orderUseCase = new OrderUseCase(orderRepository, comboUseCase, productUseCase, customerUseCase)

export async function createOrder(request: FastifyRequest<{ Body: OrderCreateDto }>, reply: FastifyReply): Promise<void> {
  const { customerId, combos } = request.body

  const cpf = new CPF(customerId)

  const order = await orderUseCase.createOrder({ customerId: cpf, combos })

  reply.status(201).send(order)
}

export async function listOrders(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const orders = await orderUseCase.listOrders()

  reply.status(200).send(orders)
}
