const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.put('/update', authMiddleware, userController.update)
router.delete('/delete/:id', authMiddleware, userController.delete)
router.get('/user/id', authMiddleware, userController.getUserId)

module.exports = router
