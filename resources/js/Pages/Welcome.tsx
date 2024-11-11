import Finish from '@/components/modules/landing-page/Finish/finish';
import Flow from '@/components/modules/landing-page/flow/flow';
import Footer from '@/components/modules/landing-page/footer/footer';
import Header from '@/components/modules/landing-page/header/header';
import Hero from '@/components/modules/landing-page/hero/hero';
import Plans from '@/components/modules/landing-page/plans/plans';
import Problem from '@/components/modules/landing-page/problem/problem';
import Questions from '@/components/modules/landing-page/questions/questions';
import Testimonials from '@/components/modules/landing-page/testimonials/testimonials';

export default function Welcome() {
    const handleNavigation = (action: 'login' | 'register') => {
        console.log(action);
    };

    return (
        <main className={'flex min-h-screen w-full flex-col'}>
            <Header action={handleNavigation} />
            <Hero action={handleNavigation} />
            <Problem />
            <Flow />
            <Testimonials />
            <Plans />
            <Questions />
            <Finish action={handleNavigation} />
            <Footer />
        </main>
    );
}
