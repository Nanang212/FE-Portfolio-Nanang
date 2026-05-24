import fs from 'fs';
import path from 'path';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'openai/gpt-4o-mini';

function cleanTokens(value, stopwords) {
  return (value || '')
    .toLowerCase()
    .split(/\W+/)
    .filter(Boolean)
    .filter((token) => !stopwords.has(token));
}

function scoreKnowledge(message, knowledge) {
  const stopwords = new Set(['yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'the', 'a', 'an', 'is', 'are']);
  const normalize = (value) => (value || '').toLowerCase();
  const tokens = cleanTokens(message, stopwords);

  const scoreItem = (item) => {
    const text = normalize(`${item.title} ${item.summary} ${item.text}`);
    let score = 0;

    for (const token of tokens) {
      if (text.includes(token)) score += 2;
    }

    const titleTokens = cleanTokens(item.title || '', stopwords);
    for (const token of tokens) {
      if (titleTokens.includes(token)) score += 3;
    }

    return score;
  };

  return knowledge
    .map((item) => ({ item, score: scoreItem(item) }))
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0)
    .slice(0, 3)
    .map((entry) => entry.item);
}

function buildKnowledgeContext(topMatches) {
  if (!topMatches.length) return '';

  return topMatches
    .map((item) => `- ${item.title}: ${item.summary}`)
    .join('\n');
}

// Try calling OpenRouter (OpenAI-compatible) if an API key is provided via
// the environment variable `OPENROUTER_API_KEY`. This keeps keys server-side
// and avoids exposing them to the browser.
async function callOpenRouter(message, knowledgeContext) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return null;

  try {
    const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
    const siteUrl = process.env.OPENROUTER_SITE_URL || 'http://localhost:5173';
    const appName = process.env.OPENROUTER_APP_NAME || 'Portfolio Assistant';

    const messages = [
      {
        role: 'system',
        content:
          'You are a helpful AI assistant for a personal portfolio website. Answer in the same language as the user when possible. Use only the provided portfolio context for factual claims. If the context is insufficient, say that you are not sure and suggest a relevant follow-up question.',
      },
    ];

    if (knowledgeContext) {
      messages.push({
        role: 'system',
        content: `Portfolio context:\n${knowledgeContext}`,
      });
    }

    messages.push({ role: 'user', content: message });

    const res = await fetch(OPENROUTER_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        'HTTP-Referer': siteUrl,
        'X-Title': appName,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 512,
        temperature: 0.2,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('OpenRouter error', data);
      return null;
    }

    // Try common response shapes
    const reply = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || data?.result || null;
    return reply;
  } catch (err) {
    console.error('OpenRouter request failed', err);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST' });

  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Message required' });

  const dataPath = path.resolve(process.cwd(), 'public/data/knowledge.json');
  let knowledge = [];

  try {
    knowledge = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (error) {
    console.error('failed to load knowledge', error);
    return res.status(500).json({ error: 'Knowledge base not available' });
  }

  const isGreeting = /(halo|hai|hi|hello|pagi|siang|sore|malam)/i.test(message);
  const isThanks = /(makasih|terima kasih|thanks|thank you)/i.test(message);

  if (isGreeting) {
    return res.status(200).json({
      reply: 'Halo! Saya bisa bantu jelaskan portfolio ini. Kamu bisa tanya tentang skills, projects, experience, atau profile singkat.',
      source: [],
    });
  }

  if (isThanks) {
    return res.status(200).json({
      reply: 'Sama-sama! Kalau mau, lanjut tanya soal tech stack, project utama, atau pengalaman kerja ya.',
      source: [],
    });
  }

  const topMatches = scoreKnowledge(message, knowledge);

  // If OpenRouter is configured, let it generate the final answer using the
  // matched portfolio context. If the request fails, we fall back to the local
  // retrieval response below.
  const knowledgeContext = buildKnowledgeContext(topMatches);
  const openRouterReply = await callOpenRouter(message, knowledgeContext);
  if (openRouterReply) {
    return res.status(200).json({ reply: openRouterReply, source: ['openrouter'] });
  }

  if (topMatches.length === 0) {
    return res.status(200).json({
      reply: 'Saya belum menemukan jawaban spesifik dari portfolio ini. Coba tanya: “skills apa saja?”, “project utama apa?”, atau “pengalaman kerja di mana?”.',
      source: [],
    });
  }

  const bullets = topMatches
    .map((item) => `• ${item.title}: ${item.summary}`)
    .join('\n');

  const reply = `Berdasarkan portfolio ini, berikut info yang relevan:\n${bullets}`;
  return res.status(200).json({ reply, source: topMatches.map((item) => item.id) });
}
