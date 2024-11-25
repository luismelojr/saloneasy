import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUser from '@/hooks/useUser';
import { formatStringAvatar } from '@/utils/formatString';
import { Link } from '@inertiajs/react';

export default function UserMenu() {
    const user = useUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar
                    className={'h-8 w-8 cursor-pointer border outline-none'}
                >
                    {user.avatar_url && <AvatarImage src={user.avatar_url} />}
                    <AvatarFallback>
                        <span className="text-xs text-foreground">
                            {formatStringAvatar(user.name)}
                        </span>
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
                        <span className={'truncate'}>{user.name}</span>
                        <span
                            className={
                                'truncate text-xs font-normal text-[#606060] dark:text-[#a0a0a0]'
                            }
                        >
                            {user.email}
                        </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuItem className={'cursor-pointer'} asChild>
                    <Link href={route('profile.index')} className={'w-full'}>
                        Editar perfil
                    </Link>
                </DropdownMenuItem>
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
