# API Produk (Express + Prisma + SQLite)

## Menjalankan
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed        # opsional, isi 5 produk awal
npm run dev         # http://localhost:3000
npx prisma studio   # lihat isi database (untuk screenshot before-after)
```

## Endpoint
| Method | URL | Body | Respons |
|---|---|---|---|
| GET | /products | - | 200, array produk |
| GET | /products/:id | - | 200 objek produk / 404 |
| POST | /products | `{ name, price }` | 201 produk baru / 400 validasi |
| PUT | /products | `{ id, name, price }` | 200 produk terbarui / 400 / 404 |
| PUT | /products/:id | `{ name, price }` | sama seperti di atas |
| DELETE | /products/:id | - | 200 / 404 |

Validasi: `name` tidak boleh kosong, `price` bilangan bulat > 0.
