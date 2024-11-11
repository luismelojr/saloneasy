import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Title from '@/components/ui/title';

const questions = [
    {
        title: 'Como faço para me cadastrar?',
        content:
            'Para se cadastrar, basta clicar no botão "Começar agora" e preencher o formulário de cadastro.',
    },
    {
        title: 'Como faço para me cadastrar?',
        content:
            'Para se cadastrar, basta clicar no botão "Começar agora" e preencher o formulário de cadastro.',
    },
    {
        title: 'Como faço para me cadastrar?',
        content:
            'Para se cadastrar, basta clicar no botão "Começar agora" e preencher o formulário de cadastro.',
    },
    {
        title: 'Como faço para me cadastrar?',
        content:
            'Para se cadastrar, basta clicar no botão "Começar agora" e preencher o formulário de cadastro.',
    },
];
export default function Questions() {
    return (
        <section className={'py-16'}>
            <div className={'flex flex-col'}>
                <Title
                    title={'Perguntas frequentes'}
                    subtitle={'Perguntas frequentes'}
                />
            </div>
            <div
                className={
                    'container-block mt-10 flex w-full flex-col items-center justify-center gap-4 md:max-w-[800px]'
                }
            >
                <Accordion
                    type={'single'}
                    collapsible
                    className="w-full border px-4"
                >
                    {questions.map((question, index) => (
                        <AccordionItem value={`${index}`} key={index}>
                            <AccordionTrigger>
                                {question.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                {question.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
