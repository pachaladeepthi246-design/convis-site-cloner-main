"use client";
import { BarChart, Code, DollarSign, FileText, Home, Shield } from "lucide-react";

const features = [
  {
    icon: <Home className="h-8 w-8 text-white" />,
    title: "Built for developers",
    description:
      "Built for developers, Linear lets you track issues, plan sprints, and manage projects.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-white" />,
    title: "Meet your new command line",
    description:
      "Complete any action in seconds with the global command menu.",
  },
  {
    icon: <FileText className="h-8 w-8 text-white" />,
    title: "Set the direction",
    description:
      "Plan sprints, manage capacity, and track progress with customizable workflows.",
  },
  {
    icon: <Code className="h-8 w-8 text-white" />,
    title: "Integrate your tools",
    description:
      "Connect with your favorite tools to sync issues, share insights, and more.",
  },
  {
    icon: <Shield className="h-8 w-8 text-white" />,
    title: "Enterprise-grade security",
    description:
      "Your data is safe and secure with our enterprise-grade security features.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-white" />,
    title: "Affordable pricing",
    description:
      "Our pricing is designed to be affordable for teams of all sizes.",
  },
];

export const Features = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Finally, all your work in one place
            </h2>
            <p className="text-lg text-white/70">
              Work smarter, not harder. Clyrox is the all-in-one platform for
              modern teams.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-lg border border-white/20 bg-white/10 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};