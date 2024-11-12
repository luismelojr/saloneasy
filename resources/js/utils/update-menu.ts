import Cookies from 'js-cookie';

export const updateMenu = async (
    items: { route: string; name: string; path: string }[],
) => {
    await Cookies.set('menu-list', JSON.stringify(items));
};
