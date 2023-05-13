import { Router } from 'express';
import { createOrConnectToken, getPersistedEmailTokenUser } from '../repositories/token/tokenRepository';

const router = Router();

/**
	* @swagger
	*	components:
	*	 schemas:
	*	  Login:
	*	   type: object
	*	   required:
	*	     - email
	*	   properties:
	*	    email:
	*	     type: string
	*	     description: Your email address
	*	     example:
	*	      email: example@mail.com
*/

router.post('/login', createOrConnectToken );
router.post('/authenticate', getPersistedEmailTokenUser);

export default router;
