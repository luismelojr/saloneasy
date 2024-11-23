export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Toast {
    duration: number;
    text: string;
    type: string;
    description: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        toasts: Toast[];
    };
};

export interface ScheduleInterface {
    id: number;
    starts_at: string;
    ends_at: string;
    monday_starts_at: string;
    monday_ends_at: string;
    tuesday_starts_at: string;
    tuesday_ends_at: string;
    wednesday_starts_at: string;
    wednesday_ends_at: string;
    thursday_starts_at: string;
    thursday_ends_at: string;
    friday_starts_at: string;
    friday_ends_at: string;
    saturday_starts_at: string;
    saturday_ends_at: string;
    sunday_starts_at: string;
    sunday_ends_at: string;
}

export interface ServiceInterface {
    id: number;
    name: string;
    image_url: string;
    price: number;
    duration: number;
    description?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ServiceAndPaginationInterface {
    data: ServiceInterface[];
    perPage: number;
    current_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
}

export interface ClientInterface {
    id: number;
    name: string;
    phone: string;
    birth_date: string;
    created_at: string;
    updated_at: string;
}

interface MetaInterface {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface ClientAndPaginationInterface {
    data: ClientInterface[];
    meta: MetaInterface;
}

export interface DayProps {
    title: string;
    start: string;
    end: string;
    isActive: boolean;
    fieldStart: string;
    fieldEnd: string;
}

export type ScheduleFieldsProps =
    | 'monday_starts_at'
    | 'monday_ends_at'
    | 'tuesday_starts_at'
    | 'tuesday_ends_at'
    | 'wednesday_starts_at'
    | 'wednesday_ends_at'
    | 'thursday_starts_at'
    | 'thursday_ends_at'
    | 'friday_starts_at'
    | 'friday_ends_at'
    | 'saturday_starts_at'
    | 'saturday_ends_at'
    | 'sunday_starts_at'
    | 'sunday_ends_at';
