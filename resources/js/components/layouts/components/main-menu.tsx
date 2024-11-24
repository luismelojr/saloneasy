import { Item } from '@/components/layouts/components/item';
import {
    defaultItems,
    icons,
} from '@/components/layouts/default-items/default-items';
import {
    MainMenuProps,
    SingleItemProps,
} from '@/components/layouts/types/MainMenuTypes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { updateMenu } from '@/utils/update-menu';
import { useClickAway } from '@uidotdev/usehooks';
import { Reorder, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useLongPress } from 'use-long-press';

const listVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
        },
    },
};

const itemVariant = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

export default function MainMenu({ initialItems, onSelect }: MainMenuProps) {
    const [items, setItems] = useState(
        initialItems !== undefined
            ? initialItems.length > 0
                ? initialItems
                : defaultItems
            : defaultItems,
    );
    const [isCustomizing, setIsCustomizing] = useState(false);
    const hiddenItems = defaultItems.filter(
        (item) => !items.some((i) => i.path === item.path),
    );

    const onReorder = (items: SingleItemProps[]) => {
        setItems(items);
    };

    const onDragEnd = async () => {
        await updateMenu(items);
    };

    const onRemove = async (path: string) => {
        setItems(items.filter((item) => item.path !== path));
        await updateMenu(items.filter((item) => item.path !== path));
    };

    const onAdd = async (item: SingleItemProps) => {
        setItems([...items, item]);
        await updateMenu([...items, item]);
    };

    const bind = useLongPress(
        () => {
            setIsCustomizing(true);
        },
        {
            cancelOnMovement: 0,
        },
    );

    const ref = useClickAway(() => {
        setIsCustomizing(false);
    });

    const isActivated = (routeName: Array<string>) => {
        const value = routeName.map((item) => {
            return route().current(item);
        });

        return value.includes(true);
    };

    return (
        <div {...bind()} ref={ref as any}>
            <nav>
                <Reorder.Group
                    axis={'y'}
                    onReorder={onReorder}
                    values={items as SingleItemProps[]}
                    className={'flex flex-col gap-1.5'}
                >
                    {items.map((item) => {
                        return (
                            <Item
                                key={item.path}
                                item={item as SingleItemProps}
                                isActive={isActivated(item.routeActive)}
                                isCustomizing={isCustomizing}
                                onRemove={onRemove}
                                disableRemove={items.length === 1}
                                onDragEnd={onDragEnd}
                                onSelect={onSelect}
                            />
                        );
                    })}
                </Reorder.Group>
            </nav>
            {hiddenItems.length > 0 && isCustomizing && (
                <nav className={'mt-6 border-t-[1px] pt-6'}>
                    <motion.ul
                        variants={listVariant}
                        initial={'hidden'}
                        animate={'show'}
                        className={'flex flex-col gap-1.5'}
                    >
                        {hiddenItems.map((item) => {
                            const Icon = icons[item.path];

                            return (
                                <motion.li
                                    variants={itemVariant}
                                    key={item.path}
                                    className={cn(
                                        'flex h-[45px] w-[45px] items-center border border-transparent md:justify-center',
                                        'hover:border-[#DCDAD2] hover:bg-secondary hover:dark:border-[#2C2C2C]',
                                        'rounded-md border-[#DCDAD2] bg-background text-primary dark:border-[#2C2C2C]',
                                    )}
                                >
                                    <div className={'relative'}>
                                        <Button
                                            onClick={() => onAdd(item)}
                                            variant={'ghost'}
                                            size={'icon'}
                                            className={
                                                'absolute -left-4 -top-4 z-10 h-4 w-4 rounded-full bg-border p-0 transition-all hover:scale-150 hover:bg-border'
                                            }
                                        >
                                            <Plus className={'h-3 w-3'} />
                                        </Button>
                                        <Icon />
                                    </div>
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </nav>
            )}
        </div>
    );
}
