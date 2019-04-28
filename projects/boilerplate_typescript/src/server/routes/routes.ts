import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response): Response => res.send('Hello World'));

export default routes;
