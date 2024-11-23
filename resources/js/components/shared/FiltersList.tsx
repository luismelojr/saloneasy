import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface FiltersListProps {
    data: {
        key: string;
        value: string | boolean;
        legend: string;
    }[];
    remover: (key: string) => void;
}

const listVariants = {
    hidden: { y: 10, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.05,
            staggerChildren: 0.06,
        },
    },
};

const itemVariant = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 },
};

export default function FiltersList({ data, remover }: FiltersListProps) {
    const isValidFilters = (key: string) => {
        return key !== 'preserveState' && key !== 'page' && key !== 'sorting';
    };

    const formattedFiltersName = (key: string) => {
        switch (key) {
            case 'search':
                return 'Busca';
            case 'status':
                return 'Status';
            case 'created_at':
                return 'Criado em';
            default:
                return key;
        }
    };

    return (
        <motion.ul
            variants={listVariants}
            initial={'hidden'}
            animate={'show'}
            className={'flex space-x-2'}
        >
            {data.map((filter, index) => {
                return (
                    isValidFilters(filter.key) && (
                        <motion.li variants={itemVariant} key={index}>
                            <Button
                                className="group flex h-8 items-center rounded-full bg-secondary px-3 font-normal text-[#878787] hover:bg-secondary"
                                onClick={() => remover(filter.key)}
                            >
                                <X className="!w-0 scale-0 transition-all group-hover:!w-4 group-hover:scale-100" />
                                <span>
                                    <b className={'capitalize'}>
                                        {formattedFiltersName(filter.key)}
                                    </b>{' '}
                                    : {filter.legend}
                                </span>
                            </Button>
                        </motion.li>
                    )
                );
            })}
        </motion.ul>
    );
}
