import { Label } from '@/components/ui/label';
import InputMask from 'react-input-mask';

interface TextInputProps {
    label: string;
    error: string;
    type: string;
    id: string;
    className?: string;
    mask: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
export default function TextMask(props: TextInputProps) {
    return (
        <div className={`flex w-full flex-col gap-2 ${props.className}`}>
            <Label htmlFor={props.id}>{props.label}</Label>
            <div className={'relative'}>
                <InputMask
                    {...props}
                    mask={'(99) 99999-9999'}
                    value={props.value}
                    onChange={props.onChange}
                    className={`${props.error && 'border-red-500'} disabled:opacity-50' flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed`}
                />
            </div>
            {props.error && (
                <p className={'text-xs text-red-500'}>{props.error}</p>
            )}
        </div>
    );
}
