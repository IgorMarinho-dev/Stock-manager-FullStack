import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CategoryManager from './components/CategoryManager';
import StockMovementForm from './components/StockMovementForm';
import type { Product } from './types';
import './App.css';

type View = 'dashboard' | 'products' | 'categories' | 'movements';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showStockMovementForm, setShowStockMovementForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductSuccess = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleStockMovementSuccess = () => {
    setShowStockMovementForm(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📦 Gerenciador de Estoque</h1>
      </header>

      <nav className="nav">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={currentView === 'dashboard' ? 'active' : ''}
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentView('products')}
          className={currentView === 'products' ? 'active' : ''}
        >
          Produtos
        </button>
        <button
          onClick={() => setCurrentView('categories')}
          className={currentView === 'categories' ? 'active' : ''}
        >
          Categorias
        </button>
        <button
          onClick={() => setCurrentView('movements')}
          className={currentView === 'movements' ? 'active' : ''}
        >
          Movimentações
        </button>
      </nav>

      <main className="main">
        {currentView === 'dashboard' && <Dashboard key={refreshTrigger} />}

        {currentView === 'products' && (
          <>
            {!showProductForm ? (
              <>
                <div className="header-actions">
                  <button onClick={handleNewProduct} className="btn-primary">
                    + Novo Produto
                  </button>
                </div>
                <ProductList onEdit={handleEdit} refreshTrigger={refreshTrigger} />
              </>
            ) : (
              <ProductForm
                product={editingProduct}
                onSuccess={handleProductSuccess}
                onCancel={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
              />
            )}
          </>
        )}

        {currentView === 'categories' && <CategoryManager />}

        {currentView === 'movements' && (
          <>
            {!showStockMovementForm ? (
              <div className="header-actions">
                <button
                  onClick={() => setShowStockMovementForm(true)}
                  className="btn-primary"
                >
                  + Nova Movimentação
                </button>
              </div>
            ) : (
              <StockMovementForm
                onSuccess={handleStockMovementSuccess}
                onCancel={() => setShowStockMovementForm(false)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;