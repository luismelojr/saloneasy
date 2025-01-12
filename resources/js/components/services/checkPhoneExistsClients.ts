import axios from 'axios';

export default async function checkPhoneExistsClients(
    phone: string,
): Promise<boolean | undefined> {
    try {
        const { data } = await axios.post<{ exists: boolean }>(
            route('clients.exist.phone'),
            {
                phone,
            },
        );

        return data?.exists;
    } catch (e) {
        console.log(e);
    }
}
