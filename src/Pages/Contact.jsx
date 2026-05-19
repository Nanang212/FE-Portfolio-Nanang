import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import { Link } from '@/Components/Link';
import { Head } from '@/Components/Head';
import { Send, Mail, MapPin } from 'lucide-react';
import { LinkedinIcon } from '@/Components/UI/SocialIcons';

export default function Contact() {
    const { t } = useTranslation();
    const flash = {};

    const data = { name: '', email: '', subject: '', message: '' };
    const setData = () => {};
    const post = () => {};
    const processing = false;
    const errors = {};
    const reset = () => {};
    const wasSuccessful = false;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    return (
        <PortfolioLayout title={t('contact.title')}>
            <div className="pt-16 section-padding">
                <div className="container-max max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-up">
                        <span className="badge-blue">{t('contact.subtitle')}</span>
                        <h1 className="section-title mt-4">{t('contact.title')}</h1>
                        <div className="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"/>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="animate-fade-up space-y-6">
                            <a href="mailto:nanangaditya2001@gmail.com"
                                className="card p-5 flex items-center gap-4 hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600">
                                    <Mail size={22}/>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">Email</p>
                                    <p className="text-primary-600 dark:text-primary-400 text-sm">nanangaditya2001@gmail.com</p>
                                </div>
                            </a>
                            <a href="https://www.linkedin.com/in/nanang-aditya/" target="_blank" rel="noopener noreferrer"
                                className="card p-5 flex items-center gap-4 hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600">
                                    <LinkedinIcon size={22}/>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">LinkedIn</p>
                                    <p className="text-primary-600 dark:text-primary-400 text-sm">linkedin.com/in/nanang-aditya</p>
                                </div>
                            </a>
                            <div className="card p-5 flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600">
                                    <MapPin size={22}/>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">Location</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Indonesia 🇮🇩</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="animate-fade-up animate-delay-200">
                            {(flash?.success || wasSuccessful) && (
                                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl text-green-700 dark:text-green-400 text-sm font-medium">
                                    ✓ {t('contact.success')}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            {t('contact.name')} *
                                        </label>
                                        <input
                                            className="input"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            {t('contact.email')} *
                                        </label>
                                        <input
                                            type="email"
                                            className="input"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t('contact.subject')}
                                    </label>
                                    <input
                                        className="input"
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        placeholder="Project Collaboration"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t('contact.message')} *
                                    </label>
                                    <textarea
                                        rows={5}
                                        className="input resize-none"
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder="Tell me about your project..."
                                    />
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <button type="submit" disabled={processing} className="btn-primary w-full justify-center">
                                    {processing ? t('contact.sending') : t('contact.send')}
                                    <Send size={16}/>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
