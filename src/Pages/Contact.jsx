import React, { useState } from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import { Send, Mail, MapPin } from 'lucide-react';
import { LinkedinIcon } from '@/Components/UI/SocialIcons';

export default function Contact() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoUrl = `mailto:nanangaditya2001@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
        window.location.href = mailtoUrl;
        setSent(true);
    };

    return (
        <PortfolioLayout title={t('contact.title')}>
            <div className="pt-28 sm:pt-36 pb-20">
                <div className="container-max max-w-4xl">
                    {/* Header */}
                    <div className="mb-14">
                        <h1 className="font-editorial-title text-5xl sm:text-7xl text-[var(--ink)] leading-none tracking-tight">
                            {t('contact.title')}
                        </h1>
                        <p className="font-editorial-serif text-lg sm:text-xl text-[var(--ink-muted)] mt-2 italic">
                            {lang === 'id'
                                ? 'Kirimkan pesan untuk kolaborasi proyek, diskusi teknis, atau peluang karir.'
                                : 'Send a message for project collaborations, technical discussions, or opportunities.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-12 gap-10 items-start">
                        {/* Direct Coordinates */}
                        <div className="md:col-span-5 space-y-4">
                            <div className="p-8 bg-[var(--surface)] space-y-5 text-sm">
                                <p className="uppercase tracking-wider font-semibold text-xs text-[var(--ink-faint)]">
                                    Kontak Langsung
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs text-[var(--ink-faint)] block mb-1">Email</span>
                                        <a
                                            href="mailto:nanangaditya2001@gmail.com"
                                            className="text-base font-medium text-[var(--ink)] hover:text-[var(--accent)] hover:underline flex items-center gap-2"
                                        >
                                            <Mail size={16} /> nanangaditya2001@gmail.com
                                        </a>
                                    </div>

                                    <div>
                                        <span className="text-xs text-[var(--ink-faint)] block mb-1">LinkedIn</span>
                                        <a
                                            href="https://www.linkedin.com/in/nanang-aditya/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-base font-medium text-[var(--ink)] hover:text-[var(--accent)] hover:underline flex items-center gap-2"
                                        >
                                            <LinkedinIcon size={16} /> in/nanang-aditya
                                        </a>
                                    </div>

                                    <div>
                                        <span className="text-xs text-[var(--ink-faint)] block mb-1">Lokasi</span>
                                        <span className="text-base font-medium text-[var(--ink)] flex items-center gap-2">
                                            <MapPin size={16} /> Jakarta, Indonesia
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message Dispatch Form */}
                        <div className="md:col-span-7">
                            <form
                                onSubmit={handleSubmit}
                                className="p-8 bg-[var(--surface)] space-y-5"
                            >
                                {sent && (
                                    <div className="p-4 bg-[var(--surface-subtle)] text-sm text-[var(--ink)]">
                                        &check; {t('contact.success')}
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ink-faint)]">
                                        {t('contact.name')} *
                                    </label>
                                    <input
                                        required
                                        className="input"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Nama Lengkap"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ink-faint)]">
                                        {t('contact.email')} *
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        className="input"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="email@domain.com"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ink-faint)]">
                                        {t('contact.subject')}
                                    </label>
                                    <input
                                        className="input"
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        placeholder="Diskusi Proyek / Arsitektur"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ink-faint)]">
                                        {t('contact.message')} *
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="input resize-none"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder="Tuliskan pesan Anda..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary w-full"
                                >
                                    <span>{t('contact.send')}</span>
                                    <Send size={15} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
