const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Added this line to require jwt

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

    const videoInfo = {
        title: req.body.title,
        description: req.body.description,
        storeName: req.body.storeName,
        location: req.body.location,
        fileName: req.file.filename
    };

    // Guardar videoInfo en un archivo JSON
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

// Conectar a MongoDB (asegúrate de tener MongoDB instalado y ejecutándose)
mongoose.connect('mongodb://localhost/lookymapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el modelo de Store
const Store = mongoose.model('Store', {
  storeName: String,
  email: String,
  password: String
});

// Endpoint para el registro de tiendas
app.post('/api/stores/register', async (req, res) => {
  try {
    const { storeName, email, password } = req.body;
    
    // Verificar si la tienda ya existe
    const existingStore = await Store.findOne({ email });
    if (existingStore) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nueva tienda
    const newStore = new Store({
      storeName,
      email,
      password: hashedPassword
    });

    await newStore.save();
    res.status(201).json({ message: 'Tienda registrada exitosamente' });
  } catch (error) {
    console.error('Error al registrar la tienda:', error);
    res.status(500).json({ message: 'Error al registrar la tienda' });
  }
});

// Nuevo endpoint para el inicio de sesión
app.post('/api/stores/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar la tienda por email
    const store = await Store.findOne({ email });
    if (!store) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, store.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ storeId: store._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.store = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

// Ejemplo de ruta protegida
app.get('/api/stores/profile', verifyToken, async (req, res) => {
  try {
    const store = await Store.findById(req.store.id).select('-password');
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
