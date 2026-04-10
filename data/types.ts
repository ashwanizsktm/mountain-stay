export interface PropertyImage {
  src: string;
  label: string;
}

type Review = {
  rating: number,
  count: number
}

export interface Property {
  slug: string;
  name: string;
  price: number;
  seo?: SEO;
  description: string;
  reviews: Review;
  coupleFriendly: boolean;
  mountainView: boolean;
  amenities: string[];
  images: PropertyImage[];
}
export interface Route {
  from: string;
  price: string;
  perPerson: string;
}

export interface Taxi {
  name: string;
  image: string;
  driverName: string;
  phone: string;
  capacity: string;
  tag: string;
  routes: Route[];
}
export interface ThingsToExplore {
  title: string
  details: string
  image: string
}

export interface HowToReach {
  title: string;
  details: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
}



export interface Location {
  slug: string;
  name: string;
  seo: SEO;
  properties: Property[];
  taxis?: Taxi[];
  howToReach? : HowToReach[];
  thingsToExplore?: ThingsToExplore[];
}