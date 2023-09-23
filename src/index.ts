// import dotenv from 'dotenv';
// import 'dotenv/config'
import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './db';
// import { initializeApp, applicationDefault } from 'firebase-admin/app';
// import { getMessaging } from 'firebase-admin/messaging';

// process.env.GOOGLE_APPLICATION_CREDENTIALS;

// initializeApp({
//   credential: applicationDefault(),
//   projectId: 'qhapaqtour-be7e8'
// });

const PORT = process.env.PORT;
// dotenv.config();
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