import { Usuario } from '../entities/usuario.entity';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'somesecrettoken'
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const usuario = await Usuario.findOneBy({ id: parseInt(payload.id) });

        if (usuario) {
            return done(null, usuario);
        }

        return done(null, false);
    } catch (error) {
        return done(error, false)
    }
});