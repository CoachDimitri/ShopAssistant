const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')

router.post('/', typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id', typeController.delete)
router.put('/:id', typeController.update)
router.get('/byname', typeController.getByName)

module.exports = router
