export interface SingleItemProps {
    route: string;
    name: string;
    path: string;
    routeActive: Array<string>;
}
export interface MainMenuProps {
    initialItems?: SingleItemProps[];
    onSelect?: () => void;
}

export interface SingleItemProps {
    route: string;
    name: string;
    path: string;
    routeActive: Array<string>;
}

export interface ItemProps {
    item: SingleItemProps;
    isActive: boolean;
    isCustomizing: boolean;
    onRemove: (path: string) => void;
    disableRemove: boolean;
    onDragEnd: () => void;
    onSelect?: () => void;
}
