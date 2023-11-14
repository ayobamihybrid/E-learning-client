import React, { FC } from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LabelList,
} from 'recharts';
import { useGetCourseAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '../../styles/styles';
import Loader from '../../Loader';

type Props = {};

const CourseAnalytics: FC<Props> = ({}) => {
  const { data, isLoading } = useGetCourseAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data?.courses?.last12Months?.forEach((month: any) => {
      analyticsData.push({ name: month.month, uv: month.count });
    });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px] ml-[20px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center ">
            <ResponsiveContainer width="90%" height="60%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>

                <YAxis domain={[minValue, 'auto']} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};
export default CourseAnalytics;
