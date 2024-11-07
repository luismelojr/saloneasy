import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    action: (action: 'login' | 'register') => void;
}
export default function Hero({ action }: HeroProps) {
    return (
        <section>
            <div
                className={
                    'flex w-full flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8'
                }
            >
                <Link
                    href={'/'}
                    className={
                        'flex w-auto items-center space-x-2 whitespace-pre rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent'
                    }
                >
                    <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-center text-xs font-medium text-primary sm:text-sm">
                        📣 Facil e intuitivo
                    </div>
                    <p className="text-xs font-medium text-primary sm:text-sm">
                        Gerencie seus atendimentos.
                    </p>
                </Link>
                <div
                    className={
                        'flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8'
                    }
                >
                    <h1
                        className={
                            'text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl'
                        }
                    >
                        Sistema de Gestão de Salão de Beleza
                    </h1>
                    <p
                        className={
                            'mx-auto max-w-xl text-balance text-center text-lg leading-7 text-muted-foreground sm:text-xl sm:leading-9'
                        }
                    >
                        Gerencie seus clientes, serviços e agendamentos de forma
                        simples e eficiente.
                    </p>
                </div>
                <div
                    className={
                        'mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'
                    }
                >
                    <Button size={'lg'} onClick={() => action('register')}>
                        Começar agora
                        <ArrowRight />
                    </Button>
                </div>
                <div className={'container-block hidden pt-32 md:flex'}>
                    <img
                        src="https://saas-magicui.vercel.app/_next/image?url=%2Fdashboard.png&w=3840&q=75"
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
}
