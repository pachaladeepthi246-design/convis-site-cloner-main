import { TestimonialsColumn } from "../components/ui/testimonials-columns-1";
import { Logos3 } from "../components/ui/logos3";
import { Features } from "../components/ui/features";

const testimonials = [
  {
    text: "The service was exceptional. They delivered everything on time and the quality was outstanding.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Jane Doe",
    role: "CEO, Company Inc.",
  },
  {
    text: "A fantastic experience from start to finish. The team was professional, responsive, and incredibly talented.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Smith",
    role: "CTO, Tech Solutions",
  },
  {
    text: "I'm blown away by the results. They exceeded all my expectations and helped our business grow.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Emily Johnson",
    role: "Marketing Director, Growth Co.",
  },
];

const testimonials2 = [
    {
      text: "Working with them was a game-changer. Their insights and expertise were invaluable to our project.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Michael Brown",
      role: "Product Manager, Innovate LLC",
    },
    {
      text: "Highly recommended! Their attention to detail and commitment to quality is second to none.",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      name: "Sarah Davis",
      role: "Founder, Creative Minds",
    },
    {
      text: "An absolute pleasure to work with. They are true professionals who deliver exceptional results.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "David Wilson",
      role: "Lead Developer, CodeCrafters",
    },
];

const testimonials3 = [
    {
      text: "The best in the business. Their innovative solutions helped us solve our most complex challenges.",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Jessica Martinez",
      role: "Operations Manager, Biz Group",
    },
    {
      text: "I couldn't be happier with the outcome. The team went above and beyond to ensure our success.",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      name: "Chris Anderson",
      role: "CEO, Future Enterprises",
    },
    {
      text: "Their work is simply outstanding. I would recommend them to anyone looking for top-tier service.",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "Laura Taylor",
      role: "Creative Director, Design Hub",
    },
];


export default function Home() {
  return (
    <main>
      <div className="py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            A better way to build products
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
            cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
            aliqua.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-white px-4 py-2 text-slate-900"
            >
              Get started
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <Features />
      <Logos3 />
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <div className="flex flex-row gap-6">
            <TestimonialsColumn testimonials={testimonials} duration={20} />
            <TestimonialsColumn testimonials={testimonials2} duration={30} className="hidden md:flex" />
            <TestimonialsColumn testimonials={testimonials3} duration={25} className="hidden lg:flex" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 h-full w-full bg-gradient-to-b from-transparent to-slate-900"></div>
      </div>
    </main>
  );
}