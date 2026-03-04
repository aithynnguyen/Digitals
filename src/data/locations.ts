export interface LocationData {
  slug: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude] for the map
  images: { src: string; alt: string }[];
}

const withPagesBase = (src: string): string => {
  if (src.startsWith("/images/")) {
    return `${import.meta.env.BASE_URL}${src.slice(1)}`;
  }

  return src;
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
      { src: "", alt: "Vancouver 1" },
      { src: "", alt: "Vancouver 2" },
      { src: "", alt: "Vancouver 3" },
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
      { src: "", alt: "Geneva 1" },
      { src: "", alt: "Geneva 2" },
      { src: "", alt: "Geneva 3" },
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
      { src: "", alt: "Fuerteventura 1" },
      { src: "", alt: "Fuerteventura 2" },
      { src: "", alt: "Fuerteventura 3" },
    ],
  },
  {
    slug: "lanzarote",
    city: "Lanzarote",
    country: "Spain",
    coordinates: [-13.6318, 28.9638],
    images: [
      { src: "", alt: "Lanzarote 1" },
      { src: "", alt: "Lanzarote 2" },
      { src: "", alt: "Lanzarote 3" },
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
      { src: "/images/big-sur/DSC02150.jpg", alt: "San Francisco 1" },
      { src: "/images/big-sur/DSC02053.jpg", alt: "San Francisco 2" },
      { src: "/images/big-sur/DSC02157.jpg", alt: "San Francisco 3" },
      { src: "/images/big-sur/DSC02063.jpg", alt: "San Francisco 4" },
      { src: "/images/big-sur/DSC02136.jpg", alt: "San Francisco 5" },
      { src: "/images/big-sur/DSC02082.jpg", alt: "San Francisco 6" },
      { src: "/images/big-sur/DSC02143.jpg", alt: "San Francisco 7" },
      { src: "/images/big-sur/DSC02067.jpg", alt: "San Francisco 8" },
      { src: "/images/big-sur/DSC02061.jpg", alt: "San Francisco 9" },
      { src: "/images/big-sur/DSC02059.jpg", alt: "San Francisco 10" },
      { src: "/images/big-sur/DSC02146.jpg", alt: "San Francisco 11" },
      { src: "/images/big-sur/DSC02064.jpg", alt: "San Francisco 12" },
      { src: "/images/big-sur/DSC02062.jpg", alt: "San Francisco 13" },
      { src: "/images/big-sur/DSC02152.jpg", alt: "San Francisco 14" },
      { src: "/images/big-sur/DSC02068.jpg", alt: "San Francisco 15" },
      { src: "/images/big-sur/DSC02137.jpg", alt: "San Francisco 16" },
    ],
  },
  {
    slug: "new-york-city",
    city: "New York City",
    country: "USA",
    coordinates: [-74.0060, 40.7128],
    images: [
      { src: "", alt: "New York City 1" },
      { src: "", alt: "New York City 2" },
      { src: "", alt: "New York City 3" },
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
    { src: "", alt: "Friends 1" },
    { src: "", alt: "Friends 2" },
    { src: "", alt: "Friends 3" },
    { src: "", alt: "Friends 4" },
    { src: "", alt: "Friends 5" },
    { src: "", alt: "Friends 6" },
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
  location.images = location.images.map((image) => ({
    ...image,
    src: withPagesBase(image.src),
  }));
});

friendsGallery.images = friendsGallery.images.map((image) => ({
  ...image,
  src: withPagesBase(image.src),
}));


