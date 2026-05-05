import Conta from '#models/conta'
import Transacao from '#models/transacao'
 
export default class TransacaoService {
  public async transferir(data: any) {
    const { contaOrigemId, contaDestinoId, valor } = data

    if (!contaOrigemId || !contaDestinoId || !valor) {
      throw new Error('Preencha todos os dados da transferência')
    }

    if (Number(contaOrigemId) === Number(contaDestinoId)) {
      throw new Error('Não é possível transferir para a mesma conta')
    }

    if (Number(valor) <= 0) {
      throw new Error('Valor inválido')
    }

    const origem = await Conta.find(contaOrigemId)

    if (!origem) {
      throw new Error('Conta de origem inválida')
    }

    const destino = await Conta.find(contaDestinoId)

    if (!destino) {
      throw new Error('Conta de destino inválida')
    }

    if (Number(origem.saldo) < Number(valor)) {
      throw new Error('Saldo insuficiente')
    }

    origem.saldo = Number(origem.saldo) - Number(valor)
    destino.saldo = Number(destino.saldo) + Number(valor)

    await origem.save()
    await destino.save()

    return await Transacao.create({
      tipo: 'pix',
      valor: Number(valor),
      contaOrigemId: Number(contaOrigemId),
      contaDestinoId: Number(contaDestinoId),
    })
  }
}