import { BaggageClaim, LayoutDashboard } from 'lucide-react';

export const defaultItems = [
    {
        route: 'dashboard',
        name: 'Dashboard',
        path: '/dashboard',
        routeActive: ['dashboard'],
    },
    {
        route: 'login',
        name: 'Serviços',
        path: '/services',
        routeActive: ['login'],
    },
];

export const icons: Record<string, any> = {
    '/dashboard': () => <LayoutDashboard size={24} />,
    '/services': () => <BaggageClaim size={24} />,
};
