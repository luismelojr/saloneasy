import PlanCard from '@/components/ui/plan-card';
import Title from '@/components/ui/title';
import { router } from '@inertiajs/react';

interface PlansProps {
    essential: {
        name: string;
        price: number;
    };
    pro: {
        name: string;
        price: number;
    };
}
export default function Plans({ essential, pro }: PlansProps) {
    const handleSelectPlan = (version: string) => {
        router.get(route('register', { plan: version }));
    };

    return (
        <section className={'py-16'}>
            <div className={'flex flex-col'}>
                <Title
                    title={'Escolha o plano certo para você!'}
                    subtitle={'Preços'}
                />
            </div>
            <div
                className={
                    'container-block mt-10 grid grid-cols-1 gap-10 md:grid-cols-3'
                }
            >
                <PlanCard
                    title={'Basico'}
                    price={0}
                    features={['1 Usuário', '5 GB de armazenamento']}
                    version={'basic'}
                    action={handleSelectPlan}
                />
                <PlanCard
                    title={essential.name}
                    price={essential.price}
                    features={[
                        '1 Usuário',
                        '5 GB de armazenamento',
                        'Suporte Prioritário',
                        'Acesso total à API',
                    ]}
                    isHighlighted
                    version={'essential'}
                    action={handleSelectPlan}
                />
                <PlanCard
                    title={pro.name}
                    price={pro.price}
                    features={[
                        '1 Usuário',
                        '5 GB de armazenamento',
                        'Suporte Prioritário',
                        'Acesso total à API',
                        'Acesso a novos recursos',
                    ]}
                    version={'pro'}
                    action={handleSelectPlan}
                />
            </div>
        </section>
    );
}
