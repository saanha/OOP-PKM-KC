/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import PathRouteList from '@/helper/pathRouteList';
import {
    type StoreInfoType,
    type StoreContextType,
    type FoodCartType,
    type FoodType,
    type TransactionType,
    type TableType,
    type TransactionItem
} from '@/types/store';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';

const StoreContext = createContext<StoreContextType | null>(null);

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [storeInfo, setStoreInfo] = useState<StoreInfoType>({
        merchantId: '',
        name: '',
        address: '',
        merchantUrl: '',
        config: {
            merchantConfigId: '',
            primaryColor: '#F6DC92',
            secondaryColor: '#865123',
            thirdColor: '#CC7930',
            logoPhotoPath: '',
            homePhotoPath: '',
            aboutPhotoPath: '',
            aboutDescription: 'Experience the delectable flavors of Italy in every bite at Casetta'
        }
    });
    const [cart, setCart] = useState<FoodCartType[]>([]);
    const [transaction, setTransaction] = useState<TransactionType>({
        transactionId: -1,
        createdAt: '',
        totalPrice: null,
        status: -1,
        tableMerchantId: '',
        transactionItem: []
    });
    const [table, setTable] = useState<TableType>({ tableId: '', name: '', size: 0 });
    const [confirmedCart, setConfirmedCart] = useState<TransactionItem[]>([]);
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const pathList = PathRouteList();
    const router = useRouter();

    const addItemToCart = (food: FoodType, qty: number, notes: string) => {
        const foodCart: FoodCartType = {
            ...food,
            quantity: qty,
            notes: notes,
            price: qty * food.price,
            transactionId: transaction.transactionId,
            foodId: food.foodId!
        };
        ToastSuccess(`${foodCart.name} added to cart!`);
        setCart((state) => [...state, foodCart]);
    };

    const removeItemFromCart = (index: number) => {
        setCart((state) => state.filter((s, i) => i !== index));
    };

    const getTable = async () => {
        try {
            const response = await api.get(`/merchant/table/find/${pathList[2]}`);
            if (response) {
                setTable(() => response.data.data.table);
                const transactions: TransactionType[] = response.data.data.table.transaction;
                if (transactions.length !== 0) {
                    if (transactions[transactions.length - 1].status === 0) {
                        setTransaction(() => transactions[transactions.length - 1]);
                        setConfirmedCart(() => transactions[transactions.length - 1].transactionItem);
                    }
                }
            }
        } catch (e) {
            console.log(e);
            ToastError('Table Id is invalid!');
            router.push('/restaurant');
        }
    };

    const getMerchant = async () => {
        try {
            if (pathList.length !== 2 && pathList.length !== 3 && pathList.length !== 4) setLoading(() => false);
            if (pathList[1] && pathList[1] !== '[restaurantId]') {
                const response = await api.get(`/merchant/get/url/${pathList[1]}`);
                if (response) {
                    setStoreInfo(() => response.data.data.merchant);
                    setLoading(() => false);
                    if (pathList.length !== 2) {
                        await getTable();
                    }
                }
            }
        } catch (e) {
            console.log(e);
            ToastError('Restaurant not found!');
            router.push('/restaurant');
        }
    };

    useEffect(() => {
        getMerchant();
    }, [router]);

    const value = {
        storeInfo,
        cart,
        confirmedCart,
        addItemToCart,
        openCart,
        setOpenCart,
        removeItemFromCart,
        transaction,
        table,
        setConfirmedCart,
        setCart,
        setTransaction
    };

    return <StoreContext.Provider value={value}>{loading ? null : <>{children}</>}</StoreContext.Provider>;
};

export { StoreContext, StoreContextProvider };
