import Image from 'next/image';
import React from 'react';
import { styles } from '../styles/styles';
import ReviewCard from './ReviewCard';

type Props = {};

export const reviews = [
  {
    name: 'Wale Adenuga',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    profession: 'Media conglomerate',
    comment:
      'Hands down the best developer I have worked with Hands down the best developer I have worked with Hands down the best developer I have worked with',
  },
  {
    name: 'Wale Adenuga',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    profession: 'Media conglomerate',
    comment: 'Hands down the best developer I have worked with',
  },
  {
    name: 'Wale Adenuga',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    profession: 'Media conglomerate',
    comment:
      'illum maiores vel. Consequuntur asperiores quae iste modi distinctio expedita',
  },
  {
    name: 'Wale Adenuga',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    profession: 'Media conglomerate',
    comment:
      'Hands down the best developer I have worked with cupiditate deleniti architecto, illum maiores vel. Consequuntur asperiores quae iste modi distinctio expedita',
  },
  {
    name: 'Wale Adenuga',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    profession: 'Media conglomerate',
    comment:
      'Hands down the billum maiores vel. Iste modi distinctio expedita ',
  },
  {
    name: 'Wale Adenuga',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    profession: 'Media conglomerate',
    comment: 'cupiditate quis laudantium sequi quas in sed voluptatum tenetur adquasi pariatur velit dicta tempore temporibus quia quidem.',
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto ">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require('../../../public/assets/our students.jpg')}
            alt=""
            width={400}
            height={400}
          />
        </div>

        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Our Strength
            </span>{' '}
            <br /> See What They Say About Us
          </h3>

          <br />

          <p className={styles.label}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
            voluptatem illo a, officia similique sapiente adipisci quos
            cupiditate deleniti architecto, illum maiores vel. Consequuntur
            asperiores quae iste modi distinctio expedita assumenda vero
            cupiditate quis laudantium sequi quas in sed voluptatum tenetur ad,
            quasi pariatur velit dicta tempore temporibus quia quidem.
          </p>
        </div>
      </div>

      <br />
      <br />

      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(4)]:!mt-[-50px] md:[&>*:nth-child(6)]:!mt-[-30px] ">
        {reviews &&
          reviews.map((i, index) => <ReviewCard review={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
