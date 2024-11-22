import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Plus } from 'lucide-react';

interface ButtonPlusProps {
    title: string;
    route: string;
    isAction: 'create' | 'back';
}
export default function ButtonAction({
    title,
    route,
    isAction,
}: ButtonPlusProps) {
    return (
        <Button variant={'outline'} size={'default'} asChild>
            <Link href={route}>
                {isAction === 'create' ? <Plus /> : <ArrowLeft />}
                <span>{title}</span>
            </Link>
        </Button>
    );
}
