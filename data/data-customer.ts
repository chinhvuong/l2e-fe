import { ICustomerDetail } from '@/contants/interfaces'
import { EStatusOrder } from '@/contants/common'

export const dataCustomer = [
    {
        name: 'Tran Thi Trinh',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ETPUM3G6l9Pe3VTHbMbx_yfLk5KqZ_kU9w&usqp=CAU',
        totalOrderAmount: '2.000.000 đ',
        lastOrderDate: '27/7/2022',
    },
    {
        name: 'Tran Thi Trinh',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ETPUM3G6l9Pe3VTHbMbx_yfLk5KqZ_kU9w&usqp=CAU',
        totalOrderAmount: '2.000.000 đ',
        lastOrderDate: '27/7/2022',
    },
    {
        name: 'Tran Thi Trinh',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ETPUM3G6l9Pe3VTHbMbx_yfLk5KqZ_kU9w&usqp=CAU',
        totalOrderAmount: '2.000.000 đ',
        lastOrderDate: '27/7/2022',
    },
    {
        name: 'Tran Thi Trinh',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ETPUM3G6l9Pe3VTHbMbx_yfLk5KqZ_kU9w&usqp=CAU',
        totalOrderAmount: '2.000.000 đ',
        lastOrderDate: '27/7/2022',
    },
]

export const dataCustomerDetail: ICustomerDetail = {
    name: 'Tran Thi Trinh',
    avgOrderPrice: '600.000 d',
    cumulativeRevenue: '2.000.000 đ',
    lastOrderDate: '27/7/2022 16:00',
    totalOrder: 6,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ETPUM3G6l9Pe3VTHbMbx_yfLk5KqZ_kU9w&usqp=CAU',
    orders: [
        {
            orderCode: '#015',
            price: '80.000 đ',
            name: 'Mặt nạ từ thiên nhiên',
            quantity: 1,
            time: '27/7/2022 16:00',
            status: EStatusOrder.canceled as any,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmWSR-bANXE5sNDP3dyPJrFlCvku1OQ-gyTg&usqp=CAU',
        },
        {
            orderCode: '#015',
            price: '80.000 đ',
            name: 'Mặt nạ từ thiên nhiên',
            quantity: 1,
            time: '27/7/2022 16:00',
            status: EStatusOrder.delivering as any,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmWSR-bANXE5sNDP3dyPJrFlCvku1OQ-gyTg&usqp=CAU',
        },
        {
            orderCode: '#015',
            price: '80.000 đ',
            name: 'Mặt nạ từ thiên nhiên',
            quantity: 1,
            time: '27/7/2022 16:00',
            status: EStatusOrder.outStock as any,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmWSR-bANXE5sNDP3dyPJrFlCvku1OQ-gyTg&usqp=CAU',
        },
        {
            orderCode: '#015',
            price: '80.000 đ',
            name: 'Mặt nạ từ thiên nhiên',
            quantity: 1,
            time: '27/7/2022 16:00',
            status: EStatusOrder.delivering as any,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmWSR-bANXE5sNDP3dyPJrFlCvku1OQ-gyTg&usqp=CAU',
        },
    ],
    address: [
        {
            location: 'Số 105 La Khê, Phường La Khê, Quận Hà Đông, Hà Nội',
            phone: '0962734562',
        },
        {
            location: 'Số 105 La Khê, Phường La Khê, Quận Hà Đông, Hà Nội',
            phone: '0962734562',
        },
    ],
}
