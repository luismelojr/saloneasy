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
