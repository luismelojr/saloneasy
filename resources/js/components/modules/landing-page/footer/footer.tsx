import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export default function Footer() {
    return (
        <footer className={'py-6'}>
            <div
                className={
                    'container-block flex w-full items-center justify-between'
                }
            >
                <p>
                    © {new Date().getFullYear()} Salon Easy - Todos os direitos
                    reservados.
                </p>
                <div className={'flex items-center gap-4'}>
                    <a
                        className={'cursor-pointer'}
                        href={'/'}
                        target={'_blank'}
                        rel="noreferrer"
                    >
                        <LinkedInLogoIcon className={'h-6 w-6'} />
                    </a>
                    <a
                        className={'cursor-pointer'}
                        href={'/'}
                        target={'_blank'}
                        rel="noreferrer"
                    >
                        <InstagramLogoIcon className={'h-6 w-6'} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
