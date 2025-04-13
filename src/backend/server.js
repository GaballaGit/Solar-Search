import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();

app.use(cors());

app.get('/planet', async (req, res) => {
    const name = req;
    //if (!name) {
    //    return res.status(400).json({ error: 'Missing Planet Name' });
    //}
    
    try {
        const response = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${name}`);
        const data = response.data;

        const planet = {
            name: data.englishName, //string
            moons: data.moons.length, //int
            mass: data.mass.massValue * 10 ** data.mass.massExponent, //kg
            radius: data.meanRadius, //km
            semi_major_axis: data.semimajorAxis, //km
            gravity: data.gravity, // m/s^2
            density: data.density,  // g/cm^3
            escape_velocity: data.escape, //m/s
            orbital_period: data.sideralOrbit, //hours
            rotation_period: data.sideralRotation //hours
        };

        res.json(planet);

    } catch (error) {
        res.status(500).json({ error: 'Failed to Fetch Planet' });
    }
    
});

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
