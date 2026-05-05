import type { HttpContext } from '@adonisjs/core/http'
import ContaService from '../services/ContaService.ts'

export default class ContasController {
  private service = new ContaService()

  public async store({ request }: HttpContext) {
    const data = request.all()
    return await this.service.criarConta(data)
  }

  public async show({ params }: HttpContext) {
    return await this.service.buscarConta(params.id)
  }
}