import Cliente from '#models/cliente'

export default class ClienteRepository {
  async create(data: any) {
    return await Cliente.create(data)
  }

  async findByEmail(email: string) {
    return await Cliente.findBy('email', email)
  }
}