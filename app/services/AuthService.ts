import ClienteRepository from '../repositories/ClienteRepository.ts'

export default class AuthService {
  private repo = new ClienteRepository()

  async login(email: string, senha: string) {
    const user = await this.repo.findByEmail(email)

    if (!user) {
      throw new Error('Email ou senha inválidos')
    }

    if (user.senha !== senha) {
      throw new Error('Email ou senha inválidos')
    }

    return user
  }
}