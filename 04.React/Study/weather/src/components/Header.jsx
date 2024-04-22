import Clock from './Clock';
import ToggleBtn from './ToggleBtn';
import Search from './Search';
import Nav from './Nav';
import NavMobile from './NavMobile';
import { useMediaQuery } from 'react-responsive';

export default function Header({ checkHandler }) {
    const isMobile = useMediaQuery({ maxWidth: 1024 });

    return (
        <>
            {!isMobile ? <Nav /> : <NavMobile />}
            <Clock />
            <ToggleBtn checkHandler={checkHandler} />
            <Search />
        </>
    );
}
