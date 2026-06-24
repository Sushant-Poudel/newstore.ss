'use client';

export default function DeleteReviewButton({ id, author }: { id: string; author: string }) {
  async function handleDelete() {
    if (!confirm(`Delete review by "${author}"?`)) return;
    await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
    >
      Delete
    </button>
  );
}
