/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
  }
  cliente: {
    store: typeof routes['cliente.store']
    index: typeof routes['cliente.index']
  }
  conta: {
    show: typeof routes['conta.show']
    saldoPorCliente: typeof routes['conta.saldo_por_cliente']
  }
  transacaos: {
    store: typeof routes['transacaos.store']
  }
  extrato: {
    index: typeof routes['extrato.index']
    porCliente: typeof routes['extrato.por_cliente']
  }
  investimento: {
    store: typeof routes['investimento.store']
    resgatar: typeof routes['investimento.resgatar']
  }
}
