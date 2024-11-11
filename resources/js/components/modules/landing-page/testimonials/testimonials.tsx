import { Contact } from '@/components/modules/landing-page/testimonials/contact';
import Title from '@/components/ui/title';

export default function Testimonials() {
    return (
        <section>
            <div className={'flex flex-col pt-32'}>
                <Title
                    title={'O que nossos clientes estão dizendo!'}
                    subtitle={'Testemunhos'}
                />
            </div>
            <div className={'container-block'}>
                <Contact />
            </div>
        </section>
    );
}
