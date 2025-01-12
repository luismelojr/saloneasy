import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { SlotInterface } from '@/types';
import React from 'react';

interface SlotSelectorProps {
    loading: boolean;
    slots?: Record<string, SlotInterface>;
    selectedSlot?: string | null;
    onSelectSlot: (slot: SlotInterface) => void;
    skeletonCount?: number;
    className?: string;
}

export const SlotSelector: React.FC<SlotSelectorProps> = ({
    loading,
    slots,
    selectedSlot,
    onSelectSlot,
    skeletonCount = 4,
    className = '',
}) => {
    return (
        <div className={`grid grid-cols-1 gap-2 md:grid-cols-4 ${className}`}>
            {loading
                ? Array.from({ length: skeletonCount }, (_, index) => (
                      <Skeleton
                          key={index}
                          className={'h-12 w-full rounded-md'}
                      />
                  ))
                : slots &&
                  Object.values(slots).map((slot, index) => (
                      <button
                          key={index}
                          className={cn(
                              `h-12 rounded-md border-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white ${selectedSlot === slot.datetime ? 'border-primary bg-primary text-white' : 'border-gray-100 text-gray-500'}`,
                          )}
                          onClick={() => onSelectSlot(slot)}
                      >
                          <span>{slot.time}</span>
                      </button>
                  ))}
        </div>
    );
};
