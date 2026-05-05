import type { HttpContext } from '@adonisjs/core/http'
import Cliente from '../models/cliente.ts'
import ClienteRepository from '../repositories/ClienteRepository.ts'
import { createClienteValidator } from '../validators/cliente_validator.ts'

export default class ClienteController {
  public async index() {
    return await Cliente.all()
  }

  public async store({ request }: HttpContext) {
    const data = await request.validateUsing(createClienteValidator)

    const repo = new ClienteRepository()
    return await repo.create(data)
  }
}