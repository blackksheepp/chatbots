"use client";
import Image from "next/image";
import React, { useState } from "react";
import PizzaBot from "./bot";

export default function Pizza() {
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(false);

    return (
        <>
            <div className="absolute z-0 w-full h-screen bg-[#F2F3EA] ~p-0/5 overflow-hidden">
                <div className="absolute z-10 lg:z-0 w-full py-4 ~pr-0/20 font-caveat">
                    <nav className="~px-4/12 flex flex-row items-center lg:items-start justify-between text-[#283118]">
                        <Image
                            src="/img/pizza-logo.png"
                            alt="pizza"
                            width={100}
                            height={100}
                            sizes="100vw"
                            className="pointer-events-none ~w-[4rem]/[6.25rem] h-auto"
                        />

                        <div className="flex flex-row items-center ~gap-3/10 ~text-base/2xl font-bold lg:mt-4">
                            <div className="hidden lg:flex flex-row items-center gap-10">
                                <button>Pizza's</button>
                                <button>Delivery</button>
                                <button>About</button>
                            </div>
                            <i className="hidden lg:block ri-shopping-cart-2-fill text-3xl"></i>
                            <button className="~py-1/2 ~px-2/4 ~text-base/2xl bg-[#F36652] hover:bg-[#283118] hover:delay-150 hover:ease-in-out hover:transition-all hover:duration-300 text-[#F2F3EA] rounded-lg shadow-sm lg:shadow-lg">Order Now!</button>
                            <i onClick={() => setMenu(!menu)} className="cursor-pointer lg:hidden ri-menu-line text-[#283118] text-2xl"></i>
                        </div>
                    </nav>
                    <menu className={`w-full px-14 ${menu ? 'h-48 opacity-100 visible' : 'h-0 opacity-0 invisible'}  bg-[#F2F3EA] transition-all ease-in-out duration-500 lg:hidden w-full flex flex-col items-end gap-3 text-2xl text-[#283118] font-bold`}>
                        <button>Pizza's</button>
                        <button>Delivery</button>
                        <button>About</button>
                        <div className="cursor-pointer flex flex-row gap-1">
                            <i className="ri-shopping-cart-2-fill text-2xl"></i>
                            <p>Cart</p>
                        </div>
                    </menu>
                </div>

                <div className="absolute -z-10 w-full h-[70%] mx-auto inset-x-0 max-w-max ~leading-[20rem]/[37rem] select-none pointer-events-none">
                    <p className="~text-[10rem]/[37rem] font-nighty text-[#283118]">PIEZA</p>
                </div>

                <div className="absolute -z-10 w-full h-screen pointer-events-none">
                    <div className="relative w-full h-full flex flex-col items-center ~mt-[7.5rem]/[12.5rem] ~pr-0/20">
                        <div className="absolute ~w-[20rem]/[70rem] ~h-[8rem]/[20rem] bg-[#F36652] ~mt-[6.1rem]/[25rem] rounded-[100%] shadow-2xl"></div>
                        <Image
                            src="/img/pizza.png"
                            alt="pizza"
                            width={100}
                            height={100}
                            sizes="100vw"
                            className="absolute ~w-[24rem]/[75rem] h-auto ml-6"
                        />
                    </div>
                </div>


                <div className={`${open && "pointer-events-none"} w-full ~h-[13rem]/[26.875rem] ~mt-[25rem]/[55rem] lg:~mt-[50rem]/[35rem] flex flex-col justify-between gap-10`}>
                    <div className="px-14 flex flex-col self-center md:self-end items-center md:items-end pointer-events-none">
                        <p className="font-caveat font-semibold ~text-2xl/4xl text-[#283118]">Get Italian taste in your city</p>
                        <p className="font-caveat ~text-lg/2xl text-[#ff8979]">Satisfy your cravings with every bite</p>
                    </div>

                    <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between">
                        <div className="~px-0/20 flex flex-row gap-3 items-center justify-center pointer-events-none">
                            <Image
                                src="/img/qr.svg"
                                alt="qr"
                                width={100}
                                height={100}
                                sizes="100vw"
                                className="w-[70px] h-auto bg-[#F36652] rounded-lg text-[#F2F3EA] "
                            />
                            <div className="flex flex-col items-start">
                                <p className="font-caveat font-semibold ~text-2xl/3xl text-[#283118]">Scan the QR to order</p>
                                <p className="font-caveat ~text-lg/2xl text-[#F36652]">Catch the latest offer</p>
                            </div>
                        </div>

                        {!open && (
                            <div onClick={() => setOpen(true)} className="absolute bottom-8 right-4 md:relative md:bottom-auto md:right-auto w-[280px] lg:w-[240px] h-[80px] md:pr-4 lg:pr-14  flex flex-col justify-center cursor-pointer">
                                <p className="absolute ml-[6.1rem] lg:ml-0 md:mr-0 lg:mr-[0] ~mb-[4.5rem]/[4rem] bg-[#F36652] font-bold font-caveat text-xl ~px-2/3 py-1 w-fit rounded-t-lg rounded-bl-lg">Need Help?</p>
                                <Image
                                    src="/img/pizza-icon.png"
                                    alt="pizza"
                                    width={100}
                                    height={100}
                                    sizes="100vw"
                                    className="w-[100px] h-auto pointer-events-none self-end md:mb-2 lg:mb-0"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={`${open ? "" : "pointer-events-none"} absolute z-10 w-full h-full`}>
                <PizzaBot open={open} setOpen={setOpen} />
            </div>
        </>
    );
}