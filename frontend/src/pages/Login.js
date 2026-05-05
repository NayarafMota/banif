import { useState } from 'react'
import api from '../api'
import '../styles.css'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function login() {
    try {
      const res = await api.post('/auth/login', { email, senha })

      const { cliente, permissao, token } = res.data

      // salva no estado
      setUser({
        ...cliente,
        permissao,
        token,
      })

      // opcional: salvar no localStorage
      localStorage.setItem('user', JSON.stringify({
        ...cliente,
        permissao,
        token,
      }))

    } catch (error) {
      alert('Email ou senha inválidos')
      console.log(error)
    }
  }
return (
  <div className="login-container">
    <div className="login-card">
      <h2>BANIF</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button className="primary-btn" onClick={login}>Entrar</button>
    </div>
  </div>
)
}