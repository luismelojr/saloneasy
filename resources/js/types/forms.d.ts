export interface ServiceFormInterface {
    name: string;
    description: string;
    image: File | null | string;
    price: string | number;
    duration: number | string;
}

export interface ClientFormInterface {
    name: string;
    phone: string;
    birth_date: string | Date;
}

export interface ScheduleExclusionFormInterface {
    date: Date | undefined;
    starts_at: string;
    ends_at: string;
    reason: string;
}

export interface ConfigFormInterface {
    avatar: File | null | string;
    banner_image: File | null | string;
    bio: string;
    color_primary: string;
    color_secondary: string;
}
