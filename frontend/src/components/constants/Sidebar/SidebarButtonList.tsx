import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import PathRouteList from '@/helper/pathRouteList';
import { useContext } from 'react';
import { SlHome } from 'react-icons/sl';
import { MdMenuBook, MdRsvp } from 'react-icons/md';
import { useRouter } from 'next/router';
import type { SidebarButtonType } from '@/components/atoms/Store/Sidebar/Button/SidebarButton';

const SidebarButtonList = () => {
    const {
        storeInfo: { config }
    } = useContext(StoreContext)!;
    const router = useRouter();
    const pathList = PathRouteList();

    const list: SidebarButtonType[] = [
        {
            title: 'Home',
            icon: (
                <SlHome
                    style={{
                        color: config.thirdColor,
                        verticalAlign: 'middle'
                    }}
                    size={'28px'}
                />
            ),
            active: pathList.length === 2 || pathList.length === 3,
            onClick: () => {
                router.push(`/restaurant/${pathList[1]}`);
            },
            render: pathList.length <= 2
        },
        {
            title: 'Menu',
            icon: (
                <MdMenuBook
                    style={{
                        color: config.thirdColor,
                        verticalAlign: 'middle'
                    }}
                    size={'32px'}
                />
            ),
            active: pathList[3] === 'menu',
            onClick: () => {
                router.push(`/restaurant/${pathList[1]}/${pathList[2]}/menu`);
            },
            render: pathList.length > 2
        },
        {
            title: 'Reservation',
            icon: (
                <MdRsvp
                    style={{
                        color: config.thirdColor,
                        verticalAlign: 'middle'
                    }}
                    size={'32px'}
                />
            ),
            active: pathList[3] === 'rsvp',
            onClick: () => {
                router.push(`/restaurant/${pathList[1]}/rsvp`);
            },
            render: pathList.length === 2
        }
    ];

    return list;
};

export default SidebarButtonList;
