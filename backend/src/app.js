import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan' }));

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
