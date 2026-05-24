import React, { useEffect, useRef, useState } from 'react';

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('assistant_chat') || '[]');
    } catch (e) { return []; }
  });
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const friendlyFallback =
    'Assistant sedang tidak tersedia. Coba lagi sebentar, atau tanyakan dengan kalimat lebih spesifik seperti “skills apa saja?” atau “project utama apa?”';

  const normalize = (v) => (v || '').toLowerCase();
  const STOPWORDS = new Set(['yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'the', 'a', 'an', 'is', 'are']);
  const cleanTokens = (value) => normalize(value).split(/\W+/).filter(Boolean).filter((t) => !STOPWORDS.has(t));

  const fallbackReplyFromKnowledge = async (messageText) => {
    try {
      const r = await fetch('/data/knowledge.json');
      if (!r.ok) return null;
      const knowledge = await r.json();
      const tokens = cleanTokens(messageText);
      const scoreItem = (item) => {
        const text = normalize(`${item.title} ${item.summary} ${item.text}`);
        let score = 0;
        for (const token of tokens) if (text.includes(token)) score += 2;
        const titleTokens = cleanTokens(item.title || '');
        for (const token of tokens) if (titleTokens.includes(token)) score += 3;
        return score;
      };
      const scored = knowledge.map((it) => ({ item: it, score: scoreItem(it) }));
      scored.sort((a, b) => b.score - a.score);
      const topMatches = scored.filter((e) => e.score > 0).slice(0, 3).map((e) => e.item);
      if (topMatches.length === 0) {
        return 'Saya belum menemukan jawaban spesifik dari portfolio ini. Coba tanya: “skills apa saja?”, “project utama apa?”, atau “pengalaman kerja di mana?”.';
      }
      const bullets = topMatches.map((it) => `• ${it.title}: ${it.summary}`).join('\n');
      return `Berdasarkan portfolio ini, berikut info yang relevan:\n${bullets}`;
    } catch (err) {
      return null;
    }
  };
  useEffect(() => {
    localStorage.setItem('assistant_chat', JSON.stringify(messages));
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const send = async (e) => {
    e && e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const r = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      let reply = null;
      try {
        const data = await r.json();
        if (r.ok) reply = data.reply || 'Maaf, saya tidak dapat menjawab sekarang.';
        else reply = data.hint || null;
      } catch (err) {
        reply = null;
      }

      if (!reply) {
        // attempt local fallback using knowledge.json
        const fb = await fallbackReplyFromKnowledge(userMsg.text);
        reply = fb || friendlyFallback;
      }

      const botMsg = { role: 'assistant', text: reply, ts: Date.now() };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      // On network error, try local fallback first
      const fb = await fallbackReplyFromKnowledge(userMsg.text);
      setMessages(prev => [...prev, { role: 'assistant', text: fb || friendlyFallback, ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('assistant_chat');
  };

  return (
    <>
      {/* Bottom-right container (LinkedIn-style) */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">

        {/* Chat box (expands upward) */}
        <div className={`mb-4 transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`} style={{ width: '24rem', maxWidth: 'calc(100vw - 1.5rem)' }}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[32rem]">
            <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">AI</div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 text-base">Assistant</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Ask about this portfolio</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearChat} className="text-sm text-slate-500 hover:text-slate-700">Clear</button>
                <button onClick={() => setOpen(false)} className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">✕</button>
              </div>
            </div>

            <div ref={listRef} className="flex-1 p-5 overflow-auto space-y-4 bg-transparent pb-32">
              {messages.length === 0 && (
                <div className="text-sm leading-relaxed text-slate-500">Hi! Ask me about the portfolio (projects, skills, experience).</div>
              )}

              {/* Suggested question chips for quick queries */}
              <div className="flex flex-wrap gap-2.5">
                <button onClick={async () => { setInput('skills apa saja?'); await new Promise(r=>setTimeout(r,50)); send(); }} className="text-xs px-3.5 py-1.5 bg-slate-700 text-white rounded-full">skills apa saja?</button>
                <button onClick={async () => { setInput('project utama apa?'); await new Promise(r=>setTimeout(r,50)); send(); }} className="text-xs px-3.5 py-1.5 bg-slate-700 text-white rounded-full">project utama apa?</button>
                <button onClick={async () => { setInput('pengalaman kerja di mana?'); await new Promise(r=>setTimeout(r,50)); send(); }} className="text-xs px-3.5 py-1.5 bg-slate-700 text-white rounded-full">pengalaman kerja di mana?</button>
              </div>
              {messages.map((m, idx) => (
                <div key={idx} className={`max-w-full ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`${m.role === 'user' ? 'inline-block bg-primary-600 text-white' : 'inline-block bg-slate-800/70 dark:bg-slate-800 text-slate-100'} px-4 py-3 rounded-xl leading-relaxed`}>{m.text}</div>
                </div>
              ))}
              {loading && <div className="text-left"><div className="inline-block bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-xl">...</div></div>}
            </div>

            <form onSubmit={send} className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 sticky bottom-0 bg-white/5 dark:bg-slate-900/95" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
              <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask a question..." className="flex-1 px-4 py-3 rounded-xl border border-slate-700 dark:border-slate-700 bg-slate-800 text-slate-100 placeholder-slate-400" />
              <button type="submit" disabled={loading || !input.trim()} className="ml-1 px-5 py-3 bg-primary-600 text-white rounded-xl disabled:opacity-50">Send</button>
            </form>
          </div>
        </div>

        {/* Collapsed bar (icon + name) */}
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-900/95 text-white shadow-lg hover:shadow-2xl transition-all"
          aria-label="Toggle Assistant"
        >
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">AI</div>
          <div className="hidden sm:block text-base font-medium">Assistant</div>
          <svg className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </>
  );
}
