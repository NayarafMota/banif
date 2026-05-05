import type { HttpContext } from '@adonisjs/core/http'
import Investimento from '#models/investimento'
import Conta from '#models/conta'
import Transacao from '../models/transacao.ts'

export default class InvestimentoController {
  public async store({ request, response }: HttpContext) {
    try {
      const { contaId, tipo, valor } = request.only(['contaId', 'tipo', 'valor'])

      const conta = await Conta.find(contaId)

      if (!conta) {
        throw new Error('Conta não encontrada')
      }

      if (!['poupanca', 'titulos_governo', 'acoes'].includes(tipo)) {
        throw new Error('Tipo de investimento inválido')
      }

      if (Number(valor) <= 0) {
        throw new Error('Valor inválido')
      }

      if (Number(conta.saldo) < Number(valor)) {
        throw new Error('Saldo insuficiente para aplicação')
      }

      conta.saldo = Number(conta.saldo) - Number(valor)
      await conta.save()

      const investimento = await Investimento.create({
        contaId,
        tipo,
        valor: Number(valor),
      })

      await Transacao.create({
        tipo: 'aplicacao',
        valor: Number(valor),
        contaOrigemId: contaId,
        contaDestinoId: null,
      })

      return response.ok({
        message: 'Aplicação realizada com sucesso',
        investimento,
      })
    } catch (error) {
      return response.badRequest({
        message: error.message,
      })
    }
  }

  public async resgatar({ params, response }: HttpContext) {
    try {
      const investimento = await Investimento.find(params.id)

      if (!investimento) {
        throw new Error('Investimento não encontrado')
      }

      const conta = await Conta.find(investimento.contaId)

      if (!conta) {
        throw new Error('Conta não encontrada')
      }

      conta.saldo = Number(conta.saldo) + Number(investimento.valor)
      await conta.save()

      await Transacao.create({
        tipo: 'resgate',
        valor: Number(investimento.valor),
        contaOrigemId: null,
        contaDestinoId: investimento.contaId,
      })

      await investimento.delete()

      return response.ok({
        message: 'Investimento resgatado com sucesso',
      })
    } catch (error) {
      return response.badRequest({
        message: error.message,
      })
    }
  }
}