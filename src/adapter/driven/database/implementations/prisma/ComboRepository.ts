import { IComboRepository } from '@/core/application/ports/ComboRepository'
import { Combo } from '@/core/domain/entities/Combo'
import { Product } from '@/core/domain/entities/Product'
import { PrismaClient } from '@prisma/client'

export class ComboRepository implements IComboRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }
  
  async saveCombo(combo: Combo): Promise<void> {
    await this.prisma.combo.create({
      data: {
        products: {
          create: {
            //  TODO: Conferir o DTO. No n:n, ver como serão inseridos os valores dos pedidos aqui
          }
        }
      }
    })
    throw new Error('Method not implemented.')
  }
  getComboById(comboId: number): Promise<Combo | null> {
    throw new Error('Method not implemented.')
  }
  updateCombo(combo: Combo): Promise<void> {
    throw new Error('Method not implemented.')
  }
  deleteCombo(comboId: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
