export type FormData = {
    name: string;
    invitee: string;
    time: string;
    date: number;
    color: string;
};

export type EventCardComponentProps = {
    day: string;
    name: string;
    invitee: string;
    time: string;
    color: string;
    index: number;
};

export type ModalProps = {
    color: string;
};

export type FormComponentProps = {
    color: string;
};
