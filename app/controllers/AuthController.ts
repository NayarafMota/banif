import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '../services/AuthService.ts'

export default class AuthController {
  private service = new AuthService()

  public async login({ request, response }: HttpContext) {
    try {
      const { email, senha } = request.only(['email', 'senha'])

      const cliente = await this.service.login(email, senha)

      return response.ok({
        message: 'Login realizado com sucesso',
        token: 'token-teste-banif',

        // 👇 ESSENCIAL para o frontend funcionar
        permissao: cliente.permissao,
        cliente,

        // 👇 estrutura mais completa (projeto/prova)
        usuario: {
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email,
          cpf: cliente.cpf,
        },

        permissoes: {
          perfil: cliente.permissao,
          podeCadastrarCliente: cliente.permissao === 'gerente',
          podeCriarConta: cliente.permissao === 'gerente',
          podeVisualizarClientes: cliente.permissao === 'gerente',
          podeVerSaldo: true,
          podeVerExtrato: true,
          podeFazerPix: true,
          podeInvestir: true,
        },
      })
    } catch {
      return response.unauthorized({
        message: 'Email ou senha inválidos',
      })
    }
  }
}