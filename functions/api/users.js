// Method GET: Dipanggil saat React mengambil data (URL: /api/users)
export async function onRequestGet(context) {
    try {
      // Memanggil D1 menggunakan nama binding "temp" sesuai di wrangler.toml
      const { results } = await context.env.temp.prepare("SELECT * FROM Users").all();
      
      return Response.json(results, { status: 200 });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Method POST: Dipanggil saat React mengirim data baru (URL: /api/users)
  export async function onRequestPost(context) {
    try {
      // Membaca data JSON yang dikirim oleh frontend
      const body = await context.request.json();
      const { name, email } = body;
  
      // Menyimpan data ke tabel Users
      await context.env.temp
        .prepare("INSERT INTO Users (name, email) VALUES (?, ?)")
        .bind(name, email)
        .run();
  
      return Response.json({ message: "Pengguna berhasil ditambahkan!" }, { status: 201 });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }