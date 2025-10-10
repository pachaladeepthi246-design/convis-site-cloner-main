import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, image }) => {
  return (
    <section
      className="relative h-96 bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl text-white/80">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;