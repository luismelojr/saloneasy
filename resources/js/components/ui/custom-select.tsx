import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';

// Interfaces e tipos
export interface Option {
    value: string;
    label: string;
    disabled?: boolean;
}

type SelectType = 'single' | 'multiple';

interface BaseSelectProps {
    label?: string;
    options: Option[];
    placeholder?: string;
    type?: SelectType;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    searchPlaceholder?: string;
}

interface SingleSelectProps extends BaseSelectProps {
    type?: 'single';
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

interface MultipleSelectProps extends BaseSelectProps {
    type: 'multiple';
    value: string[];
    onChange: Dispatch<SetStateAction<string[]>>;
}

type CustomSelectProps = SingleSelectProps | MultipleSelectProps;

// Type guard para verificar se é múltipla seleção
const isMultipleSelect = (
    props: CustomSelectProps,
): props is MultipleSelectProps => {
    return props.type === 'multiple';
};

export const CustomSelect: React.FC<CustomSelectProps> = (props) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [width, setWidth] = useState(0);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    // Filtra as opções baseado no termo de busca
    const filteredOptions = props.options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Handler para seleção múltipla
    const handleMultiSelect = (currentValue: string) => {
        if (!isMultipleSelect(props)) return;

        props.onChange((prevValues) => {
            const isSelected = prevValues.includes(currentValue);
            if (isSelected) {
                return prevValues.filter((value) => value !== currentValue);
            }
            return [...prevValues, currentValue];
        });
    };

    // Handler para seleção única
    const handleSingleSelect = (currentValue: string) => {
        if (isMultipleSelect(props)) return;
        props.onChange(currentValue);
        setOpen(false);
    };

    // Remover item da seleção múltipla
    const removeItem = (e: React.MouseEvent, valueToRemove: string) => {
        e.stopPropagation();
        if (!isMultipleSelect(props)) return;

        props.onChange((prevValues) =>
            prevValues.filter((value) => value !== valueToRemove),
        );
    };

    // Função para obter o label de um valor
    const getOptionLabel = (val: string): string => {
        return props.options.find((opt) => opt.value === val)?.label || val;
    };

    // Renderiza o valor selecionado
    const renderSelectedValue = () => {
        if (isMultipleSelect(props)) {
            if (props.value.length === 0) return props.placeholder;
            return `${props.value.length} item${
                props.value.length > 1 ? 's' : ''
            } selecionado${props.value.length > 1 ? 's' : ''}`;
        } else {
            if (!props.value) return props.placeholder;
            return getOptionLabel(props.value);
        }
    };

    return (
        <div className={`w-full space-y-2 ${props.className || ''}`}>
            {props.label && (
                <Label className="flex gap-1">
                    {props.label}
                    {props.required && (
                        <span className="text-destructive">*</span>
                    )}
                </Label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={triggerRef}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        onClick={() => {
                            if (triggerRef.current) {
                                setWidth(triggerRef.current.offsetWidth);
                            }
                        }}
                        className={`w-full justify-between ${
                            props.error ? 'border-destructive' : ''
                        } ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={props.disabled}
                    >
                        <span className="truncate">
                            {renderSelectedValue()}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0"
                    align="start"
                    sideOffset={5}
                    style={{ width: `${width}px` }}
                >
                    <div className="flex max-h-[300px] flex-col">
                        {/* Search input */}
                        <div className="sticky top-0 border-b bg-background p-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={
                                        props.searchPlaceholder || 'Buscar...'
                                    }
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        {/* Options list */}
                        <div className="overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => {
                                    const isSelected = isMultipleSelect(props)
                                        ? props.value.includes(option.value)
                                        : props.value === option.value;

                                    return (
                                        <Button
                                            key={option.value}
                                            variant="ghost"
                                            className={`w-full justify-start px-2 py-1.5 ${
                                                option.disabled
                                                    ? 'cursor-not-allowed opacity-50'
                                                    : ''
                                            } ${isSelected ? 'bg-primary/10' : ''}`}
                                            disabled={option.disabled}
                                            onClick={() => {
                                                if (isMultipleSelect(props)) {
                                                    handleMultiSelect(
                                                        option.value,
                                                    );
                                                } else {
                                                    handleSingleSelect(
                                                        option.value,
                                                    );
                                                }
                                            }}
                                        >
                                            <div className="flex w-full items-center">
                                                {isMultipleSelect(props) && (
                                                    <div
                                                        className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                                                            isSelected
                                                                ? 'border-primary bg-primary'
                                                                : 'border-input'
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <Check className="h-3 w-3 text-primary-foreground" />
                                                        )}
                                                    </div>
                                                )}
                                                <span className="flex-grow text-left">
                                                    {option.label}
                                                </span>
                                                {!isMultipleSelect(props) &&
                                                    isSelected && (
                                                        <Check className="ml-2 h-4 w-4 text-primary" />
                                                    )}
                                            </div>
                                        </Button>
                                    );
                                })
                            ) : (
                                <div className="py-6 text-center text-sm text-muted-foreground">
                                    Nenhum resultado encontrado
                                </div>
                            )}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Badges para seleção múltipla */}
            {isMultipleSelect(props) && props.value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {props.value.map((val) => (
                        <Badge
                            key={val}
                            variant="secondary"
                            className={`flex items-center gap-1 px-2 py-1 text-sm ${
                                props.disabled ? 'opacity-50' : ''
                            }`}
                        >
                            {getOptionLabel(val)}
                            {!props.disabled && (
                                <X
                                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                                    onClick={(e) => removeItem(e, val)}
                                />
                            )}
                        </Badge>
                    ))}
                </div>
            )}

            {/* Error message */}
            {props.error && (
                <p className="mt-1 text-sm text-destructive">{props.error}</p>
            )}
        </div>
    );
};

export default CustomSelect;
