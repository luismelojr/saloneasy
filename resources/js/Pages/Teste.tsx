import { easepick, LockPlugin } from '@easepick/bundle';
import styleEasepick from '@easepick/bundle/dist/index.css?url';
import { format } from 'date-fns';
import pluralize from 'pluralize';
import { useEffect, useState } from 'react';

export default function Teste() {
    let picker: any = null;
    const [date, setDate] = useState<Date | undefined>(new Date());

    const createPicker = () => {
        picker = new easepick.create({
            css: [
                styleEasepick,
                'http://saloneasy.test/assets/css/vendor/easepick.css',
            ],
            date: date,
            element: document.getElementById('easedatepicker') as HTMLElement,
            inline: true,
            readonly: true,
            lang: 'pt-BR',
            zIndex: 50,
            plugins: [LockPlugin],
            setup(picker) {
                picker.on('select', (e) => {
                    const { view, date, target } = e.detail;
                    const dateString = date ? date.format('YYYY-MM-DD') : null;

                    if (view === 'CalendarDay') {
                        const span =
                            target.querySelector('.day-slots') ||
                            document.createElement('span');
                        span.className = 'day-slots';
                        span.innerHTML = pluralize('vaga', 10, true);
                        target.append(span);
                    }
                    setDate(date);
                });
            },
        });
    };

    useEffect(() => {
        createPicker();
    }, []);

    return (
        <div>
            <h1>Teste</h1>
            {date && <p>{format(date, 'dd/MM/yyyy')}</p>}
            <div id={'easedatepicker'} className={'hidden'}></div>
        </div>
    );
}
