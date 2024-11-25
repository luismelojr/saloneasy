import { usePage } from '@inertiajs/react';

export default function useUser() {
    const { user } = usePage().props.auth;

    return user;
}
