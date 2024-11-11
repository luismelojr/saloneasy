import { Button } from '@/components/ui/button';
import Title from '@/components/ui/title';
import { ArrowRight } from 'lucide-react';

interface FinishProps {
    action: (action: 'login' | 'register') => void;
}
export default function Finish({ action }: FinishProps) {
    return (
        <section className={'rounded-xl bg-primary/10 py-16'}>
            <div className={'flex flex-col'}>
                <Title
                    title={'Comece hoje mesmo a gerenciar seu salão de beleza'}
                    subtitle={'Pronto para começar?'}
                />
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
            </div>
        </section>
    );
}
