import { atom } from 'jotai';
import { FormData } from '../types';

export const OpenModal = atom(false);
export const ClickedDay = atom(0);
export const EventList = atom<FormData[]>([]);
export const FormType = atom<'add' | 'edit'>('add');
export const Index = atom(0);
