import Conta from '#models/conta'

export default class ContaRepository {

  async create(data: any) {
    return await Conta.create(data)
  }

  async findById(id: number) {
    return await Conta.findOrFail(id)
  }
}