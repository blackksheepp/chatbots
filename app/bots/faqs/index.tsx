"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { GetResponse } from "../../backend/rasa";
import { GetFaqs } from "../../db/queries/faqs";

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

const FaqBot = () => {
    const [open, setOpen] = useState(false);
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
        if (faqs.length > 0) setFaqs(faqs.flatMap(faq => faq.text!));
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

    const handleShowFaqAnswer = (answer: string) => {
        setChat([...chat, { text: FaqResponses[answer], type: "user" }])
    }

    const handleContact = () => {
        setChat([...chat, 
            { text: "Contact us", type: "user", ignore: true },
            { text: "You can contact us at 123-456-7890 or send us an email at 3k3Jt@example.com", type: "bot" },
        ])
    }

    return (
        <>
            <div className="z-30 fixed ~bottom-6/12 ~right-3/12 ">
                {!open && (
                    <div
                        className="flex flex-col items-center justify-center"
                        onClick={() => setOpen(true)}
                    >
                        <div
                            style={{ border: "1px solid var(--border)" }}
                            className="~mb-2/4 relative bg-bg-solid backdrop-blur-lg  border ~p-1.5/2 rounded-lg"
                        >
                            <div
                                style={{
                                    borderRight: "1px solid var(--border)",
                                    borderBottom: "1px solid var(--border)",
                                }}
                                className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 ~w-2/4 ~h-2/4 bg-bg-solid backdrop-blur-lg"
                            ></div>
                            <p className="text-center ~text-xs/sm">Try us now!</p>
                        </div>

                        <div className="~w-9/16 ~h-9/16  cursor-pointer shadow-lg border-[3px] md:border-[5px] border-primary rounded-full">
                            <Image
                                src={"/img/logo-white.png"}
                                alt="logo"
                                width={100}
                                height={100}
                                sizes="100vw"
                                className="pointer-events-none w-full h-full rounded-full"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="select-none z-20 fixed ~bottom-6/12 ~right-3/12 px-7 ~py-3/4">
                <div
                    className={`${open
                        ? "opacity-100 ~w-[16rem]/[24rem] ~h-[20rem]/[25rem] rounded-[15px]"
                        : "opacity-0 ~w-4/8 ~h-4/8 rounded-[50%]"
                        } transition-all ease-in-out duration-500 bg-background backdrop-blur-lg shadow-2xl 
                        flex flex-col justify-between pb-2
                        bg-[radial-gradient(#c4c4c4_0.1px,rgba(0,0,0,0.1)_1px)] [background-size:13px_13px] border border-border`}

                >
                    <div className={`${menu ? "h-20" : "h-7"} transition-all ease-linear duration-200 mx-3 my-3 px-2 w-auto grid place-items-center bg-bg-solid border border-border rounded-[15px]`}>
                        <div className="h-7 w-full flex flex-row items-center justify-between">
                            <i onClick={() => setOpen(false)} className="cursor-pointer ri-arrow-left-line text-primary"></i>
                            <p className="text-xs self-center">Chat</p>
                            <i onClick={() => setMenu(!menu)} className="cursor-pointer ri-more-2-fill text-primary"></i>
                        </div>
                        <div className={`${menu ? "visible opacity-100" : "invisible opacity-0"} transition-opacity ease-linear duration-200 delay-200 w-full flex flex-row items-start justify-between`}>
                            <div className="flex flex-col items-start justify-end mx-0.5 text-primary text-opacity-60">
                                <p onClick={() => setMenu(false)} className="cursor-pointer text-[0.65rem]">Back</p>
                            </div>
                            <div className="flex flex-col items-end mx-1 mb-1.5 text-primary text-opacity-60">
                                <p onClick={() => { handleContact(); setMenu(false) }} className="cursor-pointer text-[0.65rem]">Help</p>
                                <p onClick={() => { handleSendFaqs(); setMenu(false) }} className="cursor-pointer text-[0.65rem]">FAQs</p>
                                <p onClick={() => { handleContact(); setMenu(false) }} className="cursor-pointer text-[0.65rem]">Contact</p>
                            </div>
                        </div>
                    </div>

                    <div ref={newMessageRef} autoFocus={true} className="w-auto h-full overflow-y-scroll my-1 mx-4 flex flex-col gap-2.5 items-start">
                        <p ref={newMessageRef} className="mt-2 w-auto max-w-[85%] text-[0.65rem] bg-primary bg-opacity-50 shadow-lg py-1 px-2 rounded-tl-[13px] rounded-tr-[13px] rounded-br-[13px]">{chat[0]?.text}</p>
                        {chat.slice(1).map(({ text, type, invalid, faq, ignore }) => {
                            if (type == "bot") {
                                if (faq) {
                                    return (
                                        <div className="flex flex-col gap-1">
                                            <p className="w-auto max-w-[85%] text-[0.65rem] bg-primary bg-opacity-50 shadow-lg mt-2 py-1 px-2 rounded-tl-[13px] rounded-tr-[13px] rounded-br-[13px]">{text}</p>
                                            <div className="flex flex-col gap-1">
                                                {faqs.flatMap((faq, index) => {
                                                    if (FaqResponses[faq]) {
                                                        return <p ref={index == faqs.length - 1 ? newMessageRef : null} onClick={() => handleShowFaqAnswer(faq)} key={index + faq.slice(0, 3)} className="cursor-pointer w-fit text-[0.65rem] bg-background backdrop-blur-sm border border-border bg-opacity-50 shadow-lg py-1 px-2 rounded-[13px]">{FaqResponses[faq]}</p>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    if (invalid) {
                                        return (
                                            <div className="flex flex-col gap-1">
                                                <p className="w-auto max-w-[85%] text-[0.65rem] bg-primary bg-opacity-50 shadow-lg py-1 px-2 rounded-tl-[13px] rounded-tr-[13px] rounded-br-[13px]">{text}</p>
                                                <div className="flex flex-row gap-1">
                                                    <p onClick={handleSendFaqs} className="cursor-pointer w-fit text-[0.65rem] bg-background backdrop-blur-sm border border-border bg-opacity-50 shadow-lg py-1 px-2 rounded-[13px]">Show FAQs</p>
                                                    <p ref={newMessageRef} onClick={handleContact} className="cursor-pointer w-fit text-[0.65rem] bg-background backdrop-blur-sm border border-border bg-opacity-50 shadow-lg py-1 px-2 rounded-[13px]">Contact Us</p>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return <p ref={newMessageRef} className="w-auto max-w-[85%] text-[0.65rem] bg-primary bg-opacity-50 shadow-lg py-1 px-2 rounded-tl-[13px] rounded-tr-[13px] rounded-br-[13px]">{text}</p>
                                    }
                                }
                            } else {
                                return <p ref={newMessageRef} className="self-end w-auto max-w-[85%] text-[0.65rem] bg-bg-solid border border-border shadow-lg py-1 px-2 rounded-tl-[13px] rounded-tr-[13px] rounded-bl-[13px]">{text}</p>
                            }
                        })}
                    </div>

                    <div className="my-3 mx-3 py-0.5 px-2 w-auto flex flex-row items-center justify-between bg-bg-solid border border-border rounded-[15px]">
                        <div className="flex flex-row items-center">
                            <i onClick={handleClearChat} className="cursor-pointer ri-delete-bin-6-line text-xs text-primary pl-1"></i>
                            <input
                                autoFocus={true}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleChatInput}
                                type="text"
                                placeholder="Chat..."
                                className="text-[0.65rem] italic font-sans ~py-0.5/1.5 ~px-2/4 outline-none focus:outline-none w-auto rounded-[45px] bg-transparent text-white text-opacity-90"
                            ></input>
                        </div>
                        <i onClick={handleContact} className="cursor-pointer ri-contacts-line text-xs text-primary px-1"></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FaqBot;
