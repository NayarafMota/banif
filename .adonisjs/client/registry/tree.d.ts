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
    store: typeof routes['conta.store']
    show: typeof routes['conta.show']
  }
  transacaos: {
    store: typeof routes['transacaos.store']
  }
  extrato: {
    index: typeof routes['extrato.index']
  }
  investimento: {
    store: typeof routes['investimento.store']
    resgatar: typeof routes['investimento.resgatar']
  }
}
