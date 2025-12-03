import { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/api';
import type { DashboardStats } from '../types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando estatísticas...</div>;
  }

  if (!stats) {
    return <div className="error">Erro ao carregar estatísticas</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Produtos</h3>
          <p className="stat-value">{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Valor Total do Estoque</h3>
          <p className="stat-value">
            R$ {stats.totalStockValue.toFixed(2)}
          </p>
        </div>
        <div className="stat-card warning">
          <h3>Produtos com Estoque Baixo</h3>
          <p className="stat-value">{stats.lowStockProducts}</p>
        </div>
      </div>
    </div>
  );
}