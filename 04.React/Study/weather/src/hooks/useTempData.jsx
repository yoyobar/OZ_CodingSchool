import { useContext } from 'react';
import { CheckStateContext } from '../App';

export default function useTempData(input, index) {
    const { check } = useContext(CheckStateContext);
    if (input) {
        return check ? Math.floor((input[index].temp * 9) / 5 + 32) + '°F' : input[index].temp + '°C';
    } else {
        return '';
    }
}
