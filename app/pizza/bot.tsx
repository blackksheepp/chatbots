"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { GetResponse } from "../backend/rasa";
import { GetFaqs } from "../db/queries/faqs";

const INVALID_QUESTION = "I'm not quite sure about that. Can you please clarify?";

const FaqResponses: Record<string, string> = {
    "We are open from 11 AM to 11 PM every day!": "What are your opening hours?",
    "Yes, we're open every day of the week!": "Are you open every day?",
    "Please check our offers page for the latest discounts!": "What are your offers?",
    "Yes, we offer dine-in services!": "Do you offer dine-in?",
    "Yes, you can place an order in advance.": "Can I place an order in advance?",
    "Absolutely! We can take bulk orders for events.": "Do you take bulk orders?",
    "Yes, you can customize your pizza with your choice of toppings!": "Can I make my own pizza?",
    "Yes, we offer delivery services. Let me know your location!": "Do you deliver pizzas?",
    "We accept cash, credit cards, and UPI payments!": "What payment methods can I use?",
    "Here’s our menu: [link to menu].": "What pizzas do you serve?",
    "Yes, we have a variety of vegetarian pizzas available!": "Do you offer vegetarian pizzas?",
    "Yes, we offer gluten-free pizza options!": "Do you have gluten-free pizzas?",
    "Yes, we have delicious vegan pizzas!": "Do you have vegan pizzas?",
    "Our best-selling pizza is the Margherita! You should try it!": "What’s your most popular pizza?",
    "We have amazing combo deals available! Let me know if you're interested!": "Do you have combo deals?",
    "Yes, we offer catering services for events!": "Do you offer catering for events?",
    "Yes, we have family-sized pizzas that are perfect for sharing!": "Do you have pizzas for families?",
    "Typically, your order will be ready in about 30 minutes!": "How long will my pizza take?"
};

interface ChatText {
    text: string;
    type: "user" | "bot";
    invalid?: boolean;
    faq?: boolean;
    ignore?: boolean;
}

const PizzaBot = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [query, setQuery] = useState("");
    const [menu, setMenu] = useState(false);

    const [chat, setChat] = useState<ChatText[]>([
        { text: "Hey, How can I help you?", type: "bot" },
    ]);

    const newMessageRef = React.useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        if (newMessageRef.current) {
            newMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chat]);

    const handleChatInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setChat([...chat, { text: query, type: "user" }]);
            setQuery("");
        }
    }

    useEffect(() => {
        (async () => {
            const lastChat = chat[chat.length - 1];
            if (lastChat.type === "user") {
                const response = await GetResponse(lastChat.text);
                setTimeout(() => {
                    setChat([...chat, { text: response, type: "bot", invalid: response === INVALID_QUESTION }])
                }, 100);
            }
        })()
    }, [chat])

    const handleClearChat = () => {
        setChat([chat[0]]);
        setQuery("");
    }

    const [faqs, setFaqs] = useState<string[]>([]);
    const gatherFaqs = async () => {
        const faqs = await GetFaqs();
        if (faqs.length > 0) setFaqs(faqs.flatMap((faq: any) => faq.text!));
    }
    useEffect(() => {
        gatherFaqs();
    }, [])

    const handleSendFaqs = async () => {
        await gatherFaqs();
        setChat([...chat,
        { text: "Show FAQs", type: "user", ignore: true },
        { text: "These are some frequently asked questions:", type: "bot", faq: true },
        ]);
    }

    const handleShowFaqAnswer = (faq: string) => {
        setChat([...chat, { text: faq, type: "user" }])
    }

    const handleContact = () => {
        setChat([...chat,
        { text: "Contact us", type: "user", ignore: true },
        { text: "You can contact us at 123-456-7890 or send us an email at 3k3Jt@example.com", type: "bot" },
        ])
    }

    return (
        <>
            <div className={`select-none  fixed ${open ? "w-full md:w-auto md:~bottom-6/12 md:~right-3/12 md:px-7 md:~py-3/4" : "~bottom-6/12 ~right-3/12 px-7 ~py-3/4"}`}>
                <div
                    className={`${open
                        ? "opacity-100 w-full h-screen md:~w-[24rem]/[32rem] md:~h-[28rem]/[40rem] md:rounded-[15px]"
                        : "opacity-0 ~w-4/8 ~h-4/8 rounded-[100%]"
                        } transition-all ease-in-out duration-500 bg-[#F2F3EA] backdrop-blur-lg shadow-sm 
                        relative flex flex-col justify-between
                        bg-[radial-gradient(#283118_1.5px,rgba(0,0,0,0)_1px)] [background-size:60px_60px] border border-border`}
                >
                    <div className="-z-10 w-[95%] h-[95%] absolute inset-0 bg-[radial-gradient(#283118_1.5px,rgba(0,0,0,0)_1px)] [background-size:60px_60px] translate-x-7 translate-y-7"></div>

                    <div className="w-full h-auto md:rounded-t-[15px]">
                        <div className={`${menu ? "pb-16 lg:pb-12" : "pb-0"} transition-all duration-500 ease-in-out w-full bg-[#F36652] h-0 pt-4 md:rounded-t-[15px]`}>
                            <div className="flex flex-row items-center justify-between px-4">
                                <i onClick={() => setOpen(false)} className="cursor-pointer ri-arrow-left-line text-3xl"></i>
                                <p className="text-xl self-center mb-2">Chat</p>
                                <i onClick={() => setMenu(!menu)} className="cursor-pointer ri-more-2-fill text-3xl"></i>
                            </div>

                            <div className={`${menu ? "visible opacity-100" : "invisible opacity-0"} transition-opacity ease-linear duration-200 delay-200 w-full flex flex-row items-start justify-between pl-5 pr-6`}>
                                <div className="flex flex-col items-start justify-end mx-0.5 text-opacity-60">
                                    <p onClick={() => setMenu(false)} className="cursor-pointer">Back</p>
                                </div>
                                <div className="flex flex-col items-end mx-1 mb-1.5 text-opacity-60">
                                    <p onClick={() => { handleContact(); setMenu(false) }} className="cursor-pointer">Help</p>
                                    <p onClick={() => { handleSendFaqs(); setMenu(false) }} className="cursor-pointer">FAQs</p>
                                    <p onClick={() => { handleContact(); setMenu(false) }} className="cursor-pointer">Contact</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[url('/img/chat-above.svg')] border border-transparent border-t-[#F36652] bg-cover bg-no-repeat w-full h-32"></div>
                    </div>
                    
                    <div className="w-full h-[82%] md:h-[70%] lg:h-[74%] xl:h-[78%] overflow-y-scroll fixed -z-10 pt-32 px-4">
                        <div ref={newMessageRef} autoFocus={true} className="w-full h-full flex flex-col gap-2.5 items-start">
                            <p ref={newMessageRef} className="mt-2 w-auto max-w-[75%] ~text-base/lg bg-[#505742] shadow-sm py-2 px-4 rounded-tl-[13px] rounded-tr-[13px] rounded-br-[13px]">{chat[0]?.text}</p>
                            {chat.slice(1).map(({ text, type, invalid, faq, ignore }) => {
                                if (type == "bot") {
                                    if (faq) {
                                        return (
                                            <div className="flex flex-col gap-1">
                                                <p className="w-auto max-w-[75%] ~text-base/lg bg-[#505742] shadow-sm mt-2 py-2 px-4 rounded-tl-[13px] rounded-tr-[13px] rounded-br-[13px]">{text}</p>
                                                <div className="flex flex-col gap-1">
                                                    {faqs.flatMap((faq) => FaqResponses[faq]).filter(faq => faq !== undefined).slice(0, 5).map((faq, index) => {
                                                        return <p ref={index == faqs.length - 1 ? newMessageRef : null} onClick={() => handleShowFaqAnswer(faq)} key={index + faq.slice(0, 3)} className="cursor-pointer w-fit text-[#F36652] bg-[#F2F3EA] backdrop-blur-sm border border-border shadow-sm py-2 px-4 rounded-[13px]">{faq}</p>
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        if (invalid) {
                                            return (
                                                <div className="flex flex-col gap-1">
                                                    <p className="w-auto max-w-[75%] ~text-base/lg bg-[#505742] shadow-sm py-2 px-4 rounded-tl-[13px] rounded-tr-[13px] rounded-br-[13px]">{text}</p>
                                                    <div className="flex flex-row gap-1">
                                                        <p onClick={handleSendFaqs} className="cursor-pointer w-fit ~text-base/lg text-[#F36652] bg-[#F2F3EA]  backdrop-blur-sm border border-border shadow-sm py-2 px-4 rounded-[13px]">Show FAQs</p>
                                                        <p ref={newMessageRef} onClick={handleContact} className="cursor-pointer w-fit ~text-base/lg text-[#F36652] bg-[#F2F3EA]  border border-border shadow-sm py-2 px-4 rounded-[13px]">Contact Us</p>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return <p ref={newMessageRef} className="w-auto max-w-[75%] ~text-base/lg bg-[#505742] shadow-sm py-2 px-4 rounded-tl-[13px] rounded-tr-[13px] rounded-br-[13px]">{text}</p>
                                        }
                                    }
                                } else {
                                    return <p ref={newMessageRef} className="self-end w-auto max-w-[85%] ~text-base/lg text-[#F36652] bg-[#F2F3EA] border border-border shadow-sm py-2 px-4 rounded-tl-[13px] rounded-tr-[13px] rounded-bl-[13px]">{text}</p>
                                }
                            })}
                        </div>
                    </div>

                    <div className="bg-[url('/img/chat-below.svg')] h-32 bg-cover bg-no-repeat md:rounded-b-[15px]">
                        <div className="w-full h-full">
                            <div className="mt-8 mb-4 mx-3 py-1 px-6 w-auto flex flex-row items-center justify-between bg-[#F2F3EA] border border-border rounded-[15px]">
                                <div className="flex flex-row items-center">
                                    <i onClick={handleClearChat} className="cursor-pointer ri-delete-bin-6-line text-2xl pl-1 text-[#F36652]"></i>
                                    <input
                                        autoFocus={true}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleChatInput}
                                        type="text"
                                        placeholder="Chat..."
                                        className="text italic font-sans ~py-0.5/1 ~px-2/4 outline-none focus:outline-none w-auto rounded-[45px] bg-transparent placeholder:text-black text-lg text-black text-opacity-90"
                                    ></input>
                                </div>
                                <i onClick={handleContact} className="cursor-pointer ri-contacts-line text-2xl px-1 text-[#F36652]"></i>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default PizzaBot;
