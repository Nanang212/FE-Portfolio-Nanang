import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';

const staticSkills = [
    { id:1,  category:'Backend',  name:'Laravel'      },
    { id:2,  category:'Backend',  name:'Express.js'   },
    { id:3,  category:'Backend',  name:'Node.js'      },
    { id:4,  category:'Backend',  name:'Spring Boot'  },
    { id:5,  category:'DevOps',   name:'Docker'       },
    { id:6,  category:'DevOps',   name:'GitLab CI/CD' },
    { id:7,  category:'DevOps',   name:'Nginx'        },
    { id:16, category:'DevOps',   name:'cPanel'       },
    { id:8,  category:'Storage',  name:'MinIO'        },
    { id:9,  category:'Storage',  name:'AWS S3'       },
    { id:10, category:'Cache',    name:'Redis'        },
    { id:11, category:'Database', name:'MySQL'        },
    { id:12, category:'Database', name:'PostgreSQL'   },
    { id:13, category:'Frontend', name:'React.js'     },
    { id:14, category:'Frontend', name:'Inertia.js'   },
    { id:15, category:'Frontend', name:'TailwindCSS'  },
];

const categoryIcon = {
    Backend: '⚙️', DevOps: '🐳', Storage: '🗄️', Cache: '⚡', Database: '🗃️', Frontend: '🎨',
};

export default function Skills({ skills }) {
    const { t } = useTranslation();
    const data = (skills && skills.length > 0) ? skills : staticSkills;
    const groups = {};
    data.forEach(s => { (groups[s.category] = groups[s.category] || []).push(s); });

    return (
        <PortfolioLayout title={t('skills.title')}>
            <div className="pt-16 section-padding">
                <div className="container-max">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-up">
                        <span className="badge-blue">{t('skills.subtitle')}</span>
                        <h1 className="section-title mt-4">{t('skills.title')}</h1>
                        <div className="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"/>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(groups).map(([category, items], ci) => (
                            <div key={category} className="card p-6 animate-fade-up" style={{ animationDelay: `${ci * 80}ms` }}>
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="text-2xl">{categoryIcon[category] || '🔧'}</span>
                                    <h2 className="font-bold text-slate-900 dark:text-white text-lg">{category}</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {items.map(skill => (
                                        <span
                                            key={skill.id}
                                            className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
