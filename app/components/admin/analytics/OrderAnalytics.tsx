import React, { FC } from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useGetUsersAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi';
import { styles } from '../../styles/styles';
import Loader from '../../Loader';

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((month: any) => {
      analyticsData.push({ name: month.month, count: month.count });
    });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? 'h-[30vh]' : 'h-[70vh]'}>
          <div
            className={`${
              isDashboard ? '!mt-[0px] pl-[40px] mb-2' : 'mt-[50px] pl-[40px]'
            }`}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && '!text-[20px]'
              } px-5 !text-start`}
            >
              Orders Analytics
            </h1>

            {!isDashboard && (
              <p className={`${styles.label} !px-5 !mb-10 `}>
                Last 12 months analytics data
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? 'h-[90%]' : 'h-full'
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? '100%' : '90%'}
              height={isDashboard ? '100%' : '100%'}
            >
              <LineChart
                data={analyticsData}
                height={300}
                width={500}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                {isDashboard && <Legend />}

                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderAnalytics;
