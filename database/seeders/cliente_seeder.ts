import Cliente from '#models/cliente'
import hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ClienteSeeder extends BaseSeeder {
  public async run() {
    await Cliente.createMany([
      {
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: await hash.make('123456'),
        cpf: '12345678900',
        cidade: 'Curitiba',
        estado: 'PR',
        rua: 'Rua A',
        numero: '100',
      },
      {
        nome: 'Maria Souza',
        email: 'maria@email.com',
        senha: await hash.make('123456'),
        cpf: '98765432100',
        cidade: 'Curitiba',
        estado: 'PR',
        rua: 'Rua B',
        numero: '200',
      },
    ])
  }
}