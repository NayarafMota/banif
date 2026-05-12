import type { HttpContext } from '@adonisjs/core/http'
import Cliente from '../models/cliente.ts'
import Conta from '../models/conta.ts'
import { createClienteValidator } from '../validators/cliente_validator.ts'

export default class ClienteController {
  public async index() {
    return await Cliente.all()
  }

  public async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createClienteValidator)

      const cliente = await Cliente.create(data)

      const conta = await Conta.create({
        numeroConta: String(Date.now()).slice(-6),
        agencia: '0001',
        saldo: 0,
        clienteId: cliente.id,
      })

      console.log(`
        E-mail enviado para: ${cliente.email}
        Assunto: Bem-vindo ao BANIF
        Login: ${cliente.email}
        Senha: ${cliente.senha}
        Conta: ${conta.numeroConta}
        Agência: ${conta.agencia}
      `)

      return response.created({
        message: 'Cliente cadastrado e conta criada automaticamente. E-mail enviado ao cliente.',
        cliente,
        conta,
      })
    } catch (error) {
      return response.badRequest({
        message: error.message || 'Erro ao cadastrar cliente',
      })
    }
  }
}