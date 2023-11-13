/* eslint-disable react-hooks/exhaustive-deps */
import { useGetCourseDetailsQuery } from '../../../redux/features/courses/coursesApi';
import React, { useState, FC, useEffect } from 'react';
import Loader from '../Loader';
import Heading from '../../../app/utils/Heading';
import Header from '../header/Header';
import Footer from '../Footer';
import CourseDetails from './CourseDetails';
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from '../../../redux/features/orders/OrdersApi';
import { loadStripe } from '@stripe/stripe-js';

type Props = { id: string };

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetCourseDetailsQuery(id);

  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (config) {
      const publishablekey = config.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }

    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + '- E-learning'}
            description="E-learning is a programming community developed to help newbies programmers"
            keywords={data.course.tags}
          />

          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />

          {stripePromise && (
            <CourseDetails
              course={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
