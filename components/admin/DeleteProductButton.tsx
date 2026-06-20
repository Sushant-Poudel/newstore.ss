'use client';

import { useState } from 'react';

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    // Full reload so the server re-reads the file
    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
    >
      {deleting ? '…' : 'Delete'}
    </button>
  );
}
