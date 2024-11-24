import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextInputProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error: string;
    id: string;
    className?: string;
}
export default function TextInputArea(props: TextInputProps) {
    return (
        <div className={`grid w-full items-center gap-2 ${props.className}`}>
            <Label htmlFor={props.id}>{props.label}</Label>
            <Textarea
                id={props.id}
                className={`${props.error && 'border-red-500'} w-full outline-none`}
                value={props.value}
                onChange={props.onChange}
            />
            {props.error && (
                <p className={'text-xs text-red-500'}>{props.error}</p>
            )}
        </div>
    );
}
