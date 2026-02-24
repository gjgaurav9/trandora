import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Source India.{' '}
            <span className="text-saffron">Scale Global.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            India&apos;s AI-powered B2B trade marketplace. Connect with verified suppliers,
            leverage free trade agreements, and grow your business globally.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-saffron text-navy px-8 py-3 rounded-lg text-lg font-semibold hover:bg-saffron-300 transition-colors"
            >
              Start Sourcing
            </Link>
            <Link
              href="/signup"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-navy transition-colors"
            >
              Become a Supplier
            </Link>
          </div>
        </div>
      </section>

      {/* Trade Deals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            Leverage India&apos;s Trade Deals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { deal: 'India-UK CETA', rate: '0% Duty', dest: 'United Kingdom', status: 'Active' },
              { deal: 'India-EU FTA', rate: 'Up to 0%', dest: '27 EU Countries', status: 'Pending' },
              { deal: 'India-UAE CEPA', rate: '0% on 80%', dest: 'UAE', status: 'Active' },
            ].map((item) => (
              <div key={item.deal} className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-navy mb-2">{item.deal}</h3>
                <p className="text-3xl font-bold text-saffron mb-2">{item.rate}</p>
                <p className="text-gray-600 text-sm">{item.dest}</p>
                <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            Why Trandora?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'AI-Powered Matching', desc: 'Describe what you need, get matched with verified suppliers instantly.' },
              { title: 'FTA Duty Calculator', desc: 'Calculate landed costs using India\'s active trade agreements.' },
              { title: 'Verified Suppliers', desc: 'GST/PAN verified suppliers with Trust Scores and factory videos.' },
              { title: 'Escrow Payments', desc: 'Buyer protection with milestone-based payments via Razorpay & Stripe.' },
              { title: 'RFQ System', desc: 'Post requirements and receive competitive quotes from matched suppliers.' },
              { title: 'Integrated Logistics', desc: 'Multi-carrier rate comparison and booking in one place.' },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-navy mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
