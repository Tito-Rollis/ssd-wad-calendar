type EventCardComponentProps = {
    name: string;
    invitee: string;
    time: string;
    color: string;
};

export const EventCardComponent = (props: EventCardComponentProps) => {
    return (
        <div className={`flex p-1 ${props.color} flex-col w-full h-fit`}>
            <p>{props.name}</p>
            <p>{props.invitee}</p>
            <p>{props.time}</p>
        </div>
    );
};
