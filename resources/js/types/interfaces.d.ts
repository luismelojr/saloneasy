export interface ServiceGlobalInterface {
    id: number;
    name: string;
    price: number | string;
    description: string;
    duration: number;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    image_url: string | null;
}
