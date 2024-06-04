import { useEffect, useRef } from 'react';
import { FormComponent } from './form';
import { useAtom } from 'jotai';
import { OpenModal } from '../atom/Store';
import { ModalProps } from '../types';

export const ModalDialog = (props: ModalProps) => {
    const [openModal] = useAtom(OpenModal);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current && openModal) {
            dialogRef.current.showModal();
        }
    }, [openModal]);

    return (
        <dialog
            ref={dialogRef}
            className="backdrop:bg-black open:bg-opacity-0 open:bg-white backdrop:opacity-40 flex justify-center items-center h-1/2 w-1/2 "
        >
            {openModal && <FormComponent color={props.color} />}
        </dialog>
    );
};
