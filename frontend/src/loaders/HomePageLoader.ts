import image1 from '../assets/carousel/image1.png';
import image2 from '../assets/carousel/image2.png';

export interface HomePageData {
  carouselImages: string[];
}

export const loader = async (): Promise<HomePageData> => {
  return {
    carouselImages: [
      image2,
      image1,
      image2,
      image1,
      image2,
      image1,
    ],
  };
}
