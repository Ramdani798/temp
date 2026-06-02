import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  // Fungsi untuk mengambil data dari API (GET)
  const fetchUsers = () => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  // Jalankan fetchUsers saat komponen pertama kali dimuat
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fungsi untuk menambah data lewat API (POST)
  const handleAddUser = () => {
    const newUser = {
      name: "User Uji Coba",
      email: `test${Math.floor(Math.random() * 1000)}@email.com`
    };

    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchUsers(); // Refresh daftar data setelah berhasil ditambah
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Data Pengguna dari D1 Database</h1>
      <button onClick={handleAddUser}>+ Tambah User Acak</button>
      
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;