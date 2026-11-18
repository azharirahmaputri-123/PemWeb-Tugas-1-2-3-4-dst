import prisma from '../src/lib/prisma.js';

const data = [
  { name: 'Pulpen', price: 5000 },
  { name: 'Buku Tulis', price: 12000 },
  { name: 'Spidol', price: 8000 },
  { name: 'Penggaris', price: 6000 },
  { name: 'Penghapus', price: 3000 },
];

await prisma.product.deleteMany();
await prisma.product.createMany({ data });
console.log('Seed selesai:', data.length, 'produk');
await prisma.$disconnect();
