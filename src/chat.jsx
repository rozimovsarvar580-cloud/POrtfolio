import React, { useState, useEffect, useRef } from 'react';
import { db } from './firebase'; // Hozirgina yaratgan ko'prikni chaqiramiz
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';

function Chat() {
  const [messages, setMessages] = useState([]); // Xabarlar ro'yxati
  const [newMessage, setNewMessage] = useState(''); // Kiritilayotgan yangi xabar
  const [user, setUser] = useState(''); // Foydalanuvchi ismi
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Chatga kirdimi yoki yo'q

  const messagesEndRef = useRef(null); // Chatni avtomatik pastga tushirish uchun ref

  // 1. Firebase-dan xabarlarni REAL-TIME (jonli) tortib olish
  useEffect(() => {
    if (!isLoggedIn) return;

    // Bazadagi 'messages' nomli to'plamga (collection) so'rov yuboramiz va vaqti bo'yicha tartiblaymiz
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

    // onSnapshot - bazani jonli kuzatadi. O'zgarish bo'lsa srazi ichidagi kod ishlaydi
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesArray = [];
      snapshot.forEach((doc) => {
        messagesArray.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesArray);
    });

    // Komponent o'chganda bazani kuzatishni to'xtatish (Xotirani tejash uchun)
    return () => unsubscribe();
  }, [isLoggedIn]);

  // Har safar yangi xabar kelganda chatni avtomatik eng pastga tushirish
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 2. Firebase-ga yangi xabar yuborish (POST mantiqi)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // 'messages' to'plamiga yangi xabar obyektini qo'shamiz
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        user: user,
        createdAt: new Date() // Server vaqti bo'yicha ketma-ketlik uchun
      });
      setNewMessage(''); // Inputni tozalash
    } catch (error) {
      console.error("Xabar yuborishda xatolik:", error);
    }
  };

  // Agar foydalanuvchi ismini kiritmagan bo'lsa, avval ismini so'raymiz
  if (!isLoggedIn) {
    return (
      <div style={{
        padding: '40px', maxWidth: '400px', margin: '100px auto', fontFamily:
          'Arial', backgroundColor: '#f1f5f9', borderRadius: '12px', textAlign: 'center'
      }}>
        <h2 style={{ color: '#1e3a8a' }}>💬 Mini Jonli Chat</h2>
        <p style={{ color: '#64748b' }}>Chatga kirish uchun ismingizni yozing:</p>
        <form onSubmit={(e) => { e.preventDefault(); if (user.trim()) setIsLoggedIn(true); }}>
          <input
            type="text"
            placeholder="Ismingiz..."
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            style={{
              width: '90%', padding: '12px', borderRadius: '8px',
              border: '1px solid #cbd5e1', marginBottom: '15px', fontSize: '16px'
            }}
          />
          <button type="submit" style={{
            width: '96%', padding: '12px',
            backgroundColor: '#2563eb', color: 'white', border: 'none',
            borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'
          }}>
            Chatga kirish
          </button>
        </form>
      </div>
    );
  }

  // Haqiqiy Chat oynasi
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', maxWidth: '600px',
     margin: '30px auto', fontFamily: 'Arial', border: '1px solid #e2e8f0',
      borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
      {/* Chat Header */}
      <div style={{ padding: '15px 20px', backgroundColor: '#2563eb', color: 'white',
         display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>💬 Umumiy guruh</span>
        <span style={{ backgroundColor: '#1d4ed8', padding: '5px 12px', borderRadius: '20px', fontSize: '14px' }}>👤 {user}</span>
      </div>

      {/* Xabarlar chiqadigan oyna */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8fafc',
         overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg) => {
          // Xabarni yozgan odam o'zimizmi yoki boshqami, shunga qarab dizaynni o'ng/chapga suramiz
          const isMe = msg.user === user;
          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column',
             alignItems: isMe ? 'flex-end' : 'flex-start' }}>
              <span style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px', marginLeft: '5px', marginRight: '5px' }}>{msg.user}</span>
              <div style={{
                maxWidth: '75%', padding: '10px 15px', borderRadius: '14px',
                backgroundColor: isMe ? '#2563eb' : '#e2e8f0',
                color: isMe ? 'white' : '#1e293b',
                borderBottomRightRadius: isMe ? '0px' : '14px',
                borderBottomLeftRadius: isMe ? '14px' : '0px',
                wordBreak: 'break-word'
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}
        {/* Avtomatik skroll pastga tushishi uchun nuqta */}
        <div ref={messagesEndRef} />
      </div>

      {/* Xabar yozish bo'limi */}
      <form onSubmit={handleSendMessage} style={{ padding: '15px', backgroundColor: 'white', display: 'flex', gap: '10px', borderTop: '1px solid #e2e8f0' }}>
        <input
          type="text"
          placeholder="Xabar yozing..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          Yuborish
        </button>
      </form>
    </div>
  );
}

export default Chat;