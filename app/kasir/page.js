"use client";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export default function Kasir() {
  const [hp, setHp] = useState("");
  const [total, setTotal] = useState("");

  const prosesTransaksi = async () => {
    // 1. Rumus Poin: Rp 20.000 = 1 Poin
    const poinDapet = Math.floor(total / 20000); 

    if (poinDapet > 0) {
      // 2. Update Cloud Database
      const userRef = doc(db, "users", hp);
      
      // Cek user ada gak
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        await updateDoc(userRef, {
          poin: increment(poinDapet) // Fitur atomik Cloud Firestore
        });
        alert(`Sukses! Nambah ${poinDapet} poin ke user.`);
      } else {
        alert("User gak ditemukan!");
      }
    } else {
        alert("Belanja kurang dari 20rb, ga dapet poin.");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto bg-gray-50 mt-10 border">
      <h1 className="text-xl font-bold mb-4">Kasir CafeLoyal</h1>
      <div className="flex flex-col gap-4">
        <label>Nomor HP Pelanggan (Hasil Scan QR):</label>
        <input value={hp} onChange={(e) => setHp(e.target.value)} className="border p-2" placeholder="08xxxxx" />
        
        <label>Total Belanja (Rp):</label>
        <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} className="border p-2" placeholder="50000" />
        
        <button onClick={prosesTransaksi} className="bg-black text-white p-2 rounded">Proses Transaksi</button>
      </div>
    </div>
  );
}