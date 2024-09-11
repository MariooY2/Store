import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const carouselImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg", "/hero4.jpg"];

function HeroCarousel() {
  return (
    <div className="hidden lg:block ">
      <Carousel >
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card className="relative">
                  <CardContent className="p-2">
                    <div className=" relative w-full h-[25rem]">
                      <Image
                        src={image}
                        alt={`Carousel image ${index + 1}`}
                        fill
                        className="object-cover rounded-md "
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
