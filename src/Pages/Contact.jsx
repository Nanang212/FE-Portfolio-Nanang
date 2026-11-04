import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import ContactSection from '@/Components/Portfolio/ContactSection';

export default function Contact() {
    const { t } = useTranslation();

    return (
        <PortfolioLayout title={t('contact.title')}>
            <ContactSection isStandalonePage={true} />
        </PortfolioLayout>
    );
}