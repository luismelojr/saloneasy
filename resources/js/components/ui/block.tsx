import React from 'react';

interface BlockProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}
export default function Block({ icon, title, description }: BlockProps) {
    return (
        <div className={'flex flex-col gap-4'}>
            <div
                className={
                    'flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'
                }
            >
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className={'text-muted-foreground'}>{description}</p>
        </div>
    );
}
