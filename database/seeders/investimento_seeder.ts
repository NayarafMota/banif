import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Investimento from '#models/investimento'
export default class extends BaseSeeder {
  async run() {
    await Investimento.createMany([
      {
        tipo: 'poupanca',
        valor: 300,
        contaId: 1
      },
      {
        tipo: 'acoes',
        valor: 200,
        contaId: 2
      }
    ])
  }
}