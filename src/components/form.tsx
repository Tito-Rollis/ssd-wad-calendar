import { useEffect, useRef, useState } from 'react';
import closeIcon from '../assets/close_icon.svg';
import { FormComponentProps, FormData } from '../types';
import { useAtom } from 'jotai';
import { ClickedDay, EventList, FormType, OpenModal } from '../atom/Store';

export const FormComponent = (props: FormComponentProps) => {
    const [formType] = useAtom(FormType);
    const [date] = useAtom(ClickedDay);
    const [, setOpenModal] = useAtom(OpenModal);
    const [eventList, setEventList] = useAtom(EventList);

    const nameRef = useRef<HTMLInputElement>(null);
    const inviteeRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);

    const [nameInputValue, setNameInputValue] = useState<string>('');
    const [inviteeInputValue, setInviteeInputValue] = useState<string>('');
    const [timeInputValue, setTimeInputValue] = useState<string>('');

    const previousValueInput = () =>
        eventList.map((event, index) => {
            if (index === date) {
                setNameInputValue(formType === 'edit' ? event.name : '');
                setInviteeInputValue(formType === 'edit' ? event.invitee : '');
            }
        });
    const handleNameChange = () => {
        if (nameRef.current) setNameInputValue(nameRef.current.value);
    };

    const handleInviteeChange = () => {
        if (inviteeRef.current) setInviteeInputValue(inviteeRef.current.value);
    };
    const handleTimeChange = () => {
        if (timeRef.current) {
            const [hours, minutes] = timeRef.current.value.split(':').map(String);

            if (hours === '00') {
                setTimeInputValue(`12:${minutes.toString()} am`);
            } else if (hours === '12') {
                setTimeInputValue(`12:${minutes.toString()} pm`);
            } else if (parseInt(hours) > 12) {
                setTimeInputValue(`${(parseInt(hours) - 12).toString()}:${minutes.toString()} pm`);
            } else {
                setTimeInputValue(`${hours}:${minutes} am`);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formInput: FormData = {
            name: nameInputValue,
            invitee: inviteeInputValue,
            time: timeInputValue,
            date,
            color: props.color,
        };

        // Conditional Render Form Component based on formType
        if (formType === 'add') {
            setEventList((prev) => [...prev, formInput]);
        } else if (formType === 'edit') {
            const updatedEvent: FormData[] = eventList.map((event, index) => {
                if (index === date) {
                    return { ...event, name: nameInputValue, invitee: inviteeInputValue, time: timeInputValue };
                } else {
                    return event;
                }
            });
            setEventList(updatedEvent);
        }
        handleClose();
    };

    const handleClose = () => setOpenModal(false);

    useEffect(() => {
        previousValueInput();
    }, [formType]);

    useEffect(() => {
        localStorage.setItem('Event', JSON.stringify(eventList));
    }, [eventList]);

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            method="dialog"
            className="w-full h-full bg-cyan-600 flex relative flex-col p-8 rounded-md"
        >
            <img
                onClick={() => handleClose()}
                className="absolute right-0 top-0 bg-white cursor-pointer"
                src={closeIcon}
            />
            <h1 className="font-medium text-lg text-white text-center">
                {formType === 'add' ? 'Event Form' : 'Edit Event Form'}
            </h1>

            {/* Inputs */}
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-1">
                    <label className="text-white">Name</label>
                    <input
                        required
                        value={nameInputValue}
                        onChange={() => handleNameChange()}
                        ref={nameRef}
                        className="w-full"
                        type="text"
                    />
                </div>

                <div className="flex flex-col gap-y-1 w-full1">
                    <label className="text-white">Invitee</label>
                    <input
                        required
                        value={inviteeInputValue}
                        onChange={() => handleInviteeChange()}
                        ref={inviteeRef}
                        className="w-full"
                        type="email"
                    />
                </div>

                <div className="flex flex-col gap-y-1 w-full1">
                    <label className="text-white">Time</label>
                    <input required onChange={() => handleTimeChange()} ref={timeRef} className="w-full" type="time" />
                </div>
            </div>

            <button className="bg-blue-400 text-white font-medium py-1 mt-4 hover:opacity-90 transition" type="submit">
                Submit form
            </button>
        </form>
    );
};
