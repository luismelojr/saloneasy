import { Scissors } from 'lucide-react';

export default function Logo() {
    return (
        <div className={'flex items-center gap-2'}>
            <div className="flex h-8 w-8 transform items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg transition-transform duration-300 hover:scale-105">
                <Scissors className="h-4 w-4 text-white" />
            </div>
            <span className={'text-[18px] text-foreground'}>Saloneasy</span>
        </div>
    );
}
