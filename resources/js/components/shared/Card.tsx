interface CardSharedProps {
    children: React.ReactNode;
}
export default function CardShared({ children }: CardSharedProps) {
    return <div className={'rounded-md bg-white shadow'}>{children}</div>;
}
