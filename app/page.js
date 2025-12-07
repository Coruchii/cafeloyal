"use client";
import { useState } from "react";
import { db } from "../firebase"; // Pastikan path ini benar
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [form, setForm] = useState({ nama: "", email: "", hp: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDaftar = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simpan ke Cloud Firestore
    await setDoc(doc(db, "users", form.hp), {
      nama: form.nama,
      email: form.email,
      hp: form.hp,
      poin: 0,
    });
    localStorage.setItem("userHP", form.hp);
    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-black">CafeLoyal ☕</h1>
        <p className="text-center text-gray-500 mb-8">Daftar member baru</p>
        
        <form onSubmit={handleDaftar} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input 
              placeholder="Contoh: Budi Santoso" 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black" 
              onChange={(e) => setForm({...form, nama: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              placeholder="email@contoh.com" 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black" 
              type="email" 
              onChange={(e) => setForm({...form, email: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP (Untuk QR)</label>
            <input 
              placeholder="08123456789" 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black" 
              type="tel" 
              onChange={(e) => setForm({...form, hp: e.target.value})} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold p-3 rounded-lg transition-colors"
          >
            {loading ? "Memproses..." : "Buat Member ID"}
          </button>
        </form>
      </div>
    </div>
  );
}