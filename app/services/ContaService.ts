import ContaRepository from '../repositories/ContaRepository.ts'
import Cliente from '../models/cliente.ts'

export default class ContaService {
  private repo = new ContaRepository()

  public async criarConta(data: any) {
    if (!data.clienteId) {
      throw new Error('Cliente é obrigatório')
    }

    const cliente = await Cliente.find(Number(data.clienteId))

    if (!cliente) {
      throw new Error('Cliente não encontrado')
    }

    data.clienteId = Number(data.clienteId)
    data.saldo = Number(data.saldo || 0)

    return await this.repo.create(data)
  }

  public async buscarConta(id: number) {
    return await this.repo.findById(id)
  }

  public async saldo(id: number) {
    const conta = await this.repo.findById(id)

    return {
      saldo: conta.saldo,
    }
  }
}