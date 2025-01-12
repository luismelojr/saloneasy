import { cn } from '@/lib/utils';
import { SlotInterface } from '@/types';

interface ButtonSelectorProps {
    onSelectSlot: (slot: SlotInterface) => void;
    slot: SlotInterface;
    activeSlot: boolean;
}
export default function ButtonSelector({
    onSelectSlot,
    slot,
    activeSlot,
}: ButtonSelectorProps) {
    return (
        <button
            className={cn(
                `h-12 rounded-md border-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white ${activeSlot ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-500'}`,
            )}
            onClick={() => onSelectSlot(slot)}
        >
            <span>{slot.time}</span>
        </button>
    );
}
