"use client";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export default function Kasir() {
  const [hp, setHp] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");

  const prosesTransaksi = async () => {
    setStatus("Memproses...");
    const poinDapet = Math.floor(total / 20000); 

    if (poinDapet > 0) {
      const userRef = doc(db, "users", hp);
      const snap = await getDoc(userRef);
      
      if (snap.exists()) {
        await updateDoc(userRef, {
          poin: increment(poinDapet)
        });
        setStatus(`✅ Sukses! Ditambah ${poinDapet} poin.`);
        setHp("");
        setTotal("");
      } else {
        setStatus("❌ User tidak ditemukan!");
      }
    } else {
        setStatus("⚠️ Belanja kurang dari Rp 20.000");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-black border-b pb-2">Kasir CafeLoyal 🖥️</h1>
        
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nomor HP Pelanggan</label>
            <input 
              value={hp} 
              onChange={(e) => setHp(e.target.value)} 
              className="w-full border border-gray-300 p-3 rounded text-black text-lg focus:ring-2 focus:ring-sky-500 outline-none" 
              placeholder="Scan QR atau ketik..." 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Total Belanja (Rp)</label>
            <input 
              type="number" 
              value={total} 
              onChange={(e) => setTotal(e.target.value)} 
              className="w-full border border-gray-300 p-3 rounded text-black text-lg focus:ring-2 focus:ring-sky-500 outline-none" 
              placeholder="0" 
            />
            <p className="text-xs text-gray-500 mt-1">*Dapat 1 poin tiap kelipatan 20rb</p>
          </div>
          
          <button 
            onClick={prosesTransaksi} 
            className="bg-black hover:bg-gray-800 text-white font-bold p-4 rounded-lg mt-2 transition-all"
          >
            PROSES TRANSAKSI
          </button>

          {status && (
            <div className={`p-3 rounded text-center font-medium ${status.includes("Sukses") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}