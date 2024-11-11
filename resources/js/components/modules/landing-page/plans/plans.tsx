import PlanCard from '@/components/ui/plan-card';
import Title from '@/components/ui/title';

export default function Plans() {
    const handleSelectPlan = (version: string) => {
        console.log(version);
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
                    action={handleSelectPlan}
                />
                <PlanCard
                    title={'Essencial'}
                    price={49.9}
                    features={[
                        '1 Usuário',
                        '5 GB de armazenamento',
                        'Suporte Prioritário',
                        'Acesso total à API',
                    ]}
                    isHighlighted
                    action={handleSelectPlan}
                />
                <PlanCard
                    title={'Pro'}
                    price={99.9}
                    features={[
                        '1 Usuário',
                        '5 GB de armazenamento',
                        'Suporte Prioritário',
                        'Acesso total à API',
                        'Acesso a novos recursos',
                    ]}
                    action={handleSelectPlan}
                />
            </div>
        </section>
    );
}
