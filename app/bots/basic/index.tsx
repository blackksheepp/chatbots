"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Fuse from "fuse.js";

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: "What is a chatbot?",
    answer:
      "A chatbot is a software tool that uses either rules or artificial intelligence (AI) to simulate human conversation. These bots can answer questions, provide customer support, and perform automated tasks on websites, mobile apps, or messaging platforms. They help businesses engage with customers instantly without needing human intervention, 24/7.",
  },
  {
    question: "How can a chatbot help my business?",
    answer:
      "Chatbots streamline customer interaction by providing instant responses to common inquiries, reducing the need for human customer service agents. They can also handle repetitive tasks such as appointment bookings, FAQs, order tracking, and more, freeing up time for your team. By automating responses and tasks, a chatbot increases efficiency, improves customer satisfaction, and ensures your business is available anytime.",
  },
  {
    question:
      "What types of chatbots do you offer, and how do they benefit my business?",
    answer:
      "We offer three primary types of chatbots, each serving different business needs:\n\n1. Rule-Based Chatbots: These chatbots follow a set of predefined rules and scripts to interact with users. Use Case: Perfect for straightforward tasks like answering FAQs (e.g., 'What are your business hours?' or 'How do I reset my password?'). They are simple, reliable, and ensure customers get the right information every time.\n\n2. Conversational Chatbots: These bots use natural language processing (NLP) to engage in more fluid, human-like conversations. Use Case: Ideal for customer support or sales inquiries, where customers might ask detailed or varied questions. For example, a customer looking for product recommendations can chat with the bot as if they're speaking to a human sales assistant, receiving personalized suggestions in real-time.\n\n3. Retrieval-Augmented Generation (RAG) Chatbots: These chatbots can pull information from a database or the web and combine it with AI-generated responses to give more detailed and contextual answers. Use Case: Ideal for businesses with a lot of data, such as e-commerce platforms or knowledge-based industries (like healthcare or education). If a customer asks about a specific product or service, the bot can retrieve relevant information (e.g., user guides, comparison data) and respond accurately.",
  },
  {
    question: "Can I customize the chatbot for my business?",
    answer:
      "Yes, all our chatbots are fully customizable to fit your business's needs. From the conversational flow to the chatbot's tone and personality, we ensure the bot aligns with your brand identity. You can also personalize the bot's look and feel, integrate it with your systems (such as your CRM, inventory, or email marketing tools), and tailor the questions and responses to suit your customers’ expectations. Whether you need a formal, professional bot or a friendly, casual one, the customization options are endless.",
  },
  {
    question: "What industries can benefit from chatbots?",
    answer:
      "Chatbots are incredibly versatile and can be applied to nearly any industry. Here are some key examples: \n\n- E-commerce: Automate product recommendations, provide instant support for order tracking, and answer frequently asked questions. \n\n- Healthcare: Help patients schedule appointments, provide information about medical services, and assist in answering health-related queries. \n\n- Finance: Offer account information, provide assistance with loans, mortgages, and help customers with financial planning. \n\n- Education: Facilitate course sign-ups, answer student queries, and offer support for online learning platforms. \n\n- Real Estate: Answer property-related inquiries, schedule property viewings, and provide detailed information about listings. \n\n- Customer Service: Handle support tickets, provide troubleshooting steps, and offer live chat escalation when needed.",
  },
  {
    question: "How long does it take to implement a chatbot?",
    answer:
      "The time required to implement a chatbot depends on its complexity. A simple rule-based chatbot can be ready within a few days, especially if it’s based on pre-existing templates or FAQs. On the other hand, a more sophisticated AI-powered or conversational chatbot that needs custom integrations or extensive training can take several weeks. Our team will work closely with you to ensure a smooth and timely deployment that aligns with your business schedule.",
  },
  {
    question: "Is any technical expertise required to manage the chatbot?",
    answer:
      "No, managing the chatbot is straightforward and requires no technical expertise. Once the chatbot is live, we provide you with an easy-to-use dashboard where you can track its performance, update responses, and adjust settings. Our chatbots are designed with user-friendly interfaces, so you don’t need coding skills to make changes or manage the bot. If you ever need assistance, our support team is available to help you every step of the way.",
  },
  {
    question: "Can I integrate the chatbot with my existing systems?",
    answer:
      "Yes, our chatbots can seamlessly integrate with your existing systems such as CRM platforms, email marketing tools, and payment gateways. Whether it’s syncing with your customer database for personalized interactions, integrating with e-commerce platforms to help with order processing, or connecting with third-party APIs, we ensure the chatbot works smoothly within your current tech ecosystem.",
  },
  {
    question: "How do AI chatbots learn and improve over time?",
    answer:
      "AI chatbots use machine learning algorithms to continuously improve. They analyze user interactions, track how users engage with them, and learn from the responses they provide. Over time, they become better at understanding context, recognizing patterns, and delivering more accurate and helpful answers. With each conversation, the chatbot refines its ability to predict what users need, offering more personalized and relevant responses.",
  },
  {
    question:
      "What kind of support do you offer after the chatbot is deployed?",
    answer:
      "We offer comprehensive support after the chatbot is live, including regular updates, bug fixes, performance monitoring, and ongoing customization as your business evolves. Our support team is available to help with troubleshooting, implementing new features, or even scaling the bot as your needs grow. Whether you need help optimizing the chatbot’s performance or adjusting it based on new customer requirements, we’ll be with you every step of the way.",
  },
  {
    question: "How secure is my data with the chatbot?",
    answer:
      "We prioritize data security and privacy. Our chatbots are built with encryption to protect customer information, and we follow industry best practices for data security. Whether it's customer inquiries, payment information, or sensitive business data, everything is safeguarded to ensure your business and your clients are protected from data breaches or unauthorized access.",
  },
  {
    question: "Can the chatbot handle multiple languages?",
    answer:
      "Yes, our chatbots are capable of multilingual support. They can interact with customers in their preferred language, making them an ideal solution for businesses that serve a global audience. Whether you need a bot that can switch between languages automatically or one dedicated to a specific market, we can build it to suit your needs.",
  },
  {
    question: "What happens if the chatbot can't answer a question?",
    answer:
      "If the chatbot encounters a question it can’t answer, it will automatically escalate the conversation to a human agent or provide alternative solutions, such as redirecting the user to a helpful resource or offering contact details for further assistance. This ensures that no customer query goes unresolved and maintains a high level of service.",
  },
  {
    question: "Contact us for support",
    answer: "",
  },
];

function FuzzySearch(query: string, options: string[]): string[] {
  if (!query) {
    return options;
  }
  const fuse = new Fuse(options, {
    includeScore: true,
    threshold: 0.4,
    keys: [],
  });

  const result = fuse.search(query);
  const keys = result.map((res) => res.item);

  const results: string[] = [];
  keys.forEach((key) => {
    results.push(key);
  })

  options.forEach((option) => {
    if (!results.includes(option)) {
      results.push(option);
    }
  })

  return results;
}

const BasicBot = () => {
  const faqsRef = useRef<HTMLDivElement>(null);
  const faqsTop = () => {
    if (faqsRef.current) {
      faqsRef.current.scrollTop = 0;
    }
  }

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>(FAQS);

  useEffect(() => {
    const result = FuzzySearch(
      query,
      FAQS.map((faq) => faq.question)
    );

    setFaqs(
      result.map((res) => {
        return FAQS.find((faq) => faq.question === res) as FAQ;
      })
    );
  }, [query]);

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
          className={`${
            open
              ? "opacity-100 ~w-[16rem]/[24rem] ~h-[20rem]/[25rem] rounded-[10px]"
              : "opacity-0 ~w-4/8 ~h-4/8 rounded-[50%]"
          } transition-all ease-in-out duration-500 bg-bg-solid backdrop-blur-lg shadow-2xl`}
        >
          <div className="w-full flex flex-row items-center justify-between px-2.5 py-1 bg-primary rounded-t-[10px]">
            <Image
              src={"/img/logo-white.png"}
              alt="logo"
              width={100}
              height={100}
              sizes="100vw"
              className="pointer-events-none ~w-5/6 ~h-5/6 rounded-full"
            />
            <i
              onClick={() => {
                setOpen(false);
                setSelected(null);
              }}
              className="cursor-pointer ri-arrow-down-s-line ~text-2xl/4xl text-foreground"
            ></i>
          </div>
          <div className="w-full h-[1px] bg-primary"></div>

          <div
            className={`${
              open ? "opacity-100" : "opacity-0"
            } transition-all ease-in-out duration-1000 px-3 ~py-2/4 text-white w-full h-[85%] flex flex-col items-start justify-between`}
          >
            {selected == null ? (
              <>
                <div className="flex flex-col ~gap-[0.2rem]/[0.1rem]">
                  <p className="~text-xs/base font-semibold lg:font-medium">
                    Hi User! How can I help you today?
                  </p>
                  <p className="~text-[0.6rem]/[0.9rem] font-sans text-gray-300 leading-tight">
                    Here's a list of common questions and their corresponding
                    answers.
                  </p>
                </div>
                <div ref={faqsRef} className="overflow-y-scroll my-3 flex flex-col items-start gap-3">
                  {faqs.map((faq, index) => (
                    <p
                      key={index}
                      onClick={() => setSelected(index)}
                      className="w-full cursor-pointer ~text-xs/sm bg-[#222b43] rounded-[30px] ~py-1.5/2.5 ~px-4/5"
                    >
                      {faq.question}
                    </p>
                  ))}
                </div>
              </>
            ) : (
                <div className="flex flex-col ~h-[10.9rem]/[16rem] ~gap-3/1">
                <p className="~text-xs/lg font-semibold text-balance">
                  {faqs[selected].question}
                </p>
                <div className="overflow-y-scroll">
                  {selected != 13 ? (
                    <p
                      className="~text-[0.7rem]/[1rem] font-sans text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: faqs[selected].answer,
                      }}
                    ></p>
                  ) : (
                        <div className="flex flex-col items-start justify-between ~text-[0.6rem]/[1rem] text-gray-300">
                      <div>
                        <p>Email us at: 6lN5Z@example.com</p>
                        <p>Or Call us at: +1 (555) 555-5555</p>
                        <p>We will get back to you as soon as possible.</p>
                      </div>
                      <div>
                        <p>Thanks for using Chatbot.</p>
                        <p>© 2024 Chatbot. All rights reserved.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selected == null ? (
              <div className="w-full flex flex-row items-center justify-between">
                {" "}
                <input
                  value={query}
                  onChange={(e) => {setQuery(e.target.value); faqsTop();}}
                  type="text"
                  placeholder="Search..."
                  className="~text-xs/sm italic font-sans ~py-1/1.5 ~px-2/4 outline-none focus:outline-none w-full rounded-[45px] bg-[#1d2539] border-border border-[1px]"
                ></input>
                <p
                  onClick={() => setSelected(13)}
                  className="cursor-pointer ~text-xs/sm bg-[#222b43] rounded-[30px] ~py-1.5/2 ~px-3/4 mx-1"
                >
                  Contact
                </p>
              </div>
            ) : (
              <div className="w-full text-xs flex flex-row items-end justify-end">
                <p
                  onClick={() => setSelected(null)}
                  className="cursor-pointer ~text-xs/sm bg-[#222b43] rounded-[30px] ~py-1.5/2.5 ~px-3/5 mx-1"
                >
                  Back
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicBot;
