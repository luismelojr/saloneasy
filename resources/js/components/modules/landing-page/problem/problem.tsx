import Block from '@/components/ui/block';
import Title from '@/components/ui/title';
import { Calendar, Clock, MonitorCog } from 'lucide-react';

export default function Problem() {
    return (
            <div className={'flex flex-col'}>
                <Title
                    title={'Gerenciar seus atendimentos é um desafio?'}
                    subtitle={'Problema'}
                />
                <div
                    className={
                        'container-block mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-3'
                    }
                >
                    <Block
                        icon={<Clock className={'h-6 w-6 text-primary/60'} />}
                        title={'Sem tempo para fazer agendamentos'}
                        description={
                            'Com a correria do dia a dia, parar para atender\n' +
                            '                            chamadas e organizar agendas é difícil. Nosso\n' +
                            '                            sistema permite que seus clientes façam o\n' +
                            '                            agendamento de forma prática e independente,\n' +
                            '                            liberando sua equipe para focar no atendimento.'
                        }
                    />
                    <Block
                        icon={
                            <Calendar className={'h-6 w-6 text-primary/60'} />
                        }
                        title={'Agendamentos desorganizados'}
                        description={
                            'Com o sistema de agendamento online, seus clientes\n' +
                            '                            podem ver os horários disponíveis e escolher o que\n' +
                            '                            melhor se encaixa em sua rotina. Além disso, você\n' +
                            '                            pode definir os horários de atendimento e pausa.'
                        }
                    />
                    <Block
                        icon={
                            <MonitorCog className={'h-6 w-6 text-primary/60'} />
                        }
                        title={'Controle de atendimentos'}
                        description={
                            'Com o sistema de gestão de atendimentos, você pode\n' +
                            '                            visualizar os agendamentos do dia, semana ou mês,\n' +
                            '                            gerenciar os clientes e serviços.'
                        }
                    />
                </div>
            </div>
        </section>
    );
}
