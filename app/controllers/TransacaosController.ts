import type { HttpContext } from '@adonisjs/core/http'
import TransacaoService from '../services/TransacaoService.ts'

export default class TransacaosController {
  private service = new TransacaoService()

  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['contaOrigemId', 'contaDestinoId', 'valor'])
      const result = await this.service.transferir(data)

      return response.ok({
        message: 'Pix realizado com sucesso',
        result,
      })
    } catch (error) {
      return response.badRequest({
        message: error.message,
      })
    }
  }
}