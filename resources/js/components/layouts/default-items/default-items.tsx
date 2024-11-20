import { BaggageClaim, LayoutDashboard } from 'lucide-react';

export const defaultItems = [
    {
        route: 'dashboard',
        name: 'Dashboard',
        path: '/dashboard',
        routeActive: ['dashboard'],
    },
    {
        route: 'services.index',
        name: 'Serviços',
        path: '/services',
        routeActive: ['services.*'],
    },
];

export const icons: Record<string, any> = {
    '/dashboard': () => <LayoutDashboard size={22} />,
    '/services': () => <BaggageClaim size={22} />,
};
