import type { HttpContext } from '@adonisjs/core/http'
import TransacaoRepository from '../repositories/TransacaoRepository.ts'

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
}