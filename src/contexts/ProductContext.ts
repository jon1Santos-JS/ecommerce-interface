import { Meal } from '@/pages';
import { createContext } from 'react';

export default createContext<Meal | null>(null);
