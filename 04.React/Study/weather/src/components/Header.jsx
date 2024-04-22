import Clock from './Clock';
import ToggleBtn from './ToggleBtn';
import Search from './Search';
import Nav from './Nav';
import { useMediaQuery } from 'react-responsive';
import NavMobile from './NavMobile';

export default function Header() {
    const isMobile = useMediaQuery({ maxWidth: 1024 });

    return (
        <>
            {!isMobile ? <Nav /> : <NavMobile />}
            <Clock />
            <ToggleBtn />
            <Search />
        </>
    );
}
