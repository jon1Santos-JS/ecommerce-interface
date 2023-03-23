import { Meal } from '@/pages';
import { createContext } from 'react';

export interface ProductModalTypes {
    meal: Meal | null;
    onClose: () => void;
    isClosed: boolean;
}

export default createContext<ProductModalTypes | null>(null);
