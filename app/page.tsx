'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Produk {
  id: string;
  nama: string;
  kategori: string;
  harga: number;
  stok: number;
  gambar: string;
}

export default function HomePage() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [loading, setLoading] = useState<boolean>(true);

  // Ambil data dari API /api/produk
  const fetchProduk = async () => {
    try {
      const res = await fetch('/api/produk');
      const data = await res.json();
      if (data.data) {
        setProdukList(data.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // Fungsi Hapus Produk
  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await fetch(`/api/produk?id=${id}`, { method: 'DELETE' });
        fetchProduk();
      } catch (error) {
        console.error('Gagal menghapus:', error);
      }
    }
  };

  const categories = ['Semua', 'Kebaya Modern', 'Kamen & Kain Silk', 'Set Couple / Batik'];

  const filteredProduk = selectedCategory === 'Semua'
    ? produkList
    : produkList.filter((item) => item.kategori.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(item.kategori.toLowerCase()));

  return (
    /* LOKASI BACKGROUND GAMBAR: Masukkan path gambar kamu di bagian url('') nanti */
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-[#4A2E2B] font-sans relative"
      style={{
        backgroundImage: `url('bg.kebaya.jpeg')`, // <-- Nanti isi nama/path gambarmu di sini (Contoh: '/bg.jpg')
      }}
    >
      {/* Overlay transparan */}
      <div className="min-h-screen bg-black/40 backdrop-blur-[2px]">
        
        {/* NAVBAR ATAS */}
        <nav className="bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#E29578]/30 sticky top-0 z-50 shadow-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Logo & Brand Name */}
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <div>
                <h1 className="text-xl font-serif font-bold text-[#8B3A1B] tracking-wide">
                  KEBAYA ELEGANT
                </h1>
                <p className="text-[10px] text-[#8C6D58] tracking-widest uppercase">
                  Premium Collection
                </p>
              </div>
            </div>

            {/* Menu Navigasi Tengah */}
            <div className="flex items-center gap-6 text-sm font-medium text-[#4A2E2B]">
              <Link href="/" className="text-[#8B3A1B] font-bold underline underline-offset-4 decoration-2">
                Katalog
              </Link>
              <Link href="/tambah" className="hover:text-[#8B3A1B] transition">
                Tambah Produk
              </Link>
            </div>

            {/* Tombol Aksi Navbar */}
            <div className="flex items-center gap-3">
              <Link
                href="/tambah"
                className="bg-[#064E3B] hover:bg-[#04382B] text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm"
              >
                + Tambah Kebaya
              </Link>
            </div>

          </div>
        </nav>

        {/* KONTEN UTAMA */}
        <div className="max-w-6xl mx-auto p-6 mt-4">
          
          {/* Banner Welcoming */}
          <div className="mb-8 text-center sm:text-left border-b border-[#FFF8F0]/30 pb-6">
            <h2 className="text-3xl font-serif font-bold text-[#FFF8F0] tracking-wide drop-shadow">
              Koleksi Busana Tradisional & Modern
            </h2>
            <p className="text-sm text-[#FDEBD0] mt-1 drop-shadow">
              Temukan kebaya dan kain batik berkualitas tinggi dengan gaya yang anggun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Sidebar Kategori */}
            <aside className="md:col-span-1">
              <div className="bg-[#FFF8F0]/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-[#E29578]/30 sticky top-24">
                <h3 className="font-serif font-bold text-lg text-[#8B3A1B] border-b border-[#E29578]/30 pb-3 mb-4 tracking-wider">
                  KATEGORI
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                          isSelected
                            ? 'text-[#8B3A1B] font-bold underline decoration-2 underline-offset-4'
                            : 'text-[#064E3B] hover:text-[#04382B] hover:bg-[#F3E5D8] font-medium'
                        }`}
                      >
                        {cat} {cat === 'Semua' && `(${produkList.length})`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* List Produk Grid */}
            <main className="md:col-span-3">
              {loading ? (
                <div className="text-center py-12 text-[#FFF8F0]">Memuat data produk...</div>
              ) : filteredProduk.length === 0 ? (
                <div className="bg-[#FFF8F0]/95 p-8 rounded-2xl text-center text-[#8B3A1B]">
                  Belum ada produk. Klik tombol <strong>"+ Tambah Kebaya"</strong> di atas untuk menambahkan produk barumu!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProduk.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#FFF8F0]/95 rounded-2xl overflow-hidden shadow-lg border border-[#E29578]/20 transition flex flex-col justify-between"
                    >
                      <div>
                        <img
                          src={item.gambar}
                          alt={item.nama}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <span className="text-[11px] font-bold tracking-wider text-[#064E3B] uppercase bg-[#E6F4EA] px-2.5 py-1 rounded-full">
                            {item.kategori}
                          </span>
                          <h3 className="font-serif font-bold text-base text-[#4A2E2B] mt-2 line-clamp-1">
                            {item.nama}
                          </h3>
                          <p className="text-sm font-bold text-[#8B3A1B] mt-1">
                            Rp {item.harga.toLocaleString('id-ID')}
                          </p>
                          <p className="text-xs text-[#8C6D58] mt-1">
                            Stok: {item.stok} pcs
                          </p>
                        </div>
                      </div>

                      {/* Tombol Aksi (Edit & Hapus) */}
                      <div className="p-4 pt-0 flex gap-2 border-t border-[#E29578]/20 mt-2">
                        <Link
                          href={`/edit/${item.id}`}
                          className="flex-1 text-center bg-[#064E3B] hover:bg-[#04382B] text-white py-1.5 rounded-lg text-xs font-semibold transition shadow-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-1.5 rounded-lg text-xs font-semibold transition"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}