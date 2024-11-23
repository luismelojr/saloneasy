import { Calendar } from '@/components/ui/calendar';
import {
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarFiltersProps {
    filters: { key: string; value: string | boolean; legend: string }[];
    handleCalendarChange: (date: Date | undefined) => void;
    title: string;
}
export default function CalendarFilters({
    filters,
    handleCalendarChange,
    title,
}: CalendarFiltersProps) {
    return (
        <DropdownMenuGroup>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <CalendarIcon />
                    <span>{title}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent
                        sideOffset={10}
                        alignOffset={-4}
                        className="p-0"
                    >
                        <Calendar
                            mode={'single'}
                            selected={
                                new Date(
                                    filters.find(
                                        (filter) => filter.key === 'date',
                                    )?.value as string,
                                )
                            }
                            onSelect={(date) => handleCalendarChange(date)}
                            locale={ptBR}
                        />
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        </DropdownMenuGroup>
    );
}
