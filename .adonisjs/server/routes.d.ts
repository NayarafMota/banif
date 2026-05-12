import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'cliente.store': { paramsTuple?: []; params?: {} }
    'cliente.index': { paramsTuple?: []; params?: {} }
    'conta.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'conta.saldo_por_cliente': { paramsTuple: [ParamValue]; params: {'clienteId': ParamValue} }
    'transacaos.store': { paramsTuple?: []; params?: {} }
    'extrato.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'extrato.por_cliente': { paramsTuple: [ParamValue]; params: {'clienteId': ParamValue} }
    'investimento.store': { paramsTuple?: []; params?: {} }
    'investimento.resgatar': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'cliente.store': { paramsTuple?: []; params?: {} }
    'transacaos.store': { paramsTuple?: []; params?: {} }
    'investimento.store': { paramsTuple?: []; params?: {} }
    'investimento.resgatar': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'cliente.index': { paramsTuple?: []; params?: {} }
    'conta.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'conta.saldo_por_cliente': { paramsTuple: [ParamValue]; params: {'clienteId': ParamValue} }
    'extrato.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'extrato.por_cliente': { paramsTuple: [ParamValue]; params: {'clienteId': ParamValue} }
  }
  HEAD: {
    'cliente.index': { paramsTuple?: []; params?: {} }
    'conta.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'conta.saldo_por_cliente': { paramsTuple: [ParamValue]; params: {'clienteId': ParamValue} }
    'extrato.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'extrato.por_cliente': { paramsTuple: [ParamValue]; params: {'clienteId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}