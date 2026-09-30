export interface Produk {
  id: string;
  nama: string;
  kategori: string;
  harga: number;
  stok: number;
  gambar: string;
}

let produkList: Produk[] = [
  {
    id: "1",
    nama: "Kebaya Encim Modern Aurora",
    kategori: "Kebaya",
    harga: 350000,
    stok: 12,
    gambar: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80"
  },
  {
    id: "2",
    nama: "Set Kamen Batik Silk Parang",
    kategori: "Kamen & Kain",
    harga: 225000,
    stok: 25,
    gambar: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80"
  },
  {
    id: "3",
    nama: "Kebaya Kutubaru Velvet Emerald",
    kategori: "Kebaya",
    harga: 420000,
    stok: 8,
    gambar: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&q=80"
  }
];

export function getProduk(): Produk[] {
  return produkList;
}

export function addProduk(item: Omit<Produk, "id">): Produk {
  const newProduk: Produk = { id: Date.now().toString(), ...item };
  produkList.unshift(newProduk);
  return newProduk;
}

export function deleteProduk(id: string): void {
  produkList = produkList.filter((p) => p.id !== id);
}