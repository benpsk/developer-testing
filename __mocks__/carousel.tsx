// __mocks__/carousel.tsx
const Carousel = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const CarouselContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const CarouselNext = () => {
  return <button>Next</button>;
};

const CarouselPrevious = () => {
  return <button>Previous</button>;
};

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious };

