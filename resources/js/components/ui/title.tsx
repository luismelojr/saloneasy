interface TitleProps {
    title: string;
    subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
    return (
        <div
            className={
                'container-block flex flex-col items-center justify-center gap-2'
            }
        >
            <p
                className={
                    'font-mono text-sm font-medium uppercase tracking-wider text-primary'
                }
            >
                {subtitle}
            </p>
            <h3
                className={
                    'mt-4 max-w-xs text-2xl font-semibold text-foreground sm:max-w-none sm:text-3xl md:text-4xl'
                }
            >
                {title}
            </h3>
        </div>
    );
}
