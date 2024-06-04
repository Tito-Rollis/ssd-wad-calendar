import { useAtom } from 'jotai';
import deleteIcon from '../assets/delete_icon.svg';
import editIcon from '../assets/edit_icon.svg';
import { EventCardComponentProps } from '../types';
import { ClickedDay, EventList, FormType, OpenModal } from '../atom/Store';
import { useEffect } from 'react';

export const EventCardComponent = (props: EventCardComponentProps) => {
    const [eventList, setEventList] = useAtom(EventList);
    const [, setOpenModal] = useAtom(OpenModal);
    const [, setFormType] = useAtom(FormType);
    const [, setDate] = useAtom(ClickedDay);

    const handleDelete = () => {
        setEventList(eventList.filter((_, index) => index !== props.index));
    };
    const handleEdit = () => {
        setFormType('edit');
        setOpenModal(true);
        setDate(props.index);
    };

    useEffect(() => {
        localStorage.setItem('Event', JSON.stringify(eventList));
    }, [eventList]);

    return (
        <div
            style={{ backgroundColor: `hsl(${props.color}, 100%, 50%)` }}
            className={`flex p-1 event-card flex-col w-full h-fit`}
        >
            <div className="flex items-center justify-between">
                <p>{props.name}</p>

                {/* Icons */}
                <div className="flex items-center gap-x-1">
                    <img
                        onClick={() => handleDelete()}
                        className="cursor-pointer hover:opacity-50 transition"
                        src={deleteIcon}
                    />
                    <img
                        onClick={() => handleEdit()}
                        className="cursor-pointer hover:opacity-50 transition"
                        src={editIcon}
                    />
                </div>
            </div>
            <p>{props.invitee}</p>
            <p>{props.time}</p>
        </div>
    );
};
