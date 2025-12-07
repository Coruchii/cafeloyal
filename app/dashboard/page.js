"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import QRCode from "react-qr-code";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const hp = localStorage.getItem("userHP");
    if (!hp) return;

    const unsub = onSnapshot(doc(db, "users", hp), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-white text-black">Loading data...</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Biru Langit */}
        <div className="bg-sky-500 p-6 text-center">
          <h1 className="text-white text-xl font-semibold">Member Card</h1>
          <p className="text-sky-100 text-sm">Tunjukkan QR ini ke kasir</p>
        </div>

        {/* Body Card */}
        <div className="p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.nama}</h2>
          
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg mb-6">
            <QRCode value={data.hp} size={180} />
          </div>

          {/* Kotak Poin */}
          <div className="w-full bg-sky-50 rounded-xl p-4 text-center border border-sky-100">
            <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Total Poin Anda</p>
            <h3 className="text-5xl font-bold text-sky-600 mt-1">{data.poin}</h3>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400">CafeLoyal System v1.0</p>
        </div>
      </div>
    </div>
  );
}