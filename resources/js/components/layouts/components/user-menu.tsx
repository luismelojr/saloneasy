import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';

export default function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar
                    className={'h-8 w-8 cursor-pointer border outline-none'}
                >
                    {/*<AvatarImage*/}
                    {/*    src={*/}
                    {/*        'http://saloneasy.test/storage/avatars/JD0jnyNSI7p8quvDzOUwcTObRN1gSMMwELh1Wl7d.jpg'*/}
                    {/*    }*/}
                    {/*/>*/}
                    <AvatarFallback>
                        <span className="text-xs text-foreground">LH</span>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[240px]"
                sideOffset={10}
                align="end"
            >
                <DropdownMenuLabel>
                    <div className={'flex flex-col'}>
                        <span className={'truncate'}>Luis Henrique</span>
                        <span
                            className={
                                'truncate text-xs font-normal text-[#606060] dark:text-[#a0a0a0]'
                            }
                        >
                            junimhs10@gmail.com
                        </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={'cursor-pointer'} asChild>
                    <Link
                        href={route('logout')}
                        method={'post'}
                        as={'button'}
                        className={'w-full'}
                    >
                        Sair
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
