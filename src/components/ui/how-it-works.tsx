"use client";
import { FilePlus, BarChart, CheckSquare } from "lucide-react";

const steps = [
  {
    icon: <FilePlus className="h-10 w-10 text-white" />,
    title: "1. Create a Project",
    description: "Start by creating a new project and defining your goals. Invite your team members to collaborate.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-white" />,
    title: "2. Track Your Progress",
    description: "Use our intuitive Kanban boards and progress charts to monitor your team's performance and stay on track.",
  },
  {
    icon: <CheckSquare className="h-10 w-10 text-white" />,
    title: "3. Achieve Your Goals",
    description: "Complete your projects on time and within budget. Celebrate your success and plan for the future.",
  },
];

export const HowItWorks = () => {
  return (
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        How It Works
      </h2>
      <p className="mt-6 text-lg leading-8 text-white/70">
        Get started in just a few simple steps.
      </p>
      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center gap-6 rounded-lg border border-white/20 bg-white/10 p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
              {step.icon}
            </div>
            <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
            <p className="text-white/70">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};