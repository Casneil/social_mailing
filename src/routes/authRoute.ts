import { Router } from 'express';
import { createOrConnectToken, getPersistedTokenUser } from '../repositories/token/tokenRepository';

const router = Router();

router.post('/login', createOrConnectToken );
router.post('/authenticate', getPersistedTokenUser);

export default router;
