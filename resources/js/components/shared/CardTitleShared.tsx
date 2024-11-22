interface CardTitleSharedProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}
export default function CardTitleShared({
    title,
    description,
    children,
}: CardTitleSharedProps) {
    return (
        <div className="border-b border-gray-200 bg-white px-4 py-5">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <h3 className="text-base font-semibold text-gray-900">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                <div className="ml-4 mt-4 shrink-0">{children}</div>
            </div>
        </div>
    );
}
