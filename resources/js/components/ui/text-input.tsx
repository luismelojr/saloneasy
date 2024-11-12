import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputProps extends InputProps {
    label: string;
    error: string;
    type: string;
    id: string;
    className?: string;
}
export default function TextInput(props: TextInputProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className={`grid w-full items-center gap-2 ${props.className}`}>
            <Label htmlFor={props.id}>{props.label}</Label>
            <div className={'relative'}>
                <Input
                    type={showPassword ? 'text' : props.type}
                    id={props.id}
                    className={`${props.error && 'border-red-500'} w-full outline-none`}
                    value={props.value}
                    onChange={props.onChange}
                />
                {props.type === 'password' && (
                    <Button
                        type={'button'}
                        variant={'link'}
                        size={'icon'}
                        className={'absolute right-0 top-0'}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOffIcon
                                className={'h-5 w-5 text-muted-foreground'}
                            />
                        ) : (
                            <EyeIcon
                                className={'h-5 w-5 text-muted-foreground'}
                            />
                        )}
                    </Button>
                )}
            </div>
            {props.error && (
                <p className={'text-xs text-red-500'}>{props.error}</p>
            )}
        </div>
    );
}
