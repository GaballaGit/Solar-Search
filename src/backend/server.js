import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get ('/planet', async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ error: 'Missing Planet Name' });
    }
    
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/planets', 
            {
                params: {name: name},
                headers: {
                    'X-Api-Key': process.env.API_KEY
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'Failed to Fetch Planet' });
    }
});