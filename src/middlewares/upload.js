const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../config/cloudinary');

// Configuración del almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Carpeta donde se almacenarán las imágenes en Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg'], // Formatos permitidos
  },
});

const upload = multer({ storage });

module.exports = upload;
