import React from "react";
import { assets } from "../assets/assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-700 font-medium">
        <p>
          ABOUT <span>US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-90 " src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-700">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
            officiis ullam eius consequatur tempora quas dolore impedit
            voluptas, expedita eum veritatis quisquam dignissimos laborum
            eligendi vel voluptatum id itaque mollitia.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            aut voluptatem id voluptatibus cupiditate? Itaque at sed dolores
            placeat quia libero nulla ad amet alias dolor? Nemo consequuntur
            soluta numquam?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium aperiam, aliquam debitis beatae maxime at impedit,
            ratione deleniti consequatur blanditiis, hic perspiciatis mollitia?
            Explicabo, laborum totam pariatur veritatis ipsum est. Adipisci
            nesciunt nihil ipsum incidunt omnis harum totam cupiditate vel,
            quasi illo veniam voluptas at ducimus ad facilis ex atque sapiente
            excepturi quod doloribus laboriosam officiis sit laborum? Iure,
            quia?
          </p>
        </div>
      </div>
      <div>
        <p>Why choose Us</p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border border-gray-300 px-10  py-16flex flex-col gap-5 text-[15px]">
          <b>Effieciency</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa est architecto voluptatum laborum quisquam, dolorum necessitatibus soluta nobis quo aut aliquam asperio</p>
        </div>
        <div className="border border-gray-300 px-10  py-16flex flex-col gap-5 text-[15px]">
          <b>Convience</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa est architecto voluptatum laborum quisquam, dolorum necessitatibus soluta nobis </p>
        </div>
        <div className="border border-gray-300 px-10  py-16flex flex-col gap-5 text-[15px]">
          <b>personalization</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa est architecto voluptatum laborum quisquam, dolorum necessitatibus soluta nobis </p>
        </div>
      </div>
    </div>
  );
};

export default About;
