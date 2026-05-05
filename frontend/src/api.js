import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333'
})

// adiciona header
api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    config.headers.permissao = user.permissao
  }

  return config
})

export default api