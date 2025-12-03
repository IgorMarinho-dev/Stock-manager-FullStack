import { useEffect, useState } from 'react';
import { getProducts, createStockMovement } from '../services/api';
import { stockMovementFormSchema } from '../validators/product.validator';
import type { Product, StockMovementFormData } from '../types';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function StockMovementForm({ onSuccess, onCancel }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<StockMovementFormData>({
    productId: '',
    type: 'IN',
    quantity: 0,
    reason: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = stockMovementFormSchema.parse(formData);
      setLoading(true);

      await createStockMovement(validatedData);
      onSuccess();
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        alert(error.response?.data?.error || 'Erro ao criar movimentação');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="form-container">
      <h2>Nova Movimentação de Estoque</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productId">Produto *</label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className={errors.productId ? 'error' : ''}
          >
            <option value="">Selecione um produto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (Estoque atual: {product.quantity})
              </option>
            ))}
          </select>
          {errors.productId && <span className="error-message">{errors.productId}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Tipo *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={errors.type ? 'error' : ''}
            >
              <option value="IN">Entrada</option>
              <option value="OUT">Saída</option>
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantidade *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="reason">Motivo</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            placeholder="Ex: Compra de fornecedor, venda, devolução, etc."
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}