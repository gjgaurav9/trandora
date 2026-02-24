'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api-client';

interface Supplier {
  id: string;
  businessName: string;
  description?: string;
  address: { city: string; state: string; country: string };
  trustScore: number;
  trustTier: string;
  exportMarkets: string[];
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ data: Supplier[] }>('/suppliers')
      .then((res) => setSuppliers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-navy mb-8">Verified Suppliers</h1>

      {loading ? (
        <p className="text-gray-500">Loading suppliers...</p>
      ) : suppliers.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">No suppliers registered yet.</p>
          <p className="text-gray-400 text-sm mt-2">Be the first to join Trandora!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-navy mb-1">{s.businessName}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {s.address.city}, {s.address.state}
              </p>
              {s.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{s.description}</p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-saffron">
                  Trust: {s.trustScore}/100
                </span>
                <span className="text-xs bg-navy-50 text-navy px-2 py-1 rounded-full capitalize">
                  {s.trustTier}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
