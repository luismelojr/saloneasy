import {
    BaggageClaim,
    CalendarClock,
    LayoutDashboard,
    Users,
} from 'lucide-react';

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
    {
        route: 'hours.schedules.show',
        name: 'Horários de atendimento',
        path: '/hours-schedules',
        routeActive: ['hours.schedules.show'],
    },
];

export const icons: Record<string, any> = {
    '/dashboard': () => <LayoutDashboard size={20} />,
    '/services': () => <BaggageClaim size={20} />,
    '/clients': () => <Users size={20} />,
    '/hours-schedules': () => <CalendarClock size={20} />,
};
