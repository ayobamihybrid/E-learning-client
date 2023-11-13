import React from 'react';
import { styles } from '../components/styles/styles';

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <br />

      <h1 className={`${styles.title} 800px:text-[45px]`}>
        What is{' '}
        <span className="!bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ">
          E-learning
        </span>
      </h1>

      <br />

      <div className="w-[95%] 800px:w-[85%] m-auto ">
        <p className="text-[18px] font-Poppins ">
          Voluptas veniam doloribus nulla architecto voluptate maxime deserunt.
          Id fugit corrupti laboriosam esse, impedit eaque minus placeat
          veritatis asperiores magnam qui doloremque minima ullam libero autem
          laborum ducimus perspiciatis reprehenderit alias cum maxime veniam
          quidem! Assumenda est, laudantium cum saepe iusto expedita illo,
          aliquid, laborum cumque eos enim culpa dolorum odit dolore pariatur
          quidem modi. Cumque, illo voluptatum rerum alias necessitatibus saepe
          blanditiis? Corrupti similique vitae aliquid debitis eum facere
          aliquam ipsum hic consequuntur accusantium eius quisquam enim nihil
          quidem libero, modi molestiae laudantium minima a cumque? Doloribus,
          ut. Quas, dolorum sunt.
          <br />
          <br />
          Cumque, illo voluptatum rerum alias necessitatibus saepe blanditiis?
          Corrupti similique vitae aliquid debitis eum facere aliquam ipsum hic
          consequuntur accusantium eius quisquam enim nihil.
          <br />
          <br />
          Assumenda est, laudantium cum saepe iusto expedita illo, aliquid,
          laborum cumque eos enim culpa dolorum odit dolore pariatur quidem
          modi. Cumque, illo voluptatum rerum alias necessitatibus saepe
          blanditiis.
          <br />
          <br />
          Cumque, illo voluptatum rerum alias necessitatibus saepe blanditiis?
          Cor aliquid debitis eum facere aliquam ipsum hic consequuntur
          accusantium eius quisquam enim nihil eos enim culpa dolorum odit
          dolore pariatur quidem modi. Cumque, saepe blanditiis.
        </p>

        <br />

        <span className="font-Poppins text-[22px]">Balogun Ayobami</span>

        <h5 className="text-[18px] font-Poppins pb-5 ">Founder and CEO</h5>
      </div>
    </div>
  );
};

export default About;
