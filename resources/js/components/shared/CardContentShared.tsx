interface CardContentSharedProps {
    children: React.ReactNode;
}
export default function CardContentShared({
    children,
}: CardContentSharedProps) {
    return <div className={'p-4'}>{children}</div>;
}
