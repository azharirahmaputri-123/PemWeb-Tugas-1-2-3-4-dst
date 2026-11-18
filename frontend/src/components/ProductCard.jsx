import { rupiah } from '../utils/format';

// onEdit dan onDelete adalah prop fungsi dari parent (App).
// onClick={() => onEdit(product)} -> fungsi dibuat saat render, tapi baru DIJALANKAN saat diklik.
export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="card">
      <span className="card-id">ID: {product.id}</span>
      <h3>{product.name}</h3>
      <p className="price">{rupiah(product.price)}</p>
      <div className="card-actions">
        <button className="btn btn-outline" onClick={() => onEdit(product)}>Edit</button>
        <button className="btn btn-outline-danger" onClick={() => onDelete(product)}>Hapus</button>
      </div>
    </article>
  );
}
