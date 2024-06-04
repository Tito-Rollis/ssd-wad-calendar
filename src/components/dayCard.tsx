import addIcon from '../assets/add_icon.svg';
import { EmptyDayComponent } from './emptyDay';
import { EventCardComponent } from './eventCard';
import { ModalDialog } from './modalDialog';
import { FormData } from '../types';

import { useAtom } from 'jotai';
import { ClickedDay, EventList, FormType, OpenModal } from '../atom/Store';
import { useEffect } from 'react';

export const DayCardComponent = () => {
    const [openModal, setOpenModal] = useAtom(OpenModal);
    const [, setClickedDay] = useAtom(ClickedDay);
    const [eventList, setEventList] = useAtom(EventList);
    const [, setFormType] = useAtom(FormType);

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    // const currentDay = new Date().getDay();
    const firstDayInMonth = new Date(year, month, 1).getDay(); // <0-6>
    const lastDayInMonth = new Date(year, month + 1, 0).getDate();

    const getNumberOfEvent = (day: number) => {
        const data = eventList.filter((e) => e.date === day);
        return data.length;
    };

    const generateRandomColor = () => Math.floor(Math.random() * (lastDayInMonth * 3 + 1));

    const handleAddEvent = (date: number) => {
        setFormType('add');
        setOpenModal(true);
        setClickedDay(date);
    };
    const daysInMonth: () => number[] = () => {
        const days = [];

        // Get empty days before first day in a month
        for (let d = 0; d < firstDayInMonth; d++) {
            days.push(d);
        }

        // Get the total days in a month
        for (let d = 1; d <= lastDayInMonth; d++) {
            days.push(d);
        }
        return days;
    };

    useEffect(() => {
        const getEventList = localStorage.getItem('Event');
        if (getEventList) {
            setEventList(JSON.parse(getEventList));
        }
    }, []);

    return (
        <>
            {openModal && <ModalDialog color={generateRandomColor().toString()} />}

            {/* Render The Day Box based on daysInMonth  */}
            {daysInMonth().map((day, index) => {
                if (index < firstDayInMonth) {
                    return <EmptyDayComponent key={index} />;
                }
                return (
                    <div
                        key={index}
                        className="w-full border p-2 h-full min-h-24 bg-blue-500 flex flex-col justify-self-stretch gap-y-2"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h1 className="text-white font-medium ">{day}</h1>

                            <button
                                disabled={getNumberOfEvent(day) === 3 ? true : false}
                                className={`bg-white ${
                                    getNumberOfEvent(day) === 3 ? 'opacity-55' : 'opacity-100'
                                } rounded-sm`}
                            >
                                <img onClick={() => handleAddEvent(day)} className="" src={addIcon} />
                            </button>
                        </div>
                        {/* CARDS */}
                        {Array.isArray(eventList) &&
                            eventList.map((event: FormData, index) => {
                                if (event.date === day) {
                                    return (
                                        <EventCardComponent
                                            key={index}
                                            index={index}
                                            color={event.color}
                                            day={event.date.toString()}
                                            invitee={event.invitee}
                                            name={event.name}
                                            time={event.time}
                                        />
                                    );
                                }
                            })}
                    </div>
                );
            })}
        </>
    );
};
