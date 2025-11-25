import { useEffect, useState } from 'react';
import { getCategories, createCategory, deleteCategory } from '../services/api';
import { categoryFormSchema } from '../validators/product.validator';
import type { Category } from '../types';

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const validatedData = categoryFormSchema.parse({ name: newCategoryName });
      setLoading(true);

      await createCategory(validatedData);
      setNewCategoryName('');
      loadCategories();
    } catch (error: any) {
      if (error.name === 'ZodError') {
        setError(error.errors[0].message);
      } else {
        setError('Erro ao criar categoria');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza? Isso excluirá todos os produtos desta categoria.')) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      alert('Erro ao excluir categoria');
    }
  };

  return (
    <div className="category-manager">
      <h2>Gerenciar Categorias</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="Nome da nova categoria"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className={error ? 'error' : ''}
        />
        <button type="submit" disabled={loading} className="btn-primary">
          Adicionar
        </button>
        {error && <span className="error-message">{error}</span>}
      </form>

      <div className="categories-list">
        {categories.length === 0 ? (
          <p className="empty-message">Nenhuma categoria cadastrada</p>
        ) : (
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <span>
                  {cat.name}
                  {cat._count && (
                    <small> ({cat._count.products} produtos)</small>
                  )}
                </span>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="btn-delete-small"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}