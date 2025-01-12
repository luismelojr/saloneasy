import { Card, CardContent } from '@/components/ui/card';
import Toast from '@/components/ui/toast';
import { Scissors } from 'lucide-react';
import React from 'react';

interface AuthClientsLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export default function AuthClientsLayout({
    children,
    title,
    subtitle,
}: AuthClientsLayoutProps) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50">
            <div className="absolute inset-0">
                <div className="bg-grid-slate-100 absolute inset-0 bg-[size:20px_20px] opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-400/10 to-orange-300/10" />
            </div>
            <div className="relative mx-auto w-full max-w-md px-6">
                <div className="mb-10 flex flex-col items-center">
                    <div className="mb-4">
                        <div className="flex h-14 w-14 transform items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg transition-transform duration-300 hover:scale-105">
                            <Scissors className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h1>
                    <p className="max-w-xs text-center text-base text-gray-600">
                        {subtitle}
                    </p>
                </div>
                <Card
                    className={
                        'border-0 bg-white/90 shadow-2xl backdrop-blur-xl'
                    }
                >
                    <CardContent className={'px-6 pb-8 pt-6'}>
                        {children}
                    </CardContent>
                </Card>
                <Toast />
            </div>
        </div>
    );
}
