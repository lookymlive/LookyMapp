const fs = require('fs');
const path = require('path');

// ... (código existente)
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configurar multer para el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Ruta para subir videos o de carga de videos
app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo.');
    }

    const videoInfo = {
        title: req.body.title,
        description: req.body.description,
        storeName: req.body.storeName,
        location: req.body.location,
        fileName: req.file.filename
    };

    // Aquí deberías guardar videoInfo en una base de datos
    // Por ahora, lo guardaremos en un archivo JSON
    const dataPath = path.join(__dirname, 'videoData.json');
    let videos = [];
    if (fs.existsSync(dataPath)) {
        videos = JSON.parse(fs.readFileSync(dataPath));
    }
    videos.push(videoInfo);
    fs.writeFileSync(dataPath, JSON.stringify(videos));

    res.send('Archivo subido con éxito.');
});
// Ruta para obtener la lista de videos
app.get('/videos', (req, res) => {
    const dataPath = path.join(__dirname, 'videoData.json');
    if (fs.existsSync(dataPath)) {
        const videos = JSON.parse(fs.readFileSync(dataPath));
        res.json(videos);
    } else {
        res.json([]);
    }
});
// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

// ... (resto del código)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});