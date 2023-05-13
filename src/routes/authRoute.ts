import { Router } from 'express';
import { createOrConnectToken, getPersistedEmailTokenUser } from '../repositories/token/tokenRepository';

const router = Router();

router.post('/login', createOrConnectToken );
router.post('/authenticate', getPersistedEmailTokenUser);

export default router;
