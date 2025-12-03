import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, getCategories } from '../services/api';
import type { Product, Category } from '../types';

interface Props {
  onEdit: (product: Product) => void;
  refreshTrigger: number;
}

export default function ProductList({ onEdit, refreshTrigger }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  useEffect(() => {
    loadProducts();
  }, [search, categoryFilter, showLowStock]);

  const loadData = async () => {
    await Promise.all([loadProducts(), loadCategories()]);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts({
        search: search || undefined,
        categoryId: categoryFilter || undefined,
        lowStock: showLowStock || undefined,
      });
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto');
    }
  };

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="product-list">
      <h2>Produtos</h2>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showLowStock}
            onChange={(e) => setShowLowStock(e.target.checked)}
          />
          Apenas estoque baixo
        </label>
      </div>

      {products.length === 0 ? (
        <p className="empty-message">Nenhum produto encontrado</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Estoque Mín.</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr 
                  key={product.id}
                  className={product.quantity <= product.minStock ? 'low-stock' : ''}
                >
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>R$ {product.price.toFixed(2)}</td>
                  <td>
                    {product.quantity}
                    {product.quantity <= product.minStock && (
                      <span className="warning-badge"> ⚠️</span>
                    )}
                  </td>
                  <td>{product.minStock}</td>
                  <td className="actions">
                    <button onClick={() => onEdit(product)} className="btn-edit">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="btn-delete">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}