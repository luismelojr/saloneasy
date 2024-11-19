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
