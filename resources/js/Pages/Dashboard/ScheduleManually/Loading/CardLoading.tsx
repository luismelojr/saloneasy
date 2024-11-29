import { Skeleton } from '@/components/ui/skeleton';

export default function CardLoading() {
    return (
        <div className={'grid grid-cols-1 gap-4 md:grid-cols-3'}>
            {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex flex-col space-y-3" key={index}>
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}
