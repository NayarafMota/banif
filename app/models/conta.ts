import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Conta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numeroConta: string

  @column()
  declare agencia: string

  @column()
  declare saldo: number

  @column()
  declare clienteId: number
}