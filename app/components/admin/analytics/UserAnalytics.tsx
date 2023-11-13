import React, { FC } from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from 'recharts';
import { useGetUsersAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi';
import { styles } from '../../styles/styles';
import Loader from '../../Loader';

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData = [
    { name: 'Jan 2023', count: 87 },
    { name: 'Feb 2023', count: 327 },
    { name: 'Mar 2023', count: 237 },
    { name: 'Apr 2023', count: 7 },
    { name: 'May 2023', count: 327 },
    { name: 'Jun 2023', count: 37 },
    { name: 'Jul 2023', count: 475 },
    { name: 'Aug 2023', count: 54 },
    { name: 'Sept 2023', count: 845 },
    { name: 'Oct 2023', count: 94 },
    { name: 'Nov 2023', count: 156 },
    { name: 'Dec 2023', count: 24 },
  ];

  //   const analyticsData: any = [];

  //   data &&
  //     data.courses.last12Months.forEach((month: any) => {
  //       analyticsData.push({ name: month.month, count: month.count });
  //     });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard
              ? 'pt-[50px]'
              : 'pt-[50px] dark:bg-[#111c43] shadow-sm pb-5 rounded-sm '
          }`}
        >
          <div className={`${isDashboard ? '!ml-8 mb-5' : 'ml-8'}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && '!text-[20px]'
              } px-5 !text-start`}
            >
              Users Analytics
            </h1>

            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? 'h-[50vh] mt-[-90px]' : 'h-[80vh]'
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? '95%' : '90%'}
              height={isDashboard ? '50%' : '100%'}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                >
                  <LabelList dataKey="uv" position="top" />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};
export default UserAnalytics;
