import { useEffect, useState } from 'react'
import api from '../api'
import '../styles.css'

export default function DashboardGerente() {
  const [aba, setAba] = useState('clientes')
  const [clientes, setClientes] = useState([])

  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    cidade: '',
    estado: '',
    rua: '',
    numero: '',
    permissao: 'cliente',
  })

  const [pix, setPix] = useState({
    contaOrigemId: '',
    contaDestinoId: '',
    valor: '',
  })

  const [aplicacao, setAplicacao] = useState({
    contaId: '',
    tipo: 'poupanca',
    valor: '',
  })

  useEffect(() => {
  listarClientes()

  
}, [])
  function mostrarErro(error, msg) {
    alert(error.response?.data?.message || msg)
  }

  function formatarTipo(tipo) {
    switch (tipo) {
      case 'poupanca':
        return 'Poupança'
      case 'titulos_governo':
        return 'Títulos do Governo'
      case 'acoes':
        return 'Ações'
      default:
        return tipo
    }
  }

  async function listarClientes() {
    try {
      const res = await api.get('/clientes')
      setClientes(res.data)
    } catch (error) {
      mostrarErro(error, 'Erro ao listar clientes')
    }
  }

  async function cadastrarCliente() {
    try {
      const res = await api.post('/clientes', cliente)

      alert(res.data?.message || 'Cliente cadastrado e conta criada com sucesso!')

      setCliente({
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        cidade: '',
        estado: '',
        rua: '',
        numero: '',
        permissao: 'cliente',
      })

      listarClientes()
      setAba('clientes')
    } catch (error) {
      mostrarErro(error, 'Erro ao cadastrar cliente')
    }
  }

  async function fazerPix() {
    try {
      if (!pix.contaOrigemId || !pix.contaDestinoId || !pix.valor) {
        alert('Preencha todos os dados do Pix')
        return
      }

      if (Number(pix.contaOrigemId) === Number(pix.contaDestinoId)) {
        alert('A conta de origem e destino não podem ser iguais')
        return
      }

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

  async function aplicar() {
    try {
      if (!aplicacao.contaId || !aplicacao.valor) {
        alert('Preencha todos os dados da aplicação')
        return
      }

      await api.post('/investimentos', {
        contaId: Number(aplicacao.contaId),
        tipo: aplicacao.tipo,
        valor: Number(aplicacao.valor),
      })

      alert('Aplicação realizada com sucesso!')
      setAplicacao({ contaId: '', tipo: aplicacao.tipo, valor: '' })
    } catch (error) {
      mostrarErro(error, 'Erro ao aplicar')
    }
  }

  function abrirAplicacao(tipo) {
    setAplicacao({ contaId: '', tipo, valor: '' })
    setAba('aplicacao')
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1>BANIF</h1>
        <p>Área do Gerente</p>

        <button onClick={() => setAba('cadastro')}>Cadastrar Cliente</button>
        <button onClick={() => { listarClientes(); setAba('clientes') }}>Clientes</button>
        <button onClick={() => setAba('pix')}>Pix</button>
        <button onClick={() => abrirAplicacao('poupanca')}>Poupança</button>
        <button onClick={() => abrirAplicacao('titulos_governo')}>Títulos</button>
        <button onClick={() => abrirAplicacao('acoes')}>Ações</button>
      </aside>

      <main className="content">
        {aba === 'cadastro' && (
          <div className="card form">
            <h2>Cadastrar Cliente</h2>

            <input value={cliente.nome} placeholder="Nome completo" onChange={e => setCliente({ ...cliente, nome: e.target.value })} />
            <input value={cliente.email} placeholder="E-mail" onChange={e => setCliente({ ...cliente, email: e.target.value })} />
            <input value={cliente.senha} placeholder="Senha" type="password" onChange={e => setCliente({ ...cliente, senha: e.target.value })} />
            <input value={cliente.cpf} placeholder="CPF" onChange={e => setCliente({ ...cliente, cpf: e.target.value })} />
            <input value={cliente.cidade} placeholder="Cidade" onChange={e => setCliente({ ...cliente, cidade: e.target.value })} />
            <input value={cliente.estado} placeholder="Estado" onChange={e => setCliente({ ...cliente, estado: e.target.value })} />
            <input value={cliente.rua} placeholder="Rua" onChange={e => setCliente({ ...cliente, rua: e.target.value })} />
            <input value={cliente.numero} placeholder="Número" onChange={e => setCliente({ ...cliente, numero: e.target.value })} />

            <select value={cliente.permissao} onChange={e => setCliente({ ...cliente, permissao: e.target.value })}>
              <option value="cliente">Cliente</option>
              <option value="gerente">Gerente</option>
            </select>

            <button className="primary-btn" onClick={cadastrarCliente}>Salvar Cliente</button>
          </div>
        )}

        {aba === 'pix' && (
          <div className="card form">
            <h2>Transferência Pix</h2>

            <input placeholder="ID da conta origem" type="number" value={pix.contaOrigemId} onChange={e => setPix({ ...pix, contaOrigemId: e.target.value })} />
            <input placeholder="ID da conta destino" type="number" value={pix.contaDestinoId} onChange={e => setPix({ ...pix, contaDestinoId: e.target.value })} />
            <input placeholder="Valor" type="number" value={pix.valor} onChange={e => setPix({ ...pix, valor: e.target.value })} />

            <button className="primary-btn" onClick={fazerPix}>Confirmar Pix</button>
          </div>
        )}

        {aba === 'aplicacao' && (
          <div className="card form">
            <h2>Aplicação Financeira</h2>

            <p style={{ fontWeight: 'bold', color: '#2563eb' }}>
              Tipo: {formatarTipo(aplicacao.tipo)}
            </p>

            <input placeholder="ID da conta" type="number" value={aplicacao.contaId} onChange={e => setAplicacao({ ...aplicacao, contaId: e.target.value })} />
            <input placeholder="Valor" type="number" value={aplicacao.valor} onChange={e => setAplicacao({ ...aplicacao, valor: e.target.value })} />

            <button className="primary-btn" onClick={aplicar}>Confirmar Aplicação</button>
          </div>
        )}

        {aba === 'clientes' && (
          <div className="card">
            <h2>Clientes</h2>

            <ul className="list">
              {clientes.map(cliente => (
                <li key={cliente.id}>
                  {cliente.id} - {cliente.nome} - {cliente.email} - {cliente.permissao}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}