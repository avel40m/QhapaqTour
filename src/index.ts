import 'dotenv/config';
import 'reflect-metadata';
import app from './app';
import {AppDataSource} from './db';

const PORT = 3000;

const main = async () => {
    try {
        await AppDataSource.initialize();
        console.log('La base de datos está conectada');
        app.listen(PORT, () => console.log(`El servidor está arrancando en el puerto: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

main()