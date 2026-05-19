import { Link } from '@/Components/Link';
import { Head } from '@/Components/Head';
import { useEffect, useState } from 'react';
import {
    LayoutDashboard, FolderKanban, Briefcase, Cpu, User, MessageSquare,
    ChevronLeft, ChevronRight, LogOut, Code2, Bell, Menu, X
} from 'lucide-react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { href: '/admin/experiences', label: 'Experience', icon: Briefcase },
    { href: '/admin/skills', label: 'Skills', icon: Cpu },
    { href: '/admin/about', label: 'About Me', icon: User },
    { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export default function AdminLayout({ children, title = 'Admin' }) {
    const { url, props } = usePage();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('portfolio_theme');
        const isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const isActive = (item) => item.exact ? url === item.href : url.startsWith(item.href);

    const handleLogout = () => router.post('/logout');

    return (
        <>
            <Head title={`${title} — Admin`} />
            <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300
                    ${collapsed ? 'w-16' : 'w-64'}
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-700">
                        {!collapsed && (
                            <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                                <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                                    <Code2 size={14} className="text-white"/>
                                </div>
                                Admin
                            </Link>
                        )}
                        <button onClick={() => setCollapsed(!collapsed)}
                            className="ml-auto btn-ghost p-1.5 rounded-lg hidden lg:flex">
                            {collapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
                        </button>
                        <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden btn-ghost p-1.5">
                            <X size={16}/>
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                        {navItems.map(item => (
                            <Link key={item.href} href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150
                                    ${isActive(item)
                                        ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <item.icon size={18} className="shrink-0"/>
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                        <button onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            <LogOut size={18}/>
                            {!collapsed && 'Log Out'}
                        </button>
                    </div>
                </aside>

                {/* Main */}
                <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
                    {/* Top bar */}
                    <header className="sticky top-0 z-30 h-16 flex items-center px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                        <button onClick={() => setMobileOpen(true)} className="lg:hidden btn-ghost p-2 mr-2">
                            <Menu size={20}/>
                        </button>
                        <h1 className="font-bold text-slate-900 dark:text-white flex-1">{title}</h1>
                        <div className="flex items-center gap-2">
                            <Link href="/" className="btn-ghost text-xs">← View Site</Link>
                            <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                                {props.auth?.user?.name || 'Admin'}
                            </span>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                        {children}
                    </main>
                </div>

                {/* Mobile overlay */}
                {mobileOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)}/>}
            </div>
        </>
    );
}
