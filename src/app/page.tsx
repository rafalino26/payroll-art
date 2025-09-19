// file: app/page.tsx (Versi Tes)

export default async function HomePage() {
  // Semua kode yang memanggil database (getLatestPayrollData, etc.) di-comment atau dihapus untuk tes ini.
  // Semua kalkulasi juga dihapus.

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Tes Build Vercel</h1>
        <p className="text-gray-600">Jika halaman ini muncul, berarti build berhasil tanpa koneksi database.</p>
      </div>
    </main>
  );
}