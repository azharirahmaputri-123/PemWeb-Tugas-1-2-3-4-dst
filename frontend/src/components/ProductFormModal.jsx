import { useState } from 'react';

// Dipakai bersama untuk Tambah (mode="add") dan Edit (mode="edit").
export default function ProductFormModal({ mode, product, onSave, onClose }) {
  const isEdit = mode === 'edit';
  const [name, setName] = useState(isEdit ? product.name : '');
  const [price, setPrice] = useState(isEdit ? String(product.price) : '');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const next = {};
    if (!name.trim()) next.name = 'Nama produk wajib diisi.';
    if (!(Number(price) > 0)) next.price = 'Harga harus lebih dari 0.';
    setErrors(next);
    if (Object.keys(next).length) return;

    onSave({ name: name.trim(), price: Number(price) });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Tutup">×</button>
        <h2>{isEdit ? 'Edit Produk' : 'Tambah Produk'}</h2>
        <p className="muted">
          {isEdit ? 'Perbarui informasi produk yang dipilih.' : 'Masukkan informasi produk baru.'}
        </p>

        {isEdit && <p className="card-id">ID: {product.id}</p>}

        <label>Nama Produk</label>
        <input
          value={name}
          placeholder="Contoh: Pulpen"
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <small className="error">{errors.name}</small>}

        <label>Harga (Rp)</label>
        <input
          type="number"
          value={price}
          placeholder="Contoh: 5000"
          onChange={(e) => setPrice(e.target.value)}
        />
        <small className={errors.price ? 'error' : 'hint'}>Harga harus lebih dari 0.</small>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>Batal</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
          </button>
        </div>
      </div>
    </div>
  );
}
