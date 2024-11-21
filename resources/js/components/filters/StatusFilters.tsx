import {
    DropdownMenuCheckboxItem,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';

interface StatusFiltersProps {
    filters: { key: string; value: string | boolean; legend: string }[];
    handleFilterStatus: (value: boolean) => void;
}

const StatusFiltersOptions = [
    {
        value: true,
        label: 'Ativo',
    },
    {
        value: false,
        label: 'Inativo',
    },
];
export default function StatusFilters({
    filters,
    handleFilterStatus,
}: StatusFiltersProps) {
    return (
        <DropdownMenuGroup>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Check />
                    <span>Status</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent
                        sideOffset={10}
                        alignOffset={-4}
                        className="p-0"
                    >
                        {StatusFiltersOptions.map((filter) => (
                            <DropdownMenuCheckboxItem
                                key={filter.label}
                                checked={filters.some(
                                    (f) =>
                                        f.key === 'status' &&
                                        f.value === filter.value,
                                )}
                                onCheckedChange={() =>
                                    handleFilterStatus(filter.value)
                                }
                            >
                                {filter.label}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        </DropdownMenuGroup>
    );
}
