'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProdukPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('Kebaya Modern');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [gambar, setGambar] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. AMBIL DATA LAMA BERDASARKAN ID SAAT HALAMAN DIBUKA
  useEffect(() => {
    if (!id) return;

    const fetchDetailProduk = async () => {
      try {
        const res = await fetch('/api/produk');
        const result = await res.json();
        
        if (result.data) {
          // Cari produk yang ID-nya sama dengan URL
          const item = result.data.find((p: any) => p.id === id);
          if (item) {
            setNama(item.nama || '');
            setKategori(item.kategori || 'Kebaya Modern');
            setHarga(item.harga ? item.harga.toString() : '');
            setStok(item.stok ? item.stok.toString() : '');
            setGambar(item.gambar || '');
          }
        }
      } catch (error) {
        console.error('Gagal mengambil data produk:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailProduk();
  }, [id]);

  // 2. FUNGSI UNTUK SIMPAN PERUBAHAN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/produk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          nama,
          kategori,
          harga: Number(harga),
          stok: Number(stok),
          gambar,
        }),
      });

      if (res.ok) {
        alert('Produk berhasil diperbarui!');
        router.push('/');
      } else {
        alert('Gagal memperbarui produk.');
      }
    } catch (error) {
      console.error('Error saat edit produk:', error);
      alert('Terjadi kesalahan saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] text-[#8B3A1B] font-bold">
        Memuat data produk...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-[#E29578]/30">
        <h2 className="text-2xl font-serif font-bold text-[#8B3A1B] mb-2">Edit Koleksi Produk</h2>
        <p className="text-xs text-gray-500 mb-6">Ubah informasi produk di bawah ini.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#4A2E2B] uppercase mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#8B3A1B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A2E2B] uppercase mb-1">
              Kategori
            </label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#8B3A1B]"
            >
              <option value="Kebaya Modern">Kebaya Modern</option>
              <option value="Kamen & Kain Silk">Kamen & Kain Silk</option>
              <option value="Set Couple / Batik">Set Couple / Batik</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4A2E2B] uppercase mb-1">
                Harga (Rp)
              </label>
              <input
                type="number"
                required
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#8B3A1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A2E2B] uppercase mb-1">
                Stok
              </label>
              <input
                type="number"
                required
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#8B3A1B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A2E2B] uppercase mb-1">
              URL Gambar
            </label>
            <input
              type="text"
              required
              value={gambar}
              onChange={(e) => setGambar(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#8B3A1B]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#8B3A1B] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#6D2D15] transition"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-300 transition text-center"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}