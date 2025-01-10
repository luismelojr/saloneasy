import { getWeekDays } from '@/utils/get-week-days';
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';

export default function CalendarCustom() {
    const shortWeekDays = getWeekDays({ short: true });
    return (
        <div className={'flex flex-col gap-3 p-3'}>
            <div className={'flex items-center justify-between'}>
                <h4 className={'font-medium'}>
                    Dezembro <span className={'text-gray-500'}>2024</span>
                </h4>
                <div className={'flex items-center gap-1'}>
                    <button
                        type={'button'}
                        className={
                            'rounded-md p-2 transition-all hover:bg-gray-100'
                        }
                    >
                        <CaretLeftIcon className={'h-5 w-5'} />
                    </button>
                    <button
                        type={'button'}
                        className={
                            'rounded-md p-2 transition-all hover:bg-gray-100'
                        }
                    >
                        <CaretRightIcon className={'h-5 w-5'} />
                    </button>
                </div>
            </div>
            <table className={'w-full table-fixed border-spacing-2'}>
                <thead>
                    <tr>
                        {shortWeekDays.map((day) => {
                            return (
                                <th
                                    key={day}
                                    className={
                                        'text-sm font-medium text-gray-500'
                                    }
                                >
                                    {day}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={'box-border'}>
                            <button
                                className={
                                    'aspect-square w-full rounded-sm bg-gray-200 text-center text-gray-500'
                                }
                            >
                                1
                            </button>
                        </td>
                        <td className={'box-border'}>
                            <button
                                disabled
                                className={
                                    'aspect-square w-full rounded-sm text-center text-gray-500 transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-red-400'
                                }
                            >
                                2
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
