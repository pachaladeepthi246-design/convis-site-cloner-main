"use client";
import React from 'react';

const faqs = [
  {
    question: "Can I try it for free?",
    answer: "Yes, we offer a free starter plan that includes up to 5 projects. No credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, as well as PayPal. For enterprise plans, we also support wire transfers.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Absolutely. You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of the current billing cycle.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes, we offer a 20% discount for registered non-profit organizations. Please contact our support team to learn more.",
  },
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Frequently Asked Questions
      </h2>
      <div className="mt-12 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-lg border border-white/20 bg-white/10">
            <button
              className="flex w-full items-center justify-between p-6 text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-lg font-medium text-white">{faq.question}</span>
              <span className="text-2xl text-white">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-white/70">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};