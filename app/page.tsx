"use client"
import Navbar from "./components/navbar";
import BasicBot from "./bots/basic";
import FaqBot from "./bots/faqs";

export default function Home() {

    return (
        <main className="w-full h-screen">
            <div className="z-40 fixed w-full h-screen">
                <Navbar />
                <FaqBot />
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen ~p-3/6">
                <div
                    style={{ border: "1px solid var(--border)", userSelect: "none" }}
                    className="w-auto sm:w-[50%] xl:w-[35%] ~mx-[1.5rem]/[25rem] transition-all ease-in-out duration-500 flex flex-col ~gap-1.5/2 bg-background backdrop-blur-lg rounded-lg ~p-5/10"
                >
                    <h1 className="~text-xl/3xl font-bold">Chatbot.</h1>
                    <div className="flex flex-col ~gap-1/1.5">
                        <p className="~text-sm/xl font-bold text-primary">
                            Your AI, Your Way – Tailored Chatbots for Every Need.
                        </p>
                        <p className="~text-xs/base">
                            At Chatbot, we create intelligent, custom chatbots that fit your
                            needs—whether it's rule-based, conversational, or advanced RAG
                            models. Elevate experiences and streamline processes with the
                            right AI solution for you.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
