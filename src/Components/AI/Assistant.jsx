import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('assistant_chat') || '[]');
    } catch { return []; }
  });
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const friendlyFallback =
    'Asisten saat ini merespons berdasarkan basis data portfolio. Anda dapat menanyakan tentang "proyek utama apa saja", "keahlian teknis", atau "pengalaman di Jasa Marga".';

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
        return 'Informasi spesifik belum ditemukan di database ringkas. Anda dapat menanyakan: "skills", "proyek utama", atau "pengalaman kerja".';
      }
      const bullets = topMatches.map((it) => `• ${it.title}: ${it.summary}`).join('\n');
      return `Berdasarkan arsip teknis portfolio ini:\n${bullets}`;
    } catch {
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
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const r = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });
      let reply = null;
      try {
        const data = await r.json();
        if (r.ok) reply = data.reply || null;
        else reply = data.hint || null;
      } catch {
        reply = null;
      }

      if (!reply) {
        const fb = await fallbackReplyFromKnowledge(userMsg.text);
        reply = fb || friendlyFallback;
      }

      const botMsg = { role: 'assistant', text: reply, ts: Date.now() };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fb = await fallbackReplyFromKnowledge(userMsg.text);
      setMessages((prev) => [...prev, { role: 'assistant', text: fb || friendlyFallback, ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('assistant_chat');
  };

  return (
    <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 flex flex-col items-end">
      {/* Expanded Dialog Box */}
      {open && (
        <div
          className="mb-3 w-[22rem] sm:w-[24rem] max-w-[calc(100vw-2rem)] bg-[var(--surface)] border border-[var(--border)] shadow-2xl flex flex-col h-[26rem] sm:h-[32rem] rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
          role="dialog"
          aria-label="Assistant Inquiry"
        >
          {/* Header */}
          <div className="p-4 border-b border-[var(--border)] bg-[var(--surface-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="stamp-tag font-mono text-[10px]">INDEX QUERY</span>
              <span className="font-editorial-title text-xl text-[var(--ink)]">ASSISTANT</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearChat}
                className="text-xs font-mono text-[var(--ink)] hover:underline"
              >
                Clear
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)]"
                aria-label="Close Assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Conversation List */}
          <div ref={listRef} className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
            {messages.length === 0 && (
              <p className="text-[var(--ink-muted)] font-editorial-serif text-sm italic">
                Tanyakan ringkasan sistem, teknologi backend yang digunakan, atau riwayat kerja Nanang Aditya.
              </p>
            )}

            {/* Quick chips */}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['skills apa saja?', 'project utama apa?', 'pengalaman kerja di mana?'].map((q) => (
                  <button
                    key={q}
                    onClick={async () => {
                      setInput(q);
                      setTimeout(() => send(), 60);
                    }}
                    className="px-2 py-1 bg-[var(--surface-subtle)] border border-[var(--border-subtle)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors text-[11px] rounded"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-[var(--ink-faint)] uppercase mb-1">
                  {m.role === 'user' ? 'YOU' : 'ARCHIVE BOT'}
                </span>
                <div
                  className={`p-3 max-w-[90%] whitespace-pre-wrap leading-relaxed rounded-lg ${
                    m.role === 'user'
                      ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                      : 'bg-[var(--surface-subtle)] text-[var(--ink)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-left text-[var(--ink-faint)] animate-pulse">
                Mencari catatan arsip...
              </div>
            )}
          </div>

          {/* Input form */}
          <form
            onSubmit={send}
            className="p-3 border-t border-[var(--border)] bg-[var(--surface)] flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan..."
              className="flex-1 px-3 py-2 text-xs bg-[var(--surface-subtle)] text-[var(--ink)] border border-[var(--border-subtle)] rounded outline-none focus:border-[var(--accent)]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary !p-2 disabled:opacity-40 rounded"
              aria-label="Send Query"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="group relative flex items-center justify-center gap-2 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] hover:opacity-95 shadow-lg shadow-emerald-950/25 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        aria-label="Toggle Portfolio Assistant"
        title="Portfolio Assistant"
      >
        {/* Pulsing beacon dot (visible when closed) */}
        {!open && (
          <span className="absolute top-0 right-0 sm:top-1 sm:right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-white" />
          </span>
        )}

        {open ? (
          <X size={20} className="transition-transform duration-200" />
        ) : (
          <MessageSquare size={19} className="transition-transform duration-200 group-hover:scale-110" />
        )}
        <span className="hidden sm:inline font-mono font-bold tracking-wider text-[11px]">
          ASSISTANT
        </span>
      </button>
    </div>
  );
}
