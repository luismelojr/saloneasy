export interface ServiceFormInterface {
    name: string;
    description: string;
    image: File | null | string;
    price: string | number;
    duration: number | string;
}
