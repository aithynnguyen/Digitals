import { driveCityImageOverrides } from "./drive-images.generated";
import { imageDimensionsBySrc } from "./image-dimensions.generated";

export interface GalleryImage {
  src: string;
  alt: string;
  thumbSrc?: string;
  previewSrc?: string;
  width?: number;
  height?: number;
}

export interface LocationData {
  slug: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude] for the map
  images: GalleryImage[];
}

const withPagesBase = (src: string): string => {
  if (src.startsWith("/images/")) {
    return `${import.meta.env.BASE_URL}${src.slice(1)}`;
  }

  return src;
};

const toLocalImagePath = (src: string): string | null => {
  if (src.startsWith("/images/")) {
    return src;
  }

  const base = import.meta.env.BASE_URL || "/";
  if (base !== "/" && src.startsWith(base)) {
    const withoutBase = `/${src.slice(base.length)}`;
    if (withoutBase.startsWith("/images/")) {
      return withoutBase;
    }
  }

  return null;
};

const getFirstImageSrc = (images: { src: string }[]): string => {
  return images.find((image) => Boolean(image.src))?.src || "";
};

const toPreviewLocalPath = (src: string): string | null => {
  const localPath = toLocalImagePath(src);
  if (!localPath) return null;
  if (!/\.(jpe?g)$/i.test(localPath)) return null;
  return localPath.replace("/images/", "/images-thumb/");
};

export const locations: LocationData[] = [
  // Canada
  {
    slug: "toronto",
    city: "Toronto",
    country: "Canada",
    coordinates: [-79.3832, 43.6532],
    images: [
      { src: "", alt: "Toronto 1" },
      { src: "", alt: "Toronto 2" },
      { src: "", alt: "Toronto 3" },
      { src: "", alt: "Toronto 4" },
    ],
  },
  {
    slug: "vancouver",
    city: "Vancouver",
    country: "Canada",
    coordinates: [-123.1216, 49.2827],
    images: [
      { src: "/images/vancouver/DSC03815.JPG", alt: "Vancouver 1" },
      { src: "/images/vancouver/DSC03833.JPG", alt: "Vancouver 2" },
      { src: "/images/vancouver/DSC03978.JPG", alt: "Vancouver 3" },
      { src: "/images/vancouver/DSC03766.JPG", alt: "Vancouver 4" },
      { src: "/images/vancouver/DSC03773.JPG", alt: "Vancouver 5" },
      { src: "/images/vancouver/DSC03777.JPG", alt: "Vancouver 6" },
      { src: "/images/vancouver/DSC03913.JPG", alt: "Vancouver 7" },
      { src: "/images/vancouver/DSC03880.JPG", alt: "Vancouver 8" },
      { src: "/images/vancouver/DSC03927.JPG", alt: "Vancouver 9" },
      { src: "/images/vancouver/DSC03956.JPG", alt: "Vancouver 10" },
      { src: "/images/vancouver/DSC03761.JPG", alt: "Vancouver 11" },
      { src: "/images/vancouver/DSC03982.JPG", alt: "Vancouver 12" },
      { src: "/images/vancouver/DSC03807.JPG", alt: "Vancouver 13" },
      { src: "/images/vancouver/DSC03900.JPG", alt: "Vancouver 14" },
      { src: "/images/vancouver/DSC03886.JPG", alt: "Vancouver 15" },
      { src: "/images/vancouver/DSC03801.JPG", alt: "Vancouver 16" },
      { src: "/images/vancouver/DSC03796.JPG", alt: "Vancouver 17" },
      { src: "/images/vancouver/DSC03878.JPG", alt: "Vancouver 18" },
      { src: "/images/vancouver/DSC03894.JPG", alt: "Vancouver 19" },
      { src: "/images/vancouver/DSC03928.JPG", alt: "Vancouver 20" },
      { src: "/images/vancouver/DSC03959.JPG", alt: "Vancouver 21" },
    ],
  },
  {
    slug: "montreal",
    city: "Montreal",
    country: "Canada",
    coordinates: [-73.5673, 45.5017],
    images: [
      { src: "", alt: "Montreal 1" },
      { src: "", alt: "Montreal 2" },
      { src: "", alt: "Montreal 3" },
    ],
  },
  // France
  {
    slug: "chamonix",
    city: "Chamonix",
    country: "France",
    coordinates: [6.8694, 45.9237],
    images: [
      { src: "/images/chamonix/DSC05258.JPG", alt: "Chamonix 1" },
      { src: "/images/chamonix/DSC05247.JPG", alt: "Chamonix 2" },
      { src: "/images/chamonix/DSC05266.JPG", alt: "Chamonix 3" },
      { src: "/images/chamonix/DSC05252.JPG", alt: "Chamonix 4" },
      { src: "/images/chamonix/DSC05263.JPG", alt: "Chamonix 5" },
      { src: "/images/chamonix/DSC05264.JPG", alt: "Chamonix 6" },
      { src: "/images/chamonix/DSC05273.JPG", alt: "Chamonix 7" },
      { src: "/images/chamonix/DSC05255.JPG", alt: "Chamonix 8" },
      { src: "/images/chamonix/DSC05267.JPG", alt: "Chamonix 9" },
      { src: "/images/chamonix/DSC05262.JPG", alt: "Chamonix 10" },
      { src: "/images/chamonix/DSC05268.JPG", alt: "Chamonix 11" },
      { src: "/images/chamonix/DSC05269.JPG", alt: "Chamonix 12" },
    ],
  },
  {
    slug: "paris",
    city: "Paris",
    country: "France",
    coordinates: [2.3522, 48.8566],
    images: [
      { src: "", alt: "Paris 1" },
      { src: "", alt: "Paris 2" },
      { src: "", alt: "Paris 3" },
    ],
  },
  // Germany
  {
    slug: "berlin",
    city: "Berlin",
    country: "Germany",
    coordinates: [13.4050, 52.5200],
    images: [
      { src: "", alt: "Berlin 1" },
      { src: "", alt: "Berlin 2" },
      { src: "", alt: "Berlin 3" },
    ],
  },
  // Greece
  {
    slug: "athens",
    city: "Athens",
    country: "Greece",
    coordinates: [23.7275, 37.9838],
    images: [
      { src: "", alt: "Athens 1" },
      { src: "", alt: "Athens 2" },
      { src: "", alt: "Athens 3" },
    ],
  },
  // Switzerland
  {
    slug: "geneva",
    city: "Geneva",
    country: "Switzerland",
    coordinates: [6.1432, 46.2044],
    images: [
      { src: "/images/geneva/DSC05162.JPG", alt: "Geneva 1" },
      { src: "/images/geneva/DSC05164.JPG", alt: "Geneva 2" },
      { src: "/images/geneva/DSC05211.JPG", alt: "Geneva 3" },
      { src: "/images/geneva/DSC05175.JPG", alt: "Geneva 4" },
      { src: "/images/geneva/DSC05171.JPG", alt: "Geneva 5" },
      { src: "/images/geneva/DSC05182.JPG", alt: "Geneva 6" },
      { src: "/images/geneva/DSC05183.JPG", alt: "Geneva 7" },
      { src: "/images/geneva/DSC05205.JPG", alt: "Geneva 8" },
      { src: "/images/geneva/DSC05239.JPG", alt: "Geneva 9" },
      { src: "/images/geneva/DSC05284.JPG", alt: "Geneva 10" },
      { src: "/images/geneva/DSC05279.JPG", alt: "Geneva 11" },
      { src: "/images/geneva/DSC05180.JPG", alt: "Geneva 12" },
      { src: "/images/geneva/DSC05172.JPG", alt: "Geneva 13" },
      { src: "/images/geneva/DSC05207.JPG", alt: "Geneva 14" },
      { src: "/images/geneva/DSC05214.JPG", alt: "Geneva 15" },
      { src: "/images/geneva/DSC05221.JPG", alt: "Geneva 16" },
      { src: "/images/geneva/DSC05202.JPG", alt: "Geneva 17" },
      { src: "/images/geneva/DSC05234.JPG", alt: "Geneva 18" },
      { src: "/images/geneva/DSC05240.JPG", alt: "Geneva 19" },
      { src: "/images/geneva/DSC05242.JPG", alt: "Geneva 20" },
      { src: "/images/geneva/DSC05290.JPG", alt: "Geneva 21" },
    ],
  },
  // Ireland
  {
    slug: "dublin",
    city: "Dublin",
    country: "Ireland",
    coordinates: [-6.2603, 53.3498],
    images: [
      { src: "", alt: "Dublin 1" },
      { src: "", alt: "Dublin 2" },
      { src: "", alt: "Dublin 3" },
    ],
  },
  // Albania
  {
    slug: "tirana",
    city: "Tirana",
    country: "Albania",
    coordinates: [19.8187, 41.3275],
    images: [
      { src: "", alt: "Tirana 1" },
      { src: "", alt: "Tirana 2" },
      { src: "", alt: "Tirana 3" },
    ],
  },
  // Lithuania
  {
    slug: "kaunas",
    city: "Kaunas",
    country: "Lithuania",
    coordinates: [23.8813, 54.8985],
    images: [
      { src: "", alt: "Kaunas 1" },
      { src: "", alt: "Kaunas 2" },
      { src: "", alt: "Kaunas 3" },
    ],
  },
  // Portugal
  {
    slug: "faro",
    city: "Faro",
    country: "Portugal",
    coordinates: [-7.9304, 37.0194],
    images: [
      { src: "", alt: "Faro 1" },
      { src: "", alt: "Faro 2" },
      { src: "", alt: "Faro 3" },
    ],
  },
  // Spain
  {
    slug: "fuerteventura",
    city: "Fuerteventura",
    country: "Spain",
    coordinates: [-14.0010, 28.3587],
    images: [
      { src: "/images/fuerteventura/DSC04984.JPG", alt: "Fuerteventura 1" },
      { src: "/images/fuerteventura/DSC04986.JPG", alt: "Fuerteventura 2" },
      { src: "/images/fuerteventura/DSC04990.JPG", alt: "Fuerteventura 3" },
      { src: "/images/fuerteventura/DSC04992.JPG", alt: "Fuerteventura 4" },
      { src: "/images/fuerteventura/DSC04994.JPG", alt: "Fuerteventura 5" },
      { src: "/images/fuerteventura/DSC04996.JPG", alt: "Fuerteventura 6" },
      { src: "/images/fuerteventura/DSC04999.JPG", alt: "Fuerteventura 7" },
      { src: "/images/fuerteventura/DSC05005.JPG", alt: "Fuerteventura 8" },
      { src: "/images/fuerteventura/DSC05008.JPG", alt: "Fuerteventura 9" },
      { src: "/images/fuerteventura/DSC05009.JPG", alt: "Fuerteventura 10" },
      { src: "/images/fuerteventura/DSC05013.JPG", alt: "Fuerteventura 11" },
      { src: "/images/fuerteventura/DSC05028.JPG", alt: "Fuerteventura 12" },
      { src: "/images/fuerteventura/DSC05095.JPG", alt: "Fuerteventura 13" },
      { src: "/images/fuerteventura/DSC05096.JPG", alt: "Fuerteventura 14" },
      { src: "/images/fuerteventura/DSC05132.JPG", alt: "Fuerteventura 15" },
      { src: "/images/fuerteventura/DSC05134.JPG", alt: "Fuerteventura 16" },
      { src: "/images/fuerteventura/DSC05135.JPG", alt: "Fuerteventura 17" },
      { src: "/images/fuerteventura/DSC05139.JPG", alt: "Fuerteventura 18" },
      { src: "/images/fuerteventura/DSC05140.JPG", alt: "Fuerteventura 19" },
      { src: "/images/fuerteventura/DSC05145.JPG", alt: "Fuerteventura 20" },
      { src: "/images/fuerteventura/DSC05152.JPG", alt: "Fuerteventura 21" },
      { src: "/images/fuerteventura/DSC05155.JPG", alt: "Fuerteventura 22" },
    ],
  },
  {
    slug: "lanzarote",
    city: "Lanzarote",
    country: "Spain",
    coordinates: [-13.6318, 28.9638],
    images: [
      { src: "/images/lanzarote/DSC05030.JPG", alt: "Lanzarote 1" },
      { src: "/images/lanzarote/DSC05031.JPG", alt: "Lanzarote 2" },
      { src: "/images/lanzarote/DSC05034.JPG", alt: "Lanzarote 3" },
      { src: "/images/lanzarote/DSC05035.JPG", alt: "Lanzarote 4" },
      { src: "/images/lanzarote/DSC05036.JPG", alt: "Lanzarote 5" },
      { src: "/images/lanzarote/DSC05037.JPG", alt: "Lanzarote 6" },
      { src: "/images/lanzarote/DSC05038.JPG", alt: "Lanzarote 7" },
      { src: "/images/lanzarote/DSC05039.JPG", alt: "Lanzarote 8" },
      { src: "/images/lanzarote/DSC05042.JPG", alt: "Lanzarote 9" },
      { src: "/images/lanzarote/DSC05049.JPG", alt: "Lanzarote 10" },
      { src: "/images/lanzarote/DSC05074.JPG", alt: "Lanzarote 11" },
      { src: "/images/lanzarote/DSC05077.JPG", alt: "Lanzarote 12" },
      { src: "/images/lanzarote/DSC05079.JPG", alt: "Lanzarote 13" },
      { src: "/images/lanzarote/DSC05080.JPG", alt: "Lanzarote 14" },
      { src: "/images/lanzarote/DSC05090.JPG", alt: "Lanzarote 15" },
    ],
  },
  {
    slug: "madrid",
    city: "Madrid",
    country: "Spain",
    coordinates: [-3.7038, 40.4168],
    images: [
      { src: "", alt: "Madrid 1" },
      { src: "", alt: "Madrid 2" },
      { src: "", alt: "Madrid 3" },
    ],
  },
  // Sweden
  {
    slug: "stockholm",
    city: "Stockholm",
    country: "Sweden",
    coordinates: [18.0686, 59.3293],
    images: [
      { src: "", alt: "Stockholm 1" },
      { src: "", alt: "Stockholm 2" },
      { src: "", alt: "Stockholm 3" },
    ],
  },
  // Romania
  {
    slug: "bucharest",
    city: "Bucharest",
    country: "Romania",
    coordinates: [26.1025, 44.4268],
    images: [
      { src: "", alt: "Bucharest 1" },
      { src: "", alt: "Bucharest 2" },
      { src: "", alt: "Bucharest 3" },
    ],
  },
  // UK
  {
    slug: "belfast",
    city: "Belfast",
    country: "Northern Ireland",
    coordinates: [-5.9301, 54.5973],
    images: [
      { src: "", alt: "Belfast 1" },
      { src: "", alt: "Belfast 2" },
      { src: "", alt: "Belfast 3" },
    ],
  },
  {
    slug: "glasgow",
    city: "Glasgow",
    country: "Scotland",
    coordinates: [-4.2518, 55.8642],
    images: [
      { src: "", alt: "Glasgow 1" },
      { src: "", alt: "Glasgow 2" },
      { src: "", alt: "Glasgow 3" },
    ],
  },
  {
    slug: "london",
    city: "London",
    country: "England",
    coordinates: [-0.1276, 51.5074],
    images: [
      { src: "", alt: "London 1" },
      { src: "", alt: "London 2" },
      { src: "", alt: "London 3" },
    ],
  },
  // USA
  {
    slug: "big-sur",
    city: "Big Sur",
    country: "USA",
    coordinates: [-121.8547, 36.2704],  
    images: [
      { src: "/images/san-francisco/DSC01996.jpg", alt: "Big Sur 1" },
      { src: "/images/san-francisco/DSC02003.jpg", alt: "Big Sur 2" },
      { src: "/images/san-francisco/DSC02005.jpg", alt: "Big Sur 3" },
      { src: "/images/san-francisco/DSC02046.jpg", alt: "Big Sur 4" },
      { src: "/images/san-francisco/DSC02002.jpg", alt: "Big Sur 5" },
      { src: "/images/san-francisco/DSC02045.jpg", alt: "Big Sur 6" },
      { src: "/images/san-francisco/DSC02013.jpg", alt: "Big Sur 7" },
      { src: "/images/san-francisco/DSC02018.jpg", alt: "Big Sur 8" },
      { src: "/images/san-francisco/DSC02024.jpg", alt: "Big Sur 9" },
      { src: "/images/san-francisco/DSC02042.jpg", alt: "Big Sur 10" },
      { src: "/images/san-francisco/DSC02026.jpg", alt: "Big Sur 11" },
      { src: "/images/san-francisco/DSC02033.jpg", alt: "Big Sur 12" },
      { src: "/images/san-francisco/DSC02030.jpg", alt: "Big Sur 13" },
      { src: "/images/san-francisco/DSC02025.jpg", alt: "Big Sur 14" },
      { src: "/images/san-francisco/DSC02048.jpg", alt: "Big Sur 15" },
      { src: "/images/san-francisco/DSC02027.jpg", alt: "Big Sur 16" },
      { src: "/images/san-francisco/DSC02000.jpg", alt: "Big Sur 17" },
      { src: "/images/san-francisco/DSC02031.jpg", alt: "Big Sur 18" },
      { src: "/images/san-francisco/DSC02028.jpg", alt: "Big Sur 19" },
      { src: "/images/san-francisco/DSC02043.jpg", alt: "Big Sur 20" },
      { src: "/images/san-francisco/DSC02008.jpg", alt: "Big Sur 21" },
      { src: "/images/san-francisco/DSC02040.jpg", alt: "Big Sur 22" },
    ],
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    country: "USA",
    coordinates: [-118.2437, 34.0522],
    images: [
      { src: "", alt: "Los Angeles 1" },
      { src: "", alt: "Los Angeles 2" },
      { src: "", alt: "Los Angeles 3" },
    ],
  },
  {
    slug: "orlando",
    city: "Orlando",
    country: "USA",
    coordinates: [-81.3789, 28.5383],
    images: [
      { src: "", alt: "Orlando 1" },
      { src: "", alt: "Orlando 2" },
      { src: "", alt: "Orlando 3" },
    ],
  },
  {
    slug: "san-francisco",
    city: "San Francisco",
    country: "USA",
    coordinates: [-122.4194, 37.7749],
    images: [
      { src: "/images/san-francisco/DSC03630.JPG", alt: "San Francisco 1"},
      { src: "/images/big-sur/DSC02150.jpg", alt: "San Francisco 2" },
      { src: "/images/big-sur/DSC02053.jpg", alt: "San Francisco 3" },
      { src: "/images/san-francisco/DSC03312.JPG", alt: "San Francisco 4" },
      { src: "/images/san-francisco/DSC03315.JPG", alt: "San Francisco 5" },
      { src: "/images/big-sur/DSC02063.jpg", alt: "San Francisco 6" },
      { src: "/images/san-francisco/DSC03633.JPG", alt: "San Francisco 7" },
      { src: "/images/san-francisco/DSC03316.JPG", alt: "San Francisco 8" },
      { src: "/images/san-francisco/DSC03320.JPG", alt: "San Francisco 9" },
      { src: "/images/san-francisco/DSC03351.JPG", alt: "San Francisco 10" },
      { src: "/images/san-francisco/DSC03615.JPG", alt: "San Francisco 11" },
      { src: "/images/big-sur/DSC02143.jpg", alt: "San Francisco 12" },
      { src: "/images/san-francisco/DSC03360.JPG", alt: "San Francisco 13" },
      { src: "/images/san-francisco/DSC03623.JPG", alt: "San Francisco 14" },      
      { src: "/images/big-sur/DSC02067.jpg", alt: "San Francisco 15" },
      { src: "/images/san-francisco/DSC03365.JPG", alt: "San Francisco 16" },
      { src: "/images/big-sur/DSC02061.jpg", alt: "San Francisco 17" },
      { src: "/images/san-francisco/DSC03377.JPG", alt: "San Francisco 18" },
      { src: "/images/san-francisco/DSC03379.JPG", alt: "San Francisco 19" },
      { src: "/images/san-francisco/DSC03384.JPG", alt: "San Francisco 20" },
      { src: "/images/san-francisco/DSC03424.JPG", alt: "San Francisco 21" },
      { src: "/images/san-francisco/DSC03426.JPG", alt: "San Francisco 22" },
      { src: "/images/big-sur/DSC02152.jpg", alt: "San Francisco 23" },
      { src: "/images/san-francisco/DSC03602.JPG", alt: "San Francisco 24" },
      { src: "/images/big-sur/DSC02068.jpg", alt: "San Francisco 25" },
      { src: "/images/san-francisco/DSC03605.JPG", alt: "San Francisco 26" },
      { src: "/images/san-francisco/DSC03610.JPG", alt: "San Francisco 27" },
      { src: "/images/san-francisco/DSC03612.JPG", alt: "San Francisco 28" },
      { src: "/images/san-francisco/DSC03614.JPG", alt: "San Francisco 29" },
      { src: "/images/san-francisco/DSC03627.JPG", alt: "San Francisco 30" },
    ],
  },
  {
    slug: "new-york-city",
    city: "New York City",
    country: "USA",
    coordinates: [-74.0060, 40.7128],
    images: [
      { src: "/images/new-york-city/DSC03132.JPG", alt: "New York City 1" },
      { src: "/images/new-york-city/DSCN0240.JPG", alt: "New York City 2" },
      { src: "/images/new-york-city/DSCN0149.JPG", alt: "New York City 3" },
      { src: "/images/new-york-city/DSCN0259.JPG", alt: "New York City 4" },
      { src: "/images/new-york-city/DSC03070.JPG", alt: "New York City 5" },
      { src: "/images/new-york-city/DSC03073.JPG", alt: "New York City 6" },
      { src: "/images/new-york-city/image.jpg", alt: "New York City 7" },
      { src: "/images/new-york-city/DSCN0247.JPG", alt: "New York City 8" },
      { src: "/images/new-york-city/DSCN0230.JPG", alt: "New York City 9" },
      { src: "/images/new-york-city/image2.jpg", alt: "New York City 10" },
      { src: "/images/new-york-city/DSCN0263.JPG", alt: "New York City 11" },
      { src: "/images/new-york-city/DSCN0234.JPG", alt: "New York City 12"},
      { src: "/images/new-york-city/DSCN0248.JPG", alt: "New York City 13" },      
    ],
  },
  {
    slug: "santa-monica",
    city: "Santa Monica",
    country: "USA",
    coordinates: [-118.4912, 34.0195],
    images: [
      { src: "/images/santa-monica/DSC02085.jpg", alt: "Santa Monica 1" },
      { src: "/images/santa-monica/DSC02099.jpg", alt: "Santa Monica 2" },
      { src: "/images/santa-monica/DSC02104.jpg", alt: "Santa Monica 3" },
      { src: "/images/santa-monica/DSC02111.jpg", alt: "Santa Monica 4" },
      { src: "/images/santa-monica/DSC02108.jpg", alt: "Santa Monica 5" },
      { src: "/images/santa-monica/DSC02089.jpg", alt: "Santa Monica 6" },
      { src: "/images/santa-monica/DSC02093.jpg", alt: "Santa Monica 7" },
      { src: "/images/santa-monica/DSC02095.jpg", alt: "Santa Monica 8" },
      { src: "/images/santa-monica/DSC02109.jpg", alt: "Santa Monica 9" },
      { src: "/images/santa-monica/DSC02107.jpg", alt: "Santa Monica 10" },
      { src: "/images/santa-monica/DSC02092.jpg", alt: "Santa Monica 11" },
      { src: "/images/santa-monica/DSC02103.jpg", alt: "Santa Monica 12" },
    ],
  },
  // Viet Nam
  {
    slug: "ho-chi-minh",
    city: "Hồ Chí Minh",
    country: "ViỆt Nam",
    coordinates: [106.6297, 10.8231],
    images: [
      { src: "", alt: "Ho Chi Minh 1" },
      { src: "", alt: "Ho Chi Minh 2" },
      { src: "", alt: "Ho Chi Minh 3" },
    ],
  },
  {
    slug: "nha-trang",
    city: "Nha Trang",
    country: "ViỆt Nam",
    coordinates: [109.1967, 12.2388],
    images: [
      { src: "", alt: "Nha Trang 1" },
      { src: "", alt: "Nha Trang 2" },
      { src: "", alt: "Nha Trang 3" },
    ],
  },
];

export const friendsGallery = {
  slug: "ode-to-my-friends",
  title: "An Ode to My Friends",
  images: [
    { src: "/images/friends/friends_!.JPG", alt: "Friends 1" },
    { src: "/images/friends/friends_5.jpg", alt: "Friends 2" },
    { src: "/images/friends/friends_6.JPG", alt: "Friends 3" },
    { src: "/images/friends/friends_3.jpg", alt: "Friends 5" },
    { src: "/images/friends/friends_9.jpg", alt: "Friends 6" },
    { src: "/images/friends/friends_10.jpg", alt: "Friends 7" },
    { src: "/images/friends/friends_11.jpg", alt: "Friends 8" },
  ],
};

export const getLocationBySlug = (slug: string): LocationData | undefined => {
  return locations.find((l) => l.slug === slug);
};

locations.sort((a, b) => {
  const countryCmp = a.country.localeCompare(b.country, "en", { sensitivity: "base" });
  if (countryCmp !== 0) return countryCmp;
  return a.city.localeCompare(b.city, "en", { sensitivity: "base" });
});

locations.forEach((location) => {
  const driveOverride = driveCityImageOverrides[location.slug];
  if (driveOverride?.length) {
    location.images = driveOverride.map((image, index) => ({
      src: image.src,
      alt: image.alt || `${location.city} ${index + 1}`,
    }));
  }

  const cityThumbnailSrc = getFirstImageSrc(location.images);
  location.images = location.images.map((image) => ({
    ...image,
    thumbSrc: cityThumbnailSrc ? withPagesBase(cityThumbnailSrc) : "",
    previewSrc: (() => {
      const previewPath = toPreviewLocalPath(image.src);
      return previewPath ? withPagesBase(previewPath) : "";
    })(),
    ...(() => {
      const localPath = toLocalImagePath(image.src);
      if (!localPath) return {};
      return imageDimensionsBySrc[localPath] || {};
    })(),
    src: withPagesBase(image.src),
  }));
});

const friendsThumbnailSrc = getFirstImageSrc(friendsGallery.images);
friendsGallery.images = friendsGallery.images.map((image) => ({
  ...image,
  thumbSrc: friendsThumbnailSrc ? withPagesBase(friendsThumbnailSrc) : "",
  previewSrc: (() => {
    const previewPath = toPreviewLocalPath(image.src);
    return previewPath ? withPagesBase(previewPath) : "";
  })(),
  ...(() => {
    const localPath = toLocalImagePath(image.src);
    if (!localPath) return {};
    return imageDimensionsBySrc[localPath] || {};
  })(),
  src: withPagesBase(image.src),
}));


