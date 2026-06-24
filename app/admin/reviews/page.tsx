export const dynamic = 'force-dynamic';

import { getReviews, getProducts } from '@/lib/db';
import DeleteReviewButton from '@/components/admin/DeleteReviewButton';

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`h-3 w-3 ${i < rating ? 'text-amber-400' : 'text-gray-700'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function AdminReviewsPage() {
  const reviews = getReviews();
  const products = getProducts();

  const getProductName = (id: string) => products.find((p) => p.id === id)?.name ?? id;

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-white">Reviews</h1>
        <p className="mt-0.5 text-sm text-gray-500">{reviews.length} total reviews</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead className="border-b border-white/5 bg-[#161616]">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Reviewer</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Product</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Rating</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Review</th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Date</th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#111111]">
            {reviews.map((r) => (
              <tr key={r.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{r.author}</p>
                  {r.verified && <span className="text-[9px] text-emerald-400">Verified</span>}
                </td>
                <td className="px-4 py-3 max-w-[180px]">
                  <p className="truncate text-gray-400 text-xs">{getProductName(r.productId)}</p>
                </td>
                <td className="px-4 py-3">
                  <Stars rating={r.rating} />
                </td>
                <td className="px-4 py-3 max-w-[260px]">
                  {r.title && <p className="font-medium text-white text-xs mb-0.5">{r.title}</p>}
                  <p className="text-xs text-gray-500 line-clamp-2">{r.body}</p>
                </td>
                <td className="px-4 py-3 text-right text-xs text-gray-600 whitespace-nowrap">
                  {new Date(r.createdAt).toLocaleDateString('en-NP', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-4 py-3 text-right">
                  <DeleteReviewButton id={r.id} author={r.author} />
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-gray-600">
                  No reviews yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
