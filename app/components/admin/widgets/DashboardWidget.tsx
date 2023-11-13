import React, { FC, useEffect, useState } from 'react';
import UserAnalytics from '../analytics/UserAnalytics';
import { BiBorderLeft } from 'react-icons/bi';
import { PiUsersFourLight } from 'react-icons/pi';
import { Box, CircularProgress } from '@mui/material';
import OrderAnalytics from '../analytics/OrderAnalytics';
import AllInvoices from '../order/AllInvoices';
import {
  useGetOrderAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from '@/redux/features/analytics/analyticsApi';

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? 'info' : 'error'}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidget: FC<Props> = ({ open, value }) => {
  const [ordersPercentage, setOrdersPercentage] = useState<any>();
  const [compareUserPercentage, setCompareUserPercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: orderData, isLoading: loadingOrders } =
    useGetOrderAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && loadingOrders) {
      return;
    } else {
      if (data && orderData) {
        const usersLastTwoMonths = data?.users?.last12months?.slice(-2);
        const ordersLastTwoMonths = orderData?.orders?.last12Months?.slice(-2);

        if (usersLastTwoMonths === 2 && ordersLastTwoMonths === 2) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setCompareUserPercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersPercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [data, isLoading, loadingOrders, orderData]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%, 25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pl-[76px] mt-[-60px]">
          <div className="w-[95%] dark:bg-[#111c43] rounded-sm shadow-lg">
            <div className="flex items-center p-5 justify-between">
              <div>
                <BiBorderLeft className="dark:text-[#45cba0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {ordersPercentage?.currentMonth}
                </h5>

                <h5 className="py-2 font-Poppins text-black dark:text-[#45cba0] text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>

              <div>
                <CircularProgressWithLabel
                  value={
                    ordersPercentage?.percentChange > 0
                      ? ordersPercentage?.percentChange
                      : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {ordersPercentage?.percentChange > 0
                    ? '+' + ordersPercentage?.percentChange.toFixed(2)
                    : '-' + ordersPercentage?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className="w-[95%] dark:bg-[#111c43] rounded-sm shadow-lg my-8">
            <div className="flex items-center p-5 justify-between">
              <div>
                <PiUsersFourLight className="dark:text-[#45cba0] text-[#000] text-[30px] " />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px] ">
                  {compareUserPercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#fff] text-black text-[20px] font-[400] ">
                  New Users
                </h5>
              </div>

              <div>
                <CircularProgressWithLabel
                  value={
                    compareUserPercentage?.percentChange >
                    compareUserPercentage?.percentChange
                      ? 100
                      : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {compareUserPercentage?.percentChange > 0
                    ? '+' + compareUserPercentage?.percentChange.toFixed(2)
                    : '-' + compareUserPercentage?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[65%, 35%]">
        <div className="dark:bg-[#111c43] w-[90%] mt-[30px] h-[40vh] shadow-lg ml-[73px]">
          <OrderAnalytics isDashboard={true} />
        </div>

        <div className="p-5 mt-[20px] ml-[47px] w-[94%] z-[-1]">
          <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3 ">
            Recent transactions
          </h5>

          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;
