import vine from '@vinejs/vine'

export const createClienteValidator = vine.compile(
  vine.object({
    nome: vine.string(),
    email: vine.string().email(),
    senha: vine.string().minLength(6),
    cpf: vine.string(),
    cidade: vine.string(),
    estado: vine.string(),
    rua: vine.string(),
    numero: vine.string(),
  })
)