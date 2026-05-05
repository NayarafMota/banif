import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Transacao from '#models/transacao'

export default class extends BaseSeeder {
  async run() {
    await Transacao.createMany([
      {
        tipo: 'deposito',
        valor: 1000,
        contaOrigemId: 1,
        contaDestinoId: 1
      },
      {
        tipo: 'pix',
        valor: 200,
        contaOrigemId: 1,
        contaDestinoId: 2
      }
    ])
  }
}