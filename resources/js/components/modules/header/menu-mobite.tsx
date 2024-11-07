import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

export default function MenuMobile() {
    return (
        <Sheet>
            <SheetTrigger>
                <Button
                    className={'block md:hidden'}
                    variant={'ghost'}
                    size={'lg'}
                >
                    <MenuIcon className={'!h-6 !w-6'} />
                </Button>
            </SheetTrigger>
        </Sheet>
    );
}
