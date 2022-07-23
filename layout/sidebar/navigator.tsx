import React from 'react'
import Accordion from '@/components/core/accordion'
import { useTransHook } from '@/locales/hooks'
import DBIcon from '@/public/svgs/dashboard.svg'
import SpIcon from '@/public/svgs/shopping-bag.svg'
import OrderIcon from '@/public/svgs/clipboard-text.svg'
import Profile from '@/public/svgs/profile-2user.svg'
import Wallet from '@/public/svgs/wallet-money.svg'
import Target from '@/public/svgs/target.svg'
import Chart from '@/public/svgs/chart-2.svg'
import Link from 'next/link'
import './style.scss'
import { useRouter } from 'next/router'

const routes = [
    {
        href: '/',
        key: 'DASHBOARD',
        icon: <DBIcon />,
    },
    {
        key: 'MANAGE_PRODUCTS',
        icon: <SpIcon />,
        submenus: [
            {
                href: '/orders',
                key: 'ORDER_LIST',
            },
            {
                href: '/order-detail',
                key: 'ORDER_DETAIL',
            },
            {
                href: '/orders/cenceled',
                key: 'CANCELED_ORDERS',
            },
        ],
    },
    {
        href: '/orders',
        key: 'MANAGE_ORDERS',
        icon: <OrderIcon />,
        submenus: [
            {
                href: '/products',
                key: 'ORDER_LIST',
            },
        ],
    },
    {
        href: '/customers',
        key: 'MANAGE_CUSTOMERS',
        icon: <Profile />,
        submenus: [
            {
                href: '/products',
                key: 'ORDER_LIST',
            },
        ],
    },
    {
        href: '/funds',
        key: 'MANAGE_FUNDS',
        icon: <Wallet />,
        submenus: [
            {
                href: '/products',
                key: 'ORDER_LIST',
            },
        ],
    },
    {
        href: '/shop-records',
        key: 'MANAGE_SHOP_RECORDS',
        icon: <img src={'/svgs/menu-board.png'} alt="" className="w-6 h-6" />,
        submenus: [
            {
                href: '/products',
                key: 'ORDER_LIST',
            },
        ],
    },
    {
        href: '/target',
        key: 'MANAGE_TARGET',
        icon: <Target />,
        submenus: [
            {
                href: '/products',
                key: 'ORDER_LIST',
            },
        ],
    },
    {
        href: '/revenue-report',
        key: 'REVENUE_REPORT',
        icon: <Chart />,
        submenus: [
            {
                href: '/products',
                key: 'ORDER_LIST',
            },
        ],
    },
]
type Submenu = {
    href: string
    key: string
}
type NavitemProp = {
    key: string
    icon?: any
    href?: string
    submenus?: Submenu[]
}
const NavItem = ({ data }: { data: NavitemProp }) => {
    const { t } = useTransHook()
    const router = useRouter()
    console.log(
        '🚀 ~ file: navigator.tsx ~ line 121 ~ NavItem ~ router',
        router,
    )
    return (
        <Accordion
            href={data.href}
            icon={data.icon}
            titleClass="py-0 leading-6"
            title={t(data.key)}
        >
            {data.submenus && data.submenus.length && (
                <div className="pl-10 pt-[18px] nav-item">
                    {data.submenus.map((item, index) => (
                        <Link key={index} href={item.href} passHref>
                            <div
                                className={`submenu ${
                                    router.pathname === item.href && 'active'
                                }`}
                            >
                                {t(item.key)}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </Accordion>
    )
}
const Navigator = () => {
    return (
        <div className="flex flex-col gap-[40px] mt-8">
            {routes.map((item, index) => (
                <NavItem key={index} data={item} />
            ))}
        </div>
    )
}

export default Navigator
