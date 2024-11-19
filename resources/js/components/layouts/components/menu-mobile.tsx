import MainMenu from '@/components/layouts/components/main-menu';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from '@inertiajs/react';
import { CalendarClock, Menu } from 'lucide-react';
import { useState } from 'react';

export default function MenuMobile() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={() => setIsOpen(!isOpen)}
                    className={
                        'relative flex h-8 w-8 items-center rounded-full'
                    }
                >
                    <Menu size={16} />
                </Button>
            </SheetTrigger>
            <SheetContent
                side={'left'}
                className={'-ml-2 rounded-none border-none bg-primary'}
            >
                <SheetTitle asChild>
                    <Link
                        href={route('login')}
                        className="flex items-center gap-2 text-xl text-white"
                    >
                        <CalendarClock size={20} />
                        Saloneasy
                    </Link>
                </SheetTitle>
                <SheetDescription asChild>
                    <div className={'-ml-2 mt-10'}>
                        <MainMenu onSelect={() => setIsOpen(false)} />
                    </div>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}
