import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { SlotsMap } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Skeleton } from './skeleton';

interface AvailabilityInterface {
    date: string;
    slots: SlotsMap;
}

interface CalendarDay {
    date: number;
    slots?: SlotsMap;
    isToday?: boolean;
}

interface CustomCalendarProps {
    availableSlots?: AvailabilityInterface[];
    onMonthChange?: (date: Date) => void;
    onDateSelect?: (date: Date) => void;
    initialDate?: Date;
    loading?: boolean;
}

const StripedBackground = () => (
    <div className="pointer-events-none absolute inset-0">
        <div
            className="h-full w-full"
            style={{
                backgroundImage: `repeating-linear-gradient(
        135deg,
        #f0f0f0,
        #f0f0f0 5px,
        #ffffff 5px,
        #ffffff 10px
      )`,
            }}
        />
    </div>
);

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
    availableSlots = [],
    onMonthChange,
    onDateSelect,
    initialDate = new Date(),
    loading = false,
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentDate, setCurrentDate] = useState(initialDate);
    const today = new Date();

    const formatMonth = (date: Date) => {
        return date.toLocaleString('pt-BR', { month: 'long' });
    };

    const getFirstDayOfMonth = (date: Date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        return firstDay.getDay() || 7;
    };

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const previousMonth = () => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1,
        );
        setCurrentDate(newDate);
        onMonthChange?.(newDate);
    };

    const nextMonth = () => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1,
        );
        setCurrentDate(newDate);
        onMonthChange?.(newDate);
    };

    const weekDays = ['seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.', 'dom.'];

    const formatDateString = (
        year: number,
        month: number,
        day: number,
    ): string => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const getSlotsForDate = (date: Date): SlotsMap | undefined => {
        const dateString = formatDateString(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
        );

        const availability = availableSlots.find(
            (slot) => slot.date === dateString,
        );
        return availability?.slots;
    };

    const getNumberOfSlots = (slots?: SlotsMap): number => {
        if (!slots) return 0;
        return Object.keys(slots).length;
    };

    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days: (CalendarDay | null)[][] = [];
        let currentWeek: (CalendarDay | null)[] = [];

        for (let i = 1; i < firstDay; i++) {
            currentWeek.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day,
            );
            const slots = getSlotsForDate(date);
            const isToday =
                today.getDate() === day &&
                today.getMonth() === date.getMonth() &&
                today.getFullYear() === date.getFullYear();

            currentWeek.push({
                date: day,
                slots,
                isToday,
            });

            if (currentWeek.length === 7) {
                days.push(currentWeek);
                currentWeek = [];
            }
        }

        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null);
            }
            days.push(currentWeek);
        }

        return days;
    };

    const handleDateClick = (day: number) => {
        const selectedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
        );
        setSelectedDate(selectedDate);
        onDateSelect?.(selectedDate);
    };

    const renderDay = (day: CalendarDay | null) => {
        if (!day)
            return (
                <div className="relative h-14">
                    <StripedBackground />
                </div>
            );

        const { date, slots, isToday } = day;
        const numberOfSlots = getNumberOfSlots(slots);
        const hasSlots = numberOfSlots > 0;

        return (
            <div className="relative h-14">
                {!hasSlots && <StripedBackground />}
                {hasSlots ? (
                    // Como deixar o botao com bg-primary se o dateSelected for igual ao selectedDate?
                    <Button
                        variant="default"
                        className={`flex h-full w-full flex-col items-center justify-center rounded-none border-white bg-white text-black hover:border-primary hover:bg-primary hover:text-white ${isToday ? 'border-2 border-primary' : ''} ${selectedDate?.getDate() === date ? 'bg-primary text-white' : ''}`}
                        onClick={() => handleDateClick(date)}
                    >
                        <span className="text-sm font-medium">{date}</span>
                        <span className="text-xs">{numberOfSlots} vagas</span>
                    </Button>
                ) : (
                    // <Button
                    //     variant="default"
                    //     className={`flex h-full w-full flex-col items-center justify-center rounded-none border-white bg-white text-black hover:border-primary hover:bg-primary hover:text-white ${isToday ? 'border-2 border-primary' : ''} `}
                    //     onClick={() => handleDateClick(date)}
                    // >
                    //     <span className="text-sm font-medium">{date}</span>
                    //     <span className="text-xs">{numberOfSlots} vagas</span>
                    // </Button>
                    <div
                        className={`relative z-10 flex h-full w-full items-center justify-center ${isToday ? 'border-2 border-primary' : ''} `}
                    >
                        <span className="text-sm text-gray-500">{date}</span>
                    </div>
                )}
            </div>
        );
    };

    const generateCalendarDaySkeleton = () => {
        return Array.from({ length: 35 }, (_, index) => (
            <Skeleton
                key={index}
                className="h-14 w-full rounded-none bg-gray-300"
            />
        ));
    };

    return (
        <Card className="w-full max-w-lg bg-gray-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-medium capitalize">
                        {formatMonth(currentDate)} {currentDate.getFullYear()}
                    </h2>
                </div>
                <div className="flex items-center space-x-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={previousMonth}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={nextMonth}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-px grid grid-cols-7 gap-px">
                    {weekDays.map((day) => (
                        <div
                            key={day}
                            className="flex h-8 items-center justify-center text-sm text-gray-500"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {loading
                        ? generateCalendarDaySkeleton()
                        : generateCalendarDays().map((week, weekIndex) => (
                              <React.Fragment key={weekIndex}>
                                  {week.map((day, dayIndex) => (
                                      <React.Fragment
                                          key={`${weekIndex}-${dayIndex}`}
                                      >
                                          {renderDay(day)}
                                      </React.Fragment>
                                  ))}
                              </React.Fragment>
                          ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default CustomCalendar;
