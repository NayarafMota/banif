import router from '@adonisjs/core/services/router'

router.post('/auth/login', '#controllers/AuthController.login')

router.post('/clientes', '#controllers/ClienteController.store')
router.get('/clientes', '#controllers/ClienteController.index')

router.post('/contas', '#controllers/ContaController.store')
router.get('/contas/:id', '#controllers/ContaController.show')

router.post('/transacoes', '#controllers/TransacaosController.store')

router.get('/extrato/:id', '#controllers/ExtratoController.index')

router.post('/investimentos', '#controllers/InvestimentoController.store')
router.post('/investimentos/:id/resgatar', '#controllers/InvestimentoController.resgatar')