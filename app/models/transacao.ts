import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Transacao extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public tipo!: string

  @column()
  public valor!: number

  @column({ columnName: 'conta_origem_id' })
  public contaOrigemId!: number | null

  @column({ columnName: 'conta_destino_id' })
  public contaDestinoId!: number | null
}