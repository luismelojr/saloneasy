interface PlanCardProps {
    title: string;
    price: number;
    version: string;
    features: string[];
    isHighlighted?: boolean;
    action: (version: string) => void;
}

export default function PlanCard({
    title,
    price,
    features,
    isHighlighted,
    action,
    version,
}: PlanCardProps) {
    return (
        <div
            className={`-translate-z-[50px] rotate-y-[10deg] relative z-0 origin-right translate-x-0 translate-y-0 transform rounded-2xl border-[1px] ${isHighlighted ? 'border-primary' : 'border-border'} bg-background p-6 text-center lg:flex lg:flex-col lg:justify-center`}
        >
            {isHighlighted && (
                <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl bg-primary px-2 py-0.5">
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 576 512"
                        className="text-white"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                    </svg>
                    <span className="ml-1 font-sans font-semibold text-white">
                        Popular
                    </span>
                </div>
            )}
            <div>
                <div>
                    <p className="text-base font-semibold uppercase text-muted-foreground">
                        {title}
                    </p>
                    <p className="mt-6 flex items-center justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-foreground">
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(price)}
                        </span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                            / mês
                        </span>
                    </p>
                    <p className="text-xs leading-5 text-muted-foreground">
                        cobrado mensalmente
                    </p>
                    <ul className="mt-5 flex flex-col gap-2">
                        {features.map((feature, index) => (
                            <li className="flex items-center" key={index}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-check mr-2 h-4 w-4 text-primary"
                                >
                                    <path d="M20 6 9 17l-5-5"></path>
                                </svg>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-4 w-full" />
                    <button
                        type={'button'}
                        onClick={() => action(version)}
                        className={`group relative inline-flex h-10 w-full transform-gpu items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-input ${isHighlighted ? 'bg-primary text-muted' : 'bg-white text-foreground'} px-4 py-2 text-lg font-semibold tracking-tighter ring-offset-current transition-all duration-300 ease-out hover:bg-primary hover:text-white hover:ring-2 hover:ring-primary hover:ring-offset-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                    >
                        Inscrever-se
                    </button>
                    <p className="mt-6 text-xs leading-5 text-muted-foreground">
                        Perfeito para indivíduos e pequenos projetos
                    </p>
                </div>
            </div>
        </div>
    );
}
