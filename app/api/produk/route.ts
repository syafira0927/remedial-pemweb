import { NextResponse } from 'next/server';

// Ubah array produk menjadi KOSONG ([])
let produkList: any[] = [];

// GET - Ambil semua produk
export async function GET() {
  return NextResponse.json({ data: produkList });
}

// POST - Tambah produk baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduk = {
      id: Date.now().toString(),
      ...body,
    };
    produkList.push(newProduk);
    return NextResponse.json({ success: true, data: newProduk });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal menambah produk' }, { status: 500 });
  }
}

// DELETE - Hapus produk
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  produkList = produkList.filter((item) => item.id !== id);
  return NextResponse.json({ success: true });
}

// PUT - Update / Edit produk (DITAMBAHKAN DI SINI)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, nama, kategori, harga, stok, gambar } = body;

    const index = produkList.findIndex((item) => item.id === id);
    if (index !== -1) {
      produkList[index] = { id, nama, kategori, harga, stok, gambar };
      return NextResponse.json({ success: true, data: produkList[index] });
    }

    return NextResponse.json({ success: false, message: 'Produk tidak ditemukan' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal memperbarui data' }, { status: 500 });
  }
}