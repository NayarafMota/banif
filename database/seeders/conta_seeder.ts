import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Conta from '#models/conta'
export default class extends BaseSeeder {
  async run() {
    await Conta.createMany([
      {
        numeroConta: '0001',
        agencia: '123',
        saldo: 1000,
        clienteId: 1
      },
      {
        numeroConta: '0002',
        agencia: '123',
        saldo: 500,
        clienteId: 2
      }
    ])
  }
}