import express from 'express';
import requireDir from 'require-dir';

var routes = requireDir();

const router = express.Router();

router.use('/auth', routes.auth.default);
router.use('/users', routes.users.default);

export default router;