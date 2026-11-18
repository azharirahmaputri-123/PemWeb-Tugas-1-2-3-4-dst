import prisma from '../lib/prisma.js';

// Validasi body untuk POST dan PUT
function validate(body = {}) {
  const errors = [];
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const price = Number(body.price);

  if (!name) errors.push('name wajib diisi');
  if (body.price === undefined || body.price === '' || !Number.isInteger(price) || price <= 0) {
    errors.push('price harus bilangan bulat lebih dari 0');
  }
  return { name, price, errors };
}

const toId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

export async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}

export async function getProductById(req, res) {
  try {
    const id = toId(req.params.id);
    if (!id) return res.status(400).json({ message: 'id tidak valid' });

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, price, errors } = validate(req.body);
    if (errors.length) return res.status(400).json({ message: 'Validasi gagal', errors });

    const product = await prisma.product.create({ data: { name, price } });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}

// id boleh dari body (sesuai brief) atau dari URL /products/:id
export async function updateProduct(req, res) {
  try {
    const id = toId(req.params.id ?? req.body?.id);
    if (!id) return res.status(400).json({ message: 'id wajib diisi dan harus valid' });

    const { name, price, errors } = validate(req.body);
    if (errors.length) return res.status(400).json({ message: 'Validasi gagal', errors });

    const exists = await prisma.product.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    const product = await prisma.product.update({ where: { id }, data: { name, price } });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}

export async function deleteProduct(req, res) {
  try {
    const id = toId(req.params.id);
    if (!id) return res.status(400).json({ message: 'id tidak valid' });

    const exists = await prisma.product.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: 'Produk berhasil dihapus', product: exists });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}
