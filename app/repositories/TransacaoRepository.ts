import Transacao from '#models/transacao'

export default class TransacaoRepository {
  public async create(data: any) {
    return await Transacao.create(data)
  }

  public async getExtrato(contaId: number) {
    return await Transacao
      .query()
      .where('conta_origem_id', contaId)
      .orWhere('conta_destino_id', contaId)
      .orderBy('id', 'desc')
  }
}