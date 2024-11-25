import { cn } from '@/lib/utils';

interface CardContentSharedProps {
    children: React.ReactNode;
    className?: string;
}
export default function CardContentShared({
    children,
    className,
}: CardContentSharedProps) {
    return <div className={cn('p-4', className)}>{children}</div>;
}
