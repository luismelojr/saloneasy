import Header from '@/components/modules/header/header';
import Hero from '@/components/modules/hero/hero';

export default function Welcome() {
    const handleNavigation = (action: 'login' | 'register') => {
        console.log(action);
    };

    return (
        <main className={'flex min-h-screen w-full flex-col'}>
            <Header action={handleNavigation} />
            <Hero action={handleNavigation} />
        </main>
    );
}
