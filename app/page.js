"use client";
import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [form, setForm] = useState({ nama: "", email: "", hp: "" });
  const router = useRouter();

  const handleDaftar = async (e) => {
    e.preventDefault();
    // Simpan ke Cloud Firestore (Collection: users, ID: No HP)
    await setDoc(doc(db, "users", form.hp), {
      nama: form.nama,
      email: form.email,
      hp: form.hp,
      poin: 0, // Awal daftar poin 0
    });
    // Simpan No HP di browser biar 'login' otomatis
    localStorage.setItem("userHP", form.hp);
    router.push("/dashboard");
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar CafeLoyal</h1>
      <form onSubmit={handleDaftar} className="flex flex-col gap-4">
        <input placeholder="Nama" className="border p-2" onChange={(e) => setForm({...form, nama: e.target.value})} required />
        <input placeholder="Email" className="border p-2" type="email" onChange={(e) => setForm({...form, email: e.target.value})} required />
        <input placeholder="Nomor HP (Contoh: 08123...)" className="border p-2" type="tel" onChange={(e) => setForm({...form, hp: e.target.value})} required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Buat Member</button>
      </form>
    </div>
  );
}