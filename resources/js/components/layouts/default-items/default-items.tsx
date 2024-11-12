import { LayoutDashboard } from 'lucide-react';

export const defaultItems = [
    {
        route: 'dashboard',
        name: 'Dashboard',
        path: '/dashboard',
        routeActive: ['dashboard'],
    },
];

export const icons: Record<string, any> = {
    '/dashboard': () => <LayoutDashboard size={24} />,
};
