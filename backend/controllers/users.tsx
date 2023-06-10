import { Router, Request, Response } from 'express';
import db from '../models';
import bcrypt from 'bcrypt';

const router: Router = Router();
const { User } = db

router.post('/', async (req: Request, res: Response) => {
    try {
        let { password, ...rest } = req.body;
        const user = await User.create({
          ...rest,
          passwordDigest: await bcrypt.hash(password, 10),
        });
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    });


router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    });

export default router