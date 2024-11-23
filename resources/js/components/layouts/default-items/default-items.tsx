import { BaggageClaim, LayoutDashboard, Users } from 'lucide-react';

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
    {
        route: 'clients.index',
        name: 'Clientes',
        path: '/clients',
        routeActive: ['clients.*'],
    },
];

export const icons: Record<string, any> = {
    '/dashboard': () => <LayoutDashboard size={20} />,
    '/services': () => <BaggageClaim size={20} />,
    '/clients': () => <Users size={20} />,
};
