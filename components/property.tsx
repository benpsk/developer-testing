import Image from "next/legacy/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IoBedOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";

enum OfferType {
  RENT = "RENT",
  SALE = "SALE"
}

type Image = {
  id: number,
  url: string
};

type Property = {
  id: number,
  price: number,
  bedroom: number,
  description: string,
  name: string,
  offerType: OfferType,
  title: string,
  area: string,
  images: Image[]
}

const Property = ({ property }: { property: Property }) => {
  return (
    <div key={property.id} className="flex flex-col overflow-hidden rounded-lg border lg:flex-row">
      <div className="group relative block h-56 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-64 md:w-64">
        <Carousel>
          <CarouselContent>
            { property.images.map((image: Image) => (
              <CarouselItem key={image.id}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center relative p-0">
                    <div className="relative w-full h-full">
                      <Image
                        src={image.url}
                        alt={`Image ${image.id}`}
                        className="object-center transition duration-200 group-hover:scale-110"
                        layout="fill"
                        sizes='800'
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col gap-2 p-4 lg:p-6 lg:py-2 lg:h-64 overflow-hidden">
        <div>
          <span className="text-xs rounded-md px-2 py-1 text-gray-400 bg-gray-200">{property.offerType}</span>
        </div>
        <span className="text-sm">Name - {property.name}</span>
        <h2 className="text-xl font-bold text-gray-800">
          <a href="#" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">$ {property.price}</a>
        </h2>
        <p>Title - {property.title}</p>
        <div className="flex justify-start  gap-4">
          <div className="inline-flex items-center">
            <IoBedOutline size={26} />
            <span className="ml-2">{property.bedroom}</span>
          </div>
          <div className="inline-flex items-center">
            <IoHomeOutline size={22} />
            <span className="ml-2">{property.area} ft.</span>
          </div>
        </div>
        <p className="text-gray-500">{property.description}</p>
      </div>
    </div>
  );
}

export default Property;