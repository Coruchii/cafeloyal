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

    // Realtime Listener: Kalau poin nambah, otomatis update tanpa refresh (Fitur Cloud!)
    const unsub = onSnapshot(doc(db, "users", hp), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">Halo, {data.nama}!</h1>
      <div className="my-6 p-4 border rounded bg-white">
        {/* QR Code isi Nomor HP */}
        <QRCode value={data.hp} />
      </div>
      <p>Scan QR ini di kasir.</p>
      <div className="mt-4 bg-green-100 p-4 rounded w-full">
        <p className="text-lg">Poin Kamu:</p>
        <h2 className="text-4xl font-bold text-green-700">{data.poin}</h2>
      </div>
    </div>
  );
}