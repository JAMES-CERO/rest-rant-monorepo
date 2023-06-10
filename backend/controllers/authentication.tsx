import { Router, Request, Response, NextFunction } from 'express';
import db from '../models';
import bcrypt from 'bcrypt';
import { error } from 'console';
import { Session } from 'express-session';

const router: Router = Router();
const { User } = db;

interface CustomSession extends Session {
    userId?: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: typeof User;
        }
    }
}

const defineCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if ((req.session as CustomSession).userId) {
            const user = await User.findOne({
                where: { userId: (req.session as CustomSession).userId },
            });

            if (user) {
                req.currentUser = user;
            }
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


router.post('/', async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            where: { email: req.body.email }
        })

        if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
            res.status(404).json({
                message: `Could not find a user with the provided username and password`
            })
        } else {
            (req.session as CustomSession).userId = user.userId
            res.json({ user })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
})

router.get('/profile', async (req: Request, res: Response) => {
    try {
        res.json(req.currentUser);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
})



module.exports = router