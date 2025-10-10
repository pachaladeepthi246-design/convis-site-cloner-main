import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import GlassCard from './GlassCard';
import AnimatedSection from './AnimatedSection';

const testimonialData = [
  {
    name: 'Sarah Johnson',
    title: 'CEO, Tech Innovators',
    quote: "Clyrox transformed our business strategy. Their team's expertise and dedication were instrumental in our growth. We saw a 200% increase in efficiency within the first six months.",
    rating: 5,
  },
  {
    name: 'Michael Chen',
    title: 'HR Director, Global Solutions',
    quote: "The employment and visa consulting services are second to none. They simplified a complex process, saving us countless hours and ensuring full compliance. Highly recommended.",
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    title: 'Founder, Creative Designs Co.',
    quote: "From concept to launch, the design and development team was incredible. They brought our vision to life with a stunning website that has significantly boosted our online presence.",
    rating: 5,
  },
  {
    name: 'David Lee',
    title: 'Operations Manager, Logistics Pro',
    quote: "Their staffing services provided us with top-tier talent exactly when we needed it. Clyrox understands our industry and consistently delivers quality candidates.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Clients Say</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Real stories from businesses we've helped to succeed.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonialData.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4 h-full">
                    <GlassCard className="p-8 h-full flex flex-col justify-between" hover={false}>
                      <div>
                        <div className="flex items-center mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-white/80 text-lg italic mb-6">"{testimonial.quote}"</p>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{testimonial.name}</p>
                        <p className="text-white/60">{testimonial.title}</p>
                      </div>
                    </GlassCard>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
}