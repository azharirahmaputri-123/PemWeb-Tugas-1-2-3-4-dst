import { useState } from 'react';
import { dummyProducts } from './data/dummyProducts';
import ProductCard from './components/ProductCard';
import ProductFormModal from './components/ProductFormModal';
import DeleteModal from './components/DeleteModal';

export default function App() {
  const [products, setProducts] = useState(dummyProducts);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit' | 'delete'
  const [selected, setSelected] = useState(null);

  // ---- handler pembuka/penutup modal ----
  const openAdd = () => { setSelected(null); setModal('add'); };
  const openEdit = (product) => { setSelected(product); setModal('edit'); };
  const openDelete = (product) => { setSelected(product); setModal('delete'); };
  const closeModal = () => { setModal(null); setSelected(null); };

  // ---- handler aksi data ----
  const handleSave = (data) => {
    if (modal === 'add') {
      const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts([...products, { id: newId, ...data }]);
    } else {
      setProducts(products.map((p) => (p.id === selected.id ? { ...p, ...data } : p)));
    }
    closeModal();
  };

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== selected.id));
    closeModal();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main className="page">
      <header className="header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="muted">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Tambah Produk</button>
      </header>

      <div className="toolbar">
        <input
          className="search"
          placeholder="🔍 Cari nama produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="muted">{products.length} produk</span>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">Tidak ada produk yang cocok. Coba kata kunci lain atau tambah produk baru.</p>
      ) : (
        <section className="grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onEdit={openEdit} onDelete={openDelete} />
          ))}
        </section>
      )}

      <p className="muted footer">Menampilkan {filtered.length} dari {products.length} produk</p>

      {(modal === 'add' || modal === 'edit') && (
        <ProductFormModal
          key={selected ? selected.id : 'new'}
          mode={modal}
          product={selected}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
      {modal === 'delete' && (
        <DeleteModal product={selected} onConfirm={handleDelete} onClose={closeModal} />
      )}
    </main>
  );
}
