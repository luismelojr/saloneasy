import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/layouts/components/tooltip';
import { icons } from '@/components/layouts/default-items/default-items';
import { ItemProps } from '@/components/layouts/types/MainMenuTypes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { motion, Reorder, useMotionValue } from 'framer-motion';
import { X } from 'lucide-react';

export const Item = ({
    item,
    isActive,
    isCustomizing,
    onRemove,
    disableRemove,
    onDragEnd,
    onSelect,
}: ItemProps) => {
    const y = useMotionValue(0);
    const Icon = icons[item.path];

    return (
        <TooltipProvider delayDuration={70}>
            <Link
                href={route(item.route)}
                onClick={(evt) => {
                    if (isCustomizing) {
                        evt.preventDefault();
                    }
                    onSelect?.();
                }}
                onMouseDown={(evt) => {
                    if (isCustomizing) {
                        evt.preventDefault();
                    }
                }}
            >
                <Tooltip>
                    <TooltipTrigger className={'w-full'} asChild>
                        <Reorder.Item
                            onDragEnd={onDragEnd}
                            key={item.path}
                            value={item}
                            id={item.path}
                            style={{ y }}
                            layoutRoot
                            className={cn(
                                'relative flex h-[45px] items-center border border-transparent md:w-[45px] md:justify-center',
                                'text-white hover:rounded-md hover:border-[#DCDAD2] hover:bg-accent hover:text-primary hover:dark:border-[#2C2C2C]',
                                isActive &&
                                    'rounded-md border-[#DCDAD2] bg-[#F2F1EF] text-primary dark:border-[#2C2C2C] dark:bg-secondary',
                                isCustomizing &&
                                    'border-[#DCDAD2] bg-background dark:border-[#2C2C2C]',
                            )}
                        >
                            <motion.div
                                className={'relative'}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {!disableRemove && isCustomizing && (
                                    <Button
                                        onClick={() => onRemove(item.path)}
                                        variant="ghost"
                                        size="icon"
                                        className={
                                            'absolute -left-4 -top-4 z-10 h-4 w-4 rounded-full bg-border p-0 transition-all hover:scale-150 hover:bg-border'
                                        }
                                    >
                                        <X className={'h-3 w-3'} />
                                    </Button>
                                )}

                                <div
                                    className={cn(
                                        'flex items-center space-x-3 p-0 pl-2 md:pl-0',
                                        isCustomizing &&
                                            'pointer-events-none transform-gpu animate-[swing_0.3s_ease-in-out_infinite]',
                                    )}
                                >
                                    <Icon />
                                    <span className="flex md:hidden">
                                        {item.name}
                                    </span>
                                </div>
                            </motion.div>
                        </Reorder.Item>
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        className="hidden px-3 py-1.5 text-xs md:flex"
                        sideOffset={16}
                    >
                        {item.name}
                    </TooltipContent>
                </Tooltip>
            </Link>
        </TooltipProvider>
    );
};
