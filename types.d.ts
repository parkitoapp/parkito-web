export type BannerProps = {
    src: string,
    src2: string;
    title: string,
    subtitle?: string,
    dwbtn?: false | boolean,
    btn1?: false | boolean,
    btn2?: false | boolean,
    link1?: false | string,
    link2?: false | string,
    text1?: false | string,
    text2?: false | string,
    icon?: false | boolean,
    social?: false | boolean,
    classname?: string,
}


export type AppleReview = {
    id: string;
    attributes: {
        authorName?: string;
        rating?: number;
        title?: string;
        body?: string;
        date?: string;
    };
}

export type ReviewCardType = {
    name: string,
    title: string,
    rating: number,
    body: string,
    date: string,
}

/**
 * "review": {
"type": "customerReviews",
"id": "00000180-39d4-e402-e3c2-d9e900000000",
"attributes": {
"rating": 5,
"title": "Prima volta … TOP",
"body": "Cercavo parcheggio per 2 giorni a Torino ma con mia sorpresa i prezzi trovati sono tutti molto alti, almeno secondo il mio punto di vista. \nPer caso mi imbatto in Parkito, trovo parcheggio coperto vicino e alla metà dei prezzi visti fino a quel momento. \nChiedo assistenza via whatsapp , anche per capire meglio come funziona, tutte risposte chiare e precise, bravi. Provate e ne reterete sorpresi.",
"reviewerNickname": "Sambo2022",
"createdDate": "2025-03-12T02:41:55-07:00",
"territory": "ITA"
},
"relationships": {
"response": {
"links": {
"self": "https://api.appstoreconnect.apple.com/v1/customerReviews/00000180-39d4-e402-e3c2-d9e900000000/relationships/response",
"related": "https://api.appstoreconnect.apple.com/v1/customerReviews/00000180-39d4-e402-e3c2-d9e900000000/response"
}
}
},
"links": {
"self": "https://api.appstoreconnect.apple.com/v1/customerReviews/00000180-39d4-e402-e3c2-d9e900000000"
}
}
 */

export interface GoogleUserComment {
    starRating?: number;
    text?: string;
    appVersionName?: string;
    lastModified?: { seconds?: number };
}

export interface GoogleComment {
    userComment?: GoogleUserComment;
}

export interface GoogleReview {
    reviewId: string;
    authorName?: string;
    comments?: GoogleComment[];
}


export type citiesType = {
    name: string,
    link: string,
    subLinks?: null | citiesType[],
}
export type Slug = {
    _type: "slug";
    current: string;
};

export type SanityImage = {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
};

export type Block = {
    _type: "block";
    children: { _type: "span"; text: string }[];
};

export type BlogPost = {
    _id: string;
    title: string;
    slug: Slug;
    publishedAt: string;
    coverImage?: SanityImage;
    tags: string[];
    author?: {
        name: string;
        role: string;
        image?: SanityImage;
    };
    content: Section[];
};

export type Section = {
    id: string;
    title: string;
    images?: SanityImage[];
    body: Block[];
};

export type FAQ = {
    question: string,
    answer: string,
}

export type ErrorType = {
    title: string,
    message: string,
    onClick?: () => void
}

export type blogFaq = {
    city: string;
    faqs: FAQ[];
};

export type TeamMember = {
    id: string;
    name: string;
    url: string;
    image: string;
};

export type SelectOption = {
    label: string;
    memberId: string;
};

export type Parking = {
    id: number,
    name: string,
    address: string,
    city: string,
    vehicle_type: string,
    parking_type: string,
    driver_name: string,
    description: string,
}