'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-white">Tran</span>
            <span className="text-saffron">dora</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/suppliers" className="hover:text-saffron transition-colors">
              Suppliers
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">
                  {user.firstName} ({user.role})
                </span>
                {user.role === 'supplier' && (
                  <Link
                    href="/supplier/dashboard"
                    className="text-sm hover:text-saffron transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-saffron text-navy px-4 py-2 rounded-lg text-sm font-semibold hover:bg-saffron-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm hover:text-saffron transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-saffron text-navy px-4 py-2 rounded-lg text-sm font-semibold hover:bg-saffron-300 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
