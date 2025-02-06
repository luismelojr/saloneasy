import Finish from '@/components/modules/landing-page/Finish/finish';
import Flow from '@/components/modules/landing-page/flow/flow';
import Footer from '@/components/modules/landing-page/footer/footer';
import Header from '@/components/modules/landing-page/header/header';
import Hero from '@/components/modules/landing-page/hero/hero';
import Plans from '@/components/modules/landing-page/plans/plans';
import Problem from '@/components/modules/landing-page/problem/problem';
import Questions from '@/components/modules/landing-page/questions/questions';
import Testimonials from '@/components/modules/landing-page/testimonials/testimonials';
import Toast from '@/components/ui/toast';
import { router } from '@inertiajs/react';

interface HomeProps {
    essential: {
        name: string;
        price: number;
    };
    pro: {
        name: string;
        price: number;
    };
}
export default function Home({ essential, pro }: HomeProps) {
    const handleNavigation = (action: 'login' | 'register') => {
        if (action === 'register') router.get(route('register.step.one'));
        router.get(route(action));
    };

    return (
        <main className={'flex min-h-screen w-full flex-col'}>
            <Header action={handleNavigation} />
            <Hero action={handleNavigation} />
            <Problem />
            <Flow />
            <Testimonials />
            <Plans essential={essential} pro={pro} />
            <Questions />
            <Finish action={handleNavigation} />
            <Footer />
            <Toast />
        </main>
    );
}
