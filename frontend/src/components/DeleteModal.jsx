import { rupiah } from '../utils/format';

export default function DeleteModal({ product, onConfirm, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal center" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Tutup">×</button>
        <div className="trash">🗑</div>
        <h2>Hapus Produk?</h2>
        <p className="muted">Produk yang dihapus tidak dapat dikembalikan.</p>

        <div className="summary">
          <span className="card-id">ID: {product.id}</span>
          <strong>{product.name}</strong>
          <span className="price">{rupiah(product.price)}</span>
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>Batal</button>
          <button className="btn btn-danger" onClick={onConfirm}>Hapus Produk</button>
        </div>
      </div>
    </div>
  );
}
