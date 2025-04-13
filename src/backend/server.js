import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8000;

var name = "Venus";

app.get('/', async (req, res) => {
    const response = await axios.get('https://api.api-ninjas.com/v1/planets', 
        {
            params: {name: name},
            headers: {
                'X-Api-Key': process.env.API_KEY
            }
        }
    );

    console.log(JSON.stringify(response.data, 2, null));
    res.json(response.data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});