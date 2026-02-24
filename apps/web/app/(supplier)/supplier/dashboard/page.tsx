'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SupplierDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'supplier')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-navy mb-8">
        Welcome, {user.firstName}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-gray-500 mb-1">Products Listed</p>
          <p className="text-3xl font-bold text-navy">0</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-gray-500 mb-1">Active RFQs</p>
          <p className="text-3xl font-bold text-navy">0</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-gray-500 mb-1">Trust Score</p>
          <p className="text-3xl font-bold text-saffron">--</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-8 text-center">
        <h2 className="text-xl font-semibold text-navy mb-2">Get Started</h2>
        <p className="text-gray-600 mb-4">
          Complete your supplier profile to start listing products and receiving RFQs.
        </p>
        <button className="bg-saffron text-navy px-6 py-3 rounded-lg font-semibold hover:bg-saffron-300 transition-colors">
          Complete Profile
        </button>
      </div>
    </div>
  );
}
