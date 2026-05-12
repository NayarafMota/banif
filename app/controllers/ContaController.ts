import type { HttpContext } from '@adonisjs/core/http'
import ContaService from '../services/ContaService.ts'
import Conta from '../models/conta.ts'

export default class ContaController {
  private service = new ContaService()

  public async store({ request }: HttpContext) {
    const data = request.all()
    return await this.service.criarConta(data)
  }

  public async show({ params }: HttpContext) {
    return await this.service.buscarConta(params.id)
  }
  public async saldoPorCliente({ params, response }: HttpContext) {
  const conta = await Conta.findBy('cliente_id', params.clienteId)

  if (!conta) {
    return response.notFound({
      message: 'Conta não encontrada para este cliente',
    })
  }

  return {
    saldo: conta.saldo,
    conta: {
      id: conta.id,
      numeroConta: conta.numeroConta,
      agencia: conta.agencia,
      clienteId: conta.clienteId,
    },
  }
}

}