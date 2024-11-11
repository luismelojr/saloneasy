import Block from '@/components/ui/block';
import Title from '@/components/ui/title';
import {
    Banknote,
    Bell,
    BellRing,
    Calendar,
    HandCoins,
    MonitorCog,
} from 'lucide-react';

export default function Flow() {
    return (
        <section className={'bg-neutral-100 py-16 dark:bg-neutral-900'}>
            <div className={'flex flex-col'}>
                <Title
                    title={'Nosso sistema é a solução para você!'}
                    subtitle={'Solução'}
                />
            </div>
            <div
                className={
                    'container-block mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-3'
                }
            >
                <Block
                    icon={<Calendar className={'h-6 w-6 text-primary/60'} />}
                    title={'Agendamentos organizados'}
                    description={
                        'Cadastre seus serviços e horários disponíveis, e deixe que seus clientes façam o agendamento de forma prática e independente.'
                    }
                />
                <Block
                    icon={<Bell className={'h-6 w-6 text-primary/60'} />}
                    title={'Lembretes de agendamento'}
                    description={
                        'Envie lembretes de agendamento para seus clientes, evitando faltas e atrasos.'
                    }
                />
                <Block
                    icon={<MonitorCog className={'h-6 w-6 text-primary/60'} />}
                    title={'Gerencia de atendimentos'}
                    description={
                        'Visualize os agendamentos do dia, semana ou mês, gerencie os clientes e serviços.'
                    }
                />
                <Block
                    icon={<BellRing className={'h-6 w-6 text-primary/60'} />}
                    title={'Notificações de agendamento'}
                    description={
                        'Receba notificações de novos agendamentos e cancelamentos.'
                    }
                />
                <Block
                    icon={<HandCoins className={'h-6 w-6 text-primary/60'} />}
                    title={'Cobrança de 50% do valor do serviço'}
                    description={
                        'Cobrança de 50% do valor do serviço no ato do agendamento.'
                    }
                />
                <Block
                    icon={<Banknote className={'h-6 w-6 text-primary/60'} />}
                    title={'Recebimento de pagamento no pix'}
                    description={
                        'Receba o pagamento dos serviços realizados via pix.'
                    }
                />
            </div>
        </section>
    );
}
