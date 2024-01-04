import { CarouselImageProps } from '../components/Carousel';

import image1 from '../assets/carousel/image1.png';
import image2 from '../assets/carousel/image2.png';

export interface HomePageData {
  carouselImages: CarouselImageProps[];
}

export const loader = async (): Promise<HomePageData> => {
  return {
    carouselImages: [
      { link: image2, name: "image 2" },
      { link: image1, name: "image 1" },
      { link: image2, name: "image 2" },
      { link: image1, name: "image 1" },
      { link: image2, name: "image 2" },
      { link: image1, name: "image 1" },
    ],
  };
}
