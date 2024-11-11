import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
    action: (action: 'login' | 'register') => void;
}
export default function Header({ action }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={
                'relative sticky top-0 z-50 bg-background/60 py-8 backdrop-blur'
            }
        >
            <div
                className={'container-block flex items-center justify-between'}
            >
                <Link href={'/'}>
                    <Logo />
                </Link>
                <nav className={'hidden items-center gap-2 md:flex'}>
                    <Button
                        variant={'outline'}
                        size={'lg'}
                        onClick={() => action('login')}
                    >
                        Login
                    </Button>

                    <Button size={'lg'} onClick={() => action('register')}>
                        Começar agora
                        <ArrowRight />
                    </Button>
                </nav>
            </div>
            <hr
                className={`absolute bottom-0 w-full transition-opacity duration-300 ease-in-out ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
            />
        </header>
    );
}
