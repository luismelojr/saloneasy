import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DatePickerProps {
    error: string;
    placeholder: string;
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
}

export function DatePicker({
    error,
    placeholder,
    value,
    onChange,
}: DatePickerProps) {
    const [date, setDate] = React.useState<Date | undefined>(value);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelectDate = (date: Date | undefined) => {
        setDate(date);
        onChange(date);
        setIsOpen(false);
    };

    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left text-sm font-normal placeholder:text-muted-foreground',
                        !date && 'text-muted-foreground',
                        error && 'border-red-500',
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {date ? (
                        format(date, 'dd/MM/yyyy')
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelectDate}
                    initialFocus
                    locale={ptBR}
                />
            </PopoverContent>
        </Popover>
    );
}
