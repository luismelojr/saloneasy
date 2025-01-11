import * as animationData from '@/components/animations/notfound.json';
import { ShoppingBag } from 'lucide-react';

export default function NotFound() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className={'flex flex-col gap-4 py-10'}>
            <ShoppingBag className={'mx-auto h-20 w-20 text-gray-500'} />
            <p className={'text-center text-xl text-gray-500'}>
                Nenhum dado encontrado
            </p>
        </div>
    );
}
