// Prices in the offer catalog come from the fleet data, so they never drift from the site.
import { fleet, rateText } from "./content";

// Site-wide JSON-LD ported from the PHP header.
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.shanvitoursandtravels.com/#website",
  "name": "Shanvi Tours & Travels",
  "url": "https://www.shanvitoursandtravels.com/",
  "description": "Mini Bus & Bus Rental Company in Bangalore - 12 to 49 Seater AC Coaches With Chauffeur",
  "publisher": {
    "@id": "https://www.shanvitoursandtravels.com/#organization"
  },
  "inLanguage": "en-IN"
} as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": [
    "TravelAgency",
    "AutoRental",
    "LocalBusiness"
  ],
  "@id": "https://www.shanvitoursandtravels.com/#organization",
  "name": "Shanvi Tours & Travels",
  "legalName": "Shanvi Tours & Travels Bangalore",
  "alternateName": [
    "Shanvi Travels Bangalore",
    "Shanvi Bus Rental Bangalore",
    "Shanvi Tours Bangalore",
    "Shanvi Tours & Travels Doddabasthihalli",
    "Shanvi Tours & Travels SMV Layout"
  ],
  "disambiguatingDescription": "Shanvi Tours & Travels Bangalore is an independent commercial passenger transport service based in Nagadevanahalli, Bangalore, Karnataka (PIN 560056) operating Yellow-Board buses with drivers since 2013. We are not affiliated with third-party bus operators of similar names in Indore, Lucknow, Noida, or RedBus booking agents.",
  "slogan": "Bangalore's Trusted Mini Bus & Bus Rental Service Since 2013",
  "foundingDate": "2013",
  "founder": {
    "@type": "Person",
    "name": "Pradeep H.B.",
    "jobTitle": "Founder & Managing Director",
    "worksFor": {
      "@type": "TravelAgency",
      "name": "Shanvi Tours & Travels Bangalore"
    }
  },
  "description": "Established in 2013, Shanvi Tours & Travels is a licensed commercial passenger transport company in Bangalore providing 12+1, 21+1, 33+1, and 49+1 seater AC mini buses and luxury coaches with verified drivers for corporate shuttles, employee transport, weddings, school trips, and outstation tours across Karnataka, Kerala, Tamil Nadu, Telangana, and Andhra Pradesh.",
  "image": "https://www.shanvitoursandtravels.com/images/coach/coach-sunset-side.jpg",
  "logo": "https://www.shanvitoursandtravels.com/images/logo.png",
  "url": "https://www.shanvitoursandtravels.com/",
  "telephone": "+91-9611120023",
  "priceRange": "₹₹",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Bangalore Commercial Bus & Tempo Traveller Rental Tariffs",
    "itemListElement": fleet.map((v) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": `${v.seats} ${v.name} Rental Bangalore`,
        "description": `Local 8-Hour / 80-Km package from ₹${v.local.toLocaleString("en-IN")}; outstation ${rateText(v)} per km`,
      },
      "priceSpecification": { "@type": "PriceSpecification", "price": String(v.local), "priceCurrency": "INR" },
    })),
  },
  "paymentAccepted": [
    "Cash",
    "Credit Card",
    "UPI",
    "Bank Transfer",
    "Corporate Invoicing"
  ],
  "currenciesAccepted": "INR",
  "knowsAbout": [
    "Mini Bus Rental Bangalore",
    "Bus Rental Bangalore",
    "Tempo Traveller Hire Bangalore",
    "12 Seater Tempo Traveller Rental",
    "21 Seater Mini Bus Rental",
    "33 Seater Bus Hire Bangalore",
    "49 Seater Luxury Bus Rental",
    "Corporate Bus Rental Bangalore",
    "Employee Transport Services Bangalore",
    "Wedding Bus Rental Bangalore",
    "Wedding Transport Logistics Bangalore",
    "49+1 Luxury Coach Wedding Rental",
    "Multi-Vehicle Coordinated Convoys for Weddings with 200+ Guests",
    "Continuous Shuttle Loops Between Guest Hotels and Reception Venues",
    "School and College Excursion Bus Hire",
    "Pilgrimage Bus Rental Tirupati Dharmasthala",
    "Outstation Bus Hire Karnataka South India",
    "All India Tourist Permit Commercial Buses"
  ],
  "hasMap": "https://maps.app.goo.gl/xzitq4A2wqQ5V18X7",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "#2472/1, 3rd Block, SMV Layout, Doddabasthihalli, Near Vijaya Hospital, Nagadevanahalli",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560056",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9634,
    "longitude": 77.5099
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Bangalore"
    },
    {
      "@type": "State",
      "name": "Karnataka"
    },
    {
      "@type": "State",
      "name": "Kerala"
    },
    {
      "@type": "State",
      "name": "Tamil Nadu"
    },
    {
      "@type": "State",
      "name": "Telangana"
    },
    {
      "@type": "State",
      "name": "Andhra Pradesh"
    },
    {
      "@type": "Place",
      "name": "Whitefield, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Electronic City, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Koramangala, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Indiranagar, Bangalore"
    },
    {
      "@type": "Place",
      "name": "HSR Layout, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Marathahalli, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Jayanagar, Bangalore"
    },
    {
      "@type": "Place",
      "name": "JP Nagar, Bangalore"
    },
    {
      "@type": "Place",
      "name": "BTM Layout, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Yelahanka, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Hebbal, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Banashankari, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Malleshwaram, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Rajajinagar, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Sarjapur Road, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Bannerghatta Road, Bangalore"
    },
    {
      "@type": "Place",
      "name": "KR Puram, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Bellandur, Bangalore"
    },
    {
      "@type": "Place",
      "name": "RT Nagar, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Yeshwanthpur, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Nagadevanahalli, Bangalore"
    },
    {
      "@type": "Place",
      "name": "Kengeri, Bangalore"
    },
    {
      "@type": "Place",
      "name": "SMV Layout, Bangalore"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 12.9634,
      "longitude": 77.5099
    },
    "geoRadius": "50000"
  },
  "sameAs": [
    "https://maps.app.goo.gl/xzitq4A2wqQ5V18X7"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "25",
    "reviewCount": "25"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Goutham Gowda"
      },
      "datePublished": "2026-09-01",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Good and friendly driver and had a pleasant trip with Shanvi tours and travels. Very good service"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Ranjitha Gowda"
      },
      "datePublished": "2026-09-10",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Good and clean buses, and the driver is polite and good and safe driving. Super experiences in Shanvi tours and travels bus."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Praveen K"
      },
      "datePublished": "2026-09-18",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Good Service, super interior and exterior, driving was to good. Thank you for Shanvi tours and travels"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Manoj Kumar C"
      },
      "datePublished": "2026-09-05",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Service was very good and communication with driver also friendly"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Anand H S"
      },
      "datePublished": "2026-09-02",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Good experience good driver and maintain"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-9611120023",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": [
        "en",
        "kn",
        "hi"
      ],
      "hoursAvailable": "Mo-Su 00:00-23:59"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-8050507333",
      "contactType": "reservations",
      "areaServed": "IN",
      "availableLanguage": [
        "en",
        "kn",
        "hi"
      ]
    }
  ]
} as const;
