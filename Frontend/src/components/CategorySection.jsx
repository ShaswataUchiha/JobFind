import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Data Scientist",
  "Full Stack Developer",
  "Mobile Developer",
  "Product Manager",
];

const CategorySection = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem>
              <Button varient="outline" classname="rounded-full">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategorySection;
