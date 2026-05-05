import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Investimento extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipo: string

  @column()
  declare valor: number

  @column()
  declare contaId: number
}