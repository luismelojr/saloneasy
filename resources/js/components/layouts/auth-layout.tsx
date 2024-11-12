import Logo from '@/components/icons/logo';
import { Link } from '@inertiajs/react';
import { CalendarClock } from 'lucide-react';
import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div
            className={
                'grid min-h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-2'
            }
        >
            <div className={'relative hidden bg-primary px-10 py-20 md:block'}>
                <svg
                    width="666"
                    height="418"
                    viewBox="0 0 666 418"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={'absolute -bottom-52 left-0 h-full w-full'}
                >
                    <g clipPath="url(#clip0_4_8)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-21.1419 590.674C-37.7283 501.351 -142.707 437.153 -132.272 346.904C-121.935 257.503 -49.4183 177.821 31.2144 137.849C108.904 99.3351 202.855 160.371 286.916 139.096C378.127 116.011 444.548 -21.3332 532.954 10.8633C622.231 43.3769 592.045 188.271 642.687 268.663C682.797 332.337 778.206 355.8 796.262 428.856C814.322 501.923 750.535 568.54 735.007 642.186C716.87 728.209 760.428 837.574 697.207 898.664C634.759 959.006 529.156 919.686 442.471 924.859C367.501 929.332 295.497 936.681 221.01 927.078C131.799 915.578 16.1348 936.128 -36.4143 863.126C-90.4753 788.023 -4.24754 681.655 -21.1419 590.674Z"
                            fill="#F98031"
                        />
                    </g>
                </svg>
                <div>
                    <Link href={route('home')}>
                        <div className={'flex items-center gap-4'}>
                            <CalendarClock className={'h-7 w-7 text-white'} />
                            <span
                                className={'text-[20px] font-bold text-white'}
                            >
                                Saloneasy
                            </span>
                        </div>
                    </Link>
                </div>
                <div className={'-mt-20 flex h-full flex-col justify-center'}>
                    <div className={'relative space-y-2 text-center'}>
                        <h2 className={'text-3xl font-bold text-white'}>
                            Comece a gerenciar seu salão de beleza
                        </h2>
                        <p className={'text-xl text-white'}>
                            Com o Saloneasy você tem tudo em um só lugar
                        </p>
                        <svg
                            width="128"
                            height="128"
                            viewBox="0 0 128 128"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={'absolute -top-40 right-0'}
                        >
                            <circle cx="10" cy="10" r="10" fill="#f96509" />
                            <circle cx="10" cy="46" r="10" fill="#f96509" />
                            <circle cx="10" cy="82" r="10" fill="#f96509" />
                            <circle cx="10" cy="118" r="10" fill="#f96509" />
                            <circle cx="46" cy="10" r="10" fill="#f96509" />
                            <circle cx="46" cy="46" r="10" fill="#f96509" />
                            <circle cx="46" cy="82" r="10" fill="#f96509" />
                            <circle cx="46" cy="118" r="10" fill="#f96509" />
                            <circle cx="82" cy="10" r="10" fill="#f96509" />
                            <circle cx="82" cy="46" r="10" fill="#f96509" />
                            <circle cx="82" cy="82" r="10" fill="#f96509" />
                            <circle cx="82" cy="118" r="10" fill="#f96509" />
                            <circle cx="118" cy="10" r="10" fill="#f96509" />
                            <circle cx="118" cy="46" r="10" fill="#f96509" />
                            <circle cx="118" cy="82" r="10" fill="#f96509" />
                            <circle cx="118" cy="118" r="10" fill="#f96509" />
                        </svg>
                        <svg
                            width="128"
                            height="128"
                            viewBox="0 0 128 128"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={'absolute -bottom-40 left-0'}
                        >
                            <circle cx="10" cy="10" r="10" fill="#f96509" />
                            <circle cx="10" cy="46" r="10" fill="#f96509" />
                            <circle cx="10" cy="82" r="10" fill="#f96509" />
                            <circle cx="10" cy="118" r="10" fill="#f96509" />
                            <circle cx="46" cy="10" r="10" fill="#f96509" />
                            <circle cx="46" cy="46" r="10" fill="#f96509" />
                            <circle cx="46" cy="82" r="10" fill="#f96509" />
                            <circle cx="46" cy="118" r="10" fill="#f96509" />
                            <circle cx="82" cy="10" r="10" fill="#f96509" />
                            <circle cx="82" cy="46" r="10" fill="#f96509" />
                            <circle cx="82" cy="82" r="10" fill="#f96509" />
                            <circle cx="82" cy="118" r="10" fill="#f96509" />
                            <circle cx="118" cy="10" r="10" fill="#f96509" />
                            <circle cx="118" cy="46" r="10" fill="#f96509" />
                            <circle cx="118" cy="82" r="10" fill="#f96509" />
                            <circle cx="118" cy="118" r="10" fill="#f96509" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className={'flex h-full w-full flex-col px-10 py-20'}>
                <div
                    className={
                        'flex w-full items-center justify-center md:hidden'
                    }
                >
                    <Link href={route('home')}>
                        <Logo />
                    </Link>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}
