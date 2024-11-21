import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@inertiajs/react';
import React from 'react';

interface BreadcrumbCustomProps {
    menus: { label: string; link: string; active: boolean }[];
}
export default function BreadcrumbCustom({ menus }: BreadcrumbCustomProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {menus.map((menu, index) => {
                    if (index === menus.length - 1) {
                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbPage>{menu.label}</BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={menu.link}>{menu.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
