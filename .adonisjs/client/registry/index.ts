/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'cliente.store': {
    methods: ["POST"],
    pattern: '/clientes',
    tokens: [{"old":"/clientes","type":0,"val":"clientes","end":""}],
    types: placeholder as Registry['cliente.store']['types'],
  },
  'cliente.index': {
    methods: ["GET","HEAD"],
    pattern: '/clientes',
    tokens: [{"old":"/clientes","type":0,"val":"clientes","end":""}],
    types: placeholder as Registry['cliente.index']['types'],
  },
  'conta.store': {
    methods: ["POST"],
    pattern: '/contas',
    tokens: [{"old":"/contas","type":0,"val":"contas","end":""}],
    types: placeholder as Registry['conta.store']['types'],
  },
  'conta.show': {
    methods: ["GET","HEAD"],
    pattern: '/contas/:id',
    tokens: [{"old":"/contas/:id","type":0,"val":"contas","end":""},{"old":"/contas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['conta.show']['types'],
  },
  'transacaos.store': {
    methods: ["POST"],
    pattern: '/transacoes',
    tokens: [{"old":"/transacoes","type":0,"val":"transacoes","end":""}],
    types: placeholder as Registry['transacaos.store']['types'],
  },
  'extrato.index': {
    methods: ["GET","HEAD"],
    pattern: '/extrato/:id',
    tokens: [{"old":"/extrato/:id","type":0,"val":"extrato","end":""},{"old":"/extrato/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['extrato.index']['types'],
  },
  'investimento.store': {
    methods: ["POST"],
    pattern: '/investimentos',
    tokens: [{"old":"/investimentos","type":0,"val":"investimentos","end":""}],
    types: placeholder as Registry['investimento.store']['types'],
  },
  'investimento.resgatar': {
    methods: ["POST"],
    pattern: '/investimentos/:id/resgatar',
    tokens: [{"old":"/investimentos/:id/resgatar","type":0,"val":"investimentos","end":""},{"old":"/investimentos/:id/resgatar","type":1,"val":"id","end":""},{"old":"/investimentos/:id/resgatar","type":0,"val":"resgatar","end":""}],
    types: placeholder as Registry['investimento.resgatar']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
