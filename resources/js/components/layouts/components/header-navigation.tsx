import MenuMobile from '@/components/layouts/components/menu-mobile';
import UserMenu from '@/components/layouts/components/user-menu';

export default function HeaderNavigation() {
    return (
        <div className={'flex items-center justify-between md:justify-end'}>
            <div className={'block md:hidden'}>
                <MenuMobile />
            </div>
            <div>
                <UserMenu />
            </div>
        </div>
    );
}
