'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TambahPage() {
  const [form, setForm] = useState({
    nama: '',
    kategori: 'Kebaya',
    harga: '',
    stok: '',
    gambar: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80'
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/produk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        harga: Number(form.harga),
        stok: Number(form.stok)
      })
    });
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[#faf7f2] p-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl border border-[#e8ded1] shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-serif font-bold text-[#8b3a2b] mb-2">Tambah Koleksi Produk</h1>
        <p className="text-xs text-gray-500 mb-6">Isi formulir berikut untuk menambah katalog produk baru.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nama Produk</label>
            <input
              type="text"
              required
              className="w-full border border-[#d4c3ae] p-2.5 rounded text-sm focus:outline-[#8b3a2b]"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Kategori</label>
            <select
              className="w-full border border-[#d4c3ae] p-2.5 rounded text-sm focus:outline-[#8b3a2b]"
              value={form.kategori}
              onChange={(e) => setForm({ ...form, kategori: e.target.value })}
            >
              <option value="Kebaya">Kebaya</option>
              <option value="Kamen &amp; Kain">Kamen &amp; Kain</option>
              <option value="Set Couple">Set Couple</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Harga (Rp)</label>
              <input
                type="number"
                required
                className="w-full border border-[#d4c3ae] p-2.5 rounded text-sm focus:outline-[#8b3a2b]"
                value={form.harga}
                onChange={(e) => setForm({ ...form, harga: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Stok</label>
              <input
                type="number"
                required
                className="w-full border border-[#d4c3ae] p-2.5 rounded text-sm focus:outline-[#8b3a2b]"
                value={form.stok}
                onChange={(e) => setForm({ ...form, stok: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">URL Gambar (Unsplash)</label>
            <input
              type="text"
              required
              className="w-full border border-[#d4c3ae] p-2.5 rounded text-sm focus:outline-[#8b3a2b]"
              value={form.gambar}
              onChange={(e) => setForm({ ...form, gambar: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-[#8b3a2b] text-white py-2.5 rounded font-medium text-sm hover:bg-[#722e22] transition">
              Simpan Produk
            </button>
            <Link href="/" className="px-5 py-2.5 bg-[#e0d3c1] text-[#2c221e] rounded font-medium text-sm hover:bg-[#d4c3ae] transition">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}