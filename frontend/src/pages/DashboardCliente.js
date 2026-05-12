import { useState } from 'react'
import api from '../api'
import '../styles.css'

export default function DashboardCliente({ user }) {
  const [aba, setAba] = useState('saldo')
  const [saldo, setSaldo] = useState('')
  const [contaCliente, setContaCliente] = useState(null)
  const [extrato, setExtrato] = useState([])

  const [pix, setPix] = useState({
    contaOrigemId: '',
    contaDestinoId: '',
    valor: '',
  })

  const [aplicacao, setAplicacao] = useState({
    contaId: '',
    valor: '',
  })

  function mostrarErro(error, msg) {
    alert(error.response?.data?.message || msg)
  }

  async function verSaldo() {
    try {
      const res = await api.get(`/clientes/${user.id}/saldo`)

      setSaldo(res.data.saldo)
      setContaCliente(res.data.conta)
    } catch (error) {
      mostrarErro(error, 'Erro ao buscar saldo')
    }
  }

  async function fazerPix() {
    try {
      await api.post('/transacoes', {
        contaOrigemId: Number(pix.contaOrigemId),
        contaDestinoId: Number(pix.contaDestinoId),
        valor: Number(pix.valor),
      })

      alert('Pix realizado com sucesso!')
      setPix({ contaOrigemId: '', contaDestinoId: '', valor: '' })
    } catch (error) {
      mostrarErro(error, 'Erro ao fazer Pix')
    }
  }

  async function aplicarPoupanca() {
    try {
      await api.post('/investimentos', {
        contaId: Number(aplicacao.contaId),
        tipo: 'poupanca',
        valor: Number(aplicacao.valor),
      })

      alert('Aplicação realizada!')
      setAplicacao({ contaId: '', valor: '' })
    } catch (error) {
      mostrarErro(error, 'Erro ao aplicar')
    }
  }

  async function gerarExtrato() {
    try {
      const res = await api.get(`/clientes/${user.id}/extrato`)
      setExtrato(res.data)
    } catch (error) {
      mostrarErro(error, 'Erro ao gerar extrato')
    }
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1>BANIF</h1>
        <p>Área do Cliente</p>
        <p>{user.nome}</p>

        <button onClick={() => setAba('saldo')}>Saldo</button>
        <button onClick={() => setAba('pix')}>Pix</button>
        <button onClick={() => setAba('poupanca')}>Poupança</button>
        <button onClick={() => setAba('extrato')}>Extrato</button>
      </aside>

      <main className="content">
        {aba === 'saldo' && (
          <div className="card">
            <h2>Saldo</h2>

            <button className="primary-btn" onClick={verSaldo}>
              Ver Saldo
            </button>

            {contaCliente && (
              <div style={{ marginTop: 15 }}>
                <p><strong>Agência:</strong> {contaCliente.agencia}</p>
                <p><strong>Conta:</strong> {contaCliente.numeroConta}</p>
              </div>
            )}

            <h3>R$ {saldo || '0,00'}</h3>
          </div>
        )}

        {aba === 'pix' && (
          <div className="card form">
            <h2>Transferência Pix</h2>

            <input
              placeholder="Conta origem"
              value={pix.contaOrigemId}
              onChange={e => setPix({ ...pix, contaOrigemId: e.target.value })}
            />

            <input
              placeholder="Conta destino"
              value={pix.contaDestinoId}
              onChange={e => setPix({ ...pix, contaDestinoId: e.target.value })}
            />

            <input
              placeholder="Valor"
              value={pix.valor}
              onChange={e => setPix({ ...pix, valor: e.target.value })}
            />

            <button className="primary-btn" onClick={fazerPix}>
              Transferir
            </button>
          </div>
        )}

        {aba === 'poupanca' && (
          <div className="card form">
            <h2>Aplicar Poupança</h2>

            <input
              placeholder="Conta"
              value={aplicacao.contaId}
              onChange={e => setAplicacao({ ...aplicacao, contaId: e.target.value })}
            />

            <input
              placeholder="Valor"
              value={aplicacao.valor}
              onChange={e => setAplicacao({ ...aplicacao, valor: e.target.value })}
            />

            <button className="primary-btn" onClick={aplicarPoupanca}>
              Aplicar
            </button>
          </div>
        )}

        {aba === 'extrato' && (
          <div className="card">
            <h2>Extrato</h2>

            <button className="primary-btn" onClick={gerarExtrato}>
              Gerar Extrato
            </button>

            <ul className="list">
              {extrato.map((item, i) => (
                <li key={i}>
                  {item.tipo} - {item.valor}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}