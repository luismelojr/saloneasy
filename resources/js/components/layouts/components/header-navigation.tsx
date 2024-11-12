import MenuMobile from '@/components/layouts/components/menu-mobile';

export default function HeaderNavigation() {
    return (
        <div className={'flex items-center justify-between md:justify-end'}>
            <div className={'block md:hidden'}>
                <MenuMobile />
            </div>
            <div>User Menu</div>
        </div>
    );
}
