import React, { useState } from "react";

import G14 from "../assets/images/contact/g14.png";
import Tel from "../assets/images/contact/tel.png";
import Call from "../assets/images/offer/call.png";
import Car from "../assets/images/offer/car.png";
import Location from "../assets/images/contact/location.png";
import Warehouse from "../assets/images/contact/warehouse.png";
import Whyus from "../assets/images/contact/whyus.png";
import { toast } from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirm = window.confirm("Do you want to submit this message?");
    if (!confirm) return;

    toast.success("Message submitted successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className='container text-text mt-36'>
  
    {/* main body */}
      <div className='flex flex-col md:flex-row text-center justify-center mt-4 md:mt-6 mb-10 '>
       <div className='flex justify-center items-start flex-col gap-4 md:w-2/3 md:px-10'>
        <h1 className='text-2xl font-semibold md:font-bold md:text-4xl px-4 text-text'>Information About Us</h1>
        <p className='text-justify p-4 md:w-[95%] text-text'>
        At Jutta Lagani, we believe the right pair of shoes can change how you move, feel, and express yourself. 
        Our goal is to deliver footwear that blends comfort, durability, and modern style for every step of your journey.
        From everyday casual wear to performance-ready sneakers, we design shoes that fit your lifestyle perfectly.
        We focus on quality materials, precise craftsmanship, and trend-driven designs to ensure every pair lasts 
        longer and looks better. At SoleCraft, shoes are not just accessories — they are a statement of confidence and 
        comfort.
        </p>

        <img src={Warehouse } alt='main logo warehouse' 
        className='p-4 md:w-[95%] md:h-[75%] rounded-md transform transition hover:scale-105'/>
       </div>


        {/* Contact Way */}
        <div className="flex justify-start items-center flex-col gap-4">
          <h1 className="text-2xl font-semibold md:font-bold md:text-4xl mb-4 px-4 text-text">
            Contact Way
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
            {/* first one */}
            <div className="flex items-center space-x-3  bg-accent p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <img 
                src={Call} 
                alt="Call" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-text text-sm text-left">
                <p className="font-medium">Tel: +977 9816413787</p>
                <p className="font-medium">Email: support@juttalagani.com</p>
              </div>
            </div>

            {/* second one */}
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <img 
                src={Tel} 
                alt="Telephone" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-text text-sm text-left">
                <p className="font-medium">Support Forums </p>
                <p className="font-medium">24/7 Open For All</p>
              </div>
            </div>

            {/* third one */}
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <img 
                src={Location} 
                alt="Location" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-text text-sm text-left">
                <p className="font-medium">Sainamaina -10 Saljhandi</p>
                <p className="font-medium">Rupandehi, Mahindra highway</p>
              </div>
            </div>

            {/* fourth one */}
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <img 
                src={Car} 
                alt="delivery" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-text text-sm text-left">
                <p className="font-medium">Free standard Delivery</p>
                <p className="font-medium">all over Nepal</p>
              </div>
            </div>
          </div>

          <section className="mt-14 mb-10 flex flex-col items-center text-center gap-6 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-text">Why Choose Us?</h2>
          <img 
            src={Whyus} 
            alt="Why Choose Us" 
            className="w-full md:w-[95%] lg:w-[95%] object-contain rounded-md shadow-md hover:scale-105 transition"
          />
          
          <p className="max-w-2xl text-justify items-start py-4  text-text ">
           At JuttaLagani, we combine innovative design, premium materials, and everyday comfort to create shoes you’ll 
           love wearing. Our footwear is crafted to support your feet while keeping you stylish in every situation.
          We are committed to reliable quality, affordable pricing, and customer-first service. Whether you’re walking,
           running, or heading out in style, Juttalagani ensures every step feels confident, comfortable, and effortless.
          </p>
        </section>

        </div>   
      </div>


      {/* GET IN TOUCH */}
      <section className="py-2 container px-2 md:px-12">
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 px-6 items-center">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left text-text">
                Get In Touch
              </h2>
              <p className="text-text text-left max-w-xl">
                We’d love to hear from you! Whether you have a question about sizing,
                delivery, or product details, our team is always ready to help.
                Reach out anytime — we’re here to make your shoe shopping smooth and satisfying.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-xl"
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full h-11 border border-gray-300 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full h-11 border border-gray-300 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject*"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full h-11 border border-gray-300 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <textarea
                name="message"
                placeholder="Type Your Message*"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="submit"
                className="w-40 h-11 bg-primary text-white rounded-md mt-2 hover:scale-105 transition-transform"
              >
                Submit
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-start">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <img
                src={G14}
                alt="Get In Touch"
                className="w-full rounded-md hover:scale-105 transition-transform"
              />
            </div>
          </div>

        </div>
      </section>

 
    </div>
  )
}

export default Contact;
