import type { HttpContext } from '@adonisjs/core/http'
import TransacaoRepository from '../repositories/TransacaoRepository.ts'
import Conta from '../models/conta.ts'


export default class ExtratoController {
  private repo = new TransacaoRepository()

  public async index({ params }: HttpContext) {
    const contaId = Number(params.id)
    const transacoes = await this.repo.getExtrato(contaId)

    return transacoes.map((t: any) => {
      const retirada = Number(t.contaOrigemId) === contaId

      return {
        tipo: t.tipo,
        valor: `${retirada ? '-' : '+'} R$ ${Number(t.valor).toFixed(2)}`,
      }
    })
  }

  public async porCliente({ params, response }: HttpContext) {
    const conta = await Conta.findBy('cliente_id', params.clienteId)

    if (!conta) {
      return response.notFound({
        message: 'Conta não encontrada para este cliente',
      })
    }

    const transacoes = await this.repo.getExtrato(conta.id)

    return transacoes.map((t: any) => {
      const retirada = Number(t.contaOrigemId) === Number(conta.id)

      return {
        tipo: t.tipo,
        valor: `${retirada ? '-' : '+'} R$ ${Number(t.valor).toFixed(2)}`,
      }
    })
  }
}