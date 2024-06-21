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

// Ruta para subir videos
app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo.');
    }
    res.send('Archivo subido con éxito.');
});
// Ruta para obtener la lista de videos
app.get('/videos', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer los archivos' });
        }

        const videos = files.map(file => ({
            name: file,
            url: `/uploads/${file}`
        }));

        res.json(videos);
    });
});
// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

// ... (resto del código)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});