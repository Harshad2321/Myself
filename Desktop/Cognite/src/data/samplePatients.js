export const patients = [
  {
    id: 1,
    name: "Rajan Iyer",
    age: 78,
    diagnosis: "Early-Stage Alzheimer's",
    theme: "Temple & Garden",
    profileImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
    caregiver: "Dr. Meera Nair",
    memories: [
      {
        id: 1,
        title: "Wedding at Kapaleeshwarar Temple",
        emotion: "Love",
        decade: "1960s",
        image: "https://images.unsplash.com/photo-1583241800698-2d01f31c2320?w=600",
        description: "A beautiful ceremony filled with family blessings and traditional rituals.",
        type: "photo"
      },
      {
        id: 2,
        title: "Chess Championship 1968",
        emotion: "Triumph",
        decade: "1960s",
        image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600",
        description: "Winning the inter-state chess tournament - a moment of pride and strategy.",
        type: "photo"
      },
      {
        id: 3,
        title: "Morning Walks in Lalbagh",
        emotion: "Calm",
        decade: "1990s",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600",
        description: "Peaceful morning strolls through the botanical gardens.",
        type: "photo"
      },
      {
        id: 4,
        title: "Carnatic Music - MS Subbulakshmi",
        emotion: "Nostalgia",
        decade: "1970s",
        audio: "Suprabhatam Morning Raga",
        description: "Classical music that brings peace to the soul.",
        type: "music"
      }
    ],
    musicLibrary: [
      { title: "Suprabhatam", artist: "MS Subbulakshmi", decade: "1970s", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300" },
      { title: "Vande Mataram", artist: "Lata Mangeshkar", decade: "1950s", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
      { title: "Raag Bhairav", artist: "Pandit Ravi Shankar", decade: "1980s", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300" }
    ],
    stories: [
      { title: "The Day I Met Amma", text: "It was a rainy evening in Madras when I first saw her at the temple...", emotion: "Love" },
      { title: "Engineering College Days", text: "Those were the days of slide rules and hand-drawn diagrams...", emotion: "Nostalgia" }
    ]
  },
  {
    id: 2,
    name: "Fatima Begum",
    age: 72,
    diagnosis: "Moderate Dementia",
    theme: "Family & Cuisine",
    profileImage: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=400",
    caregiver: "Nurse Ayesha Khan",
    memories: [
      {
        id: 5,
        title: "Eid Celebrations with Grandchildren",
        emotion: "Joy",
        decade: "2000s",
        image: "https://images.unsplash.com/photo-1623230658178-94b5f5516c90?w=600",
        description: "The house filled with laughter, sweets, and new clothes.",
        type: "photo"
      },
      {
        id: 6,
        title: "Making Biryani with Ammi",
        emotion: "Nostalgia",
        decade: "1950s",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600",
        description: "Learning the family recipe passed down through generations.",
        type: "photo"
      },
      {
        id: 7,
        title: "Garden of Roses",
        emotion: "Calm",
        decade: "1980s",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
        description: "Tending to the rose bushes every morning before sunrise.",
        type: "photo"
      }
    ],
    musicLibrary: [
      { title: "Kun Faya Kun", artist: "A.R. Rahman", decade: "2010s", cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300" },
      { title: "Piya Haji Ali", artist: "Fariha Pervez", decade: "2000s", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300" }
    ],
    stories: [
      { title: "Ramadan Nights", text: "The sound of azaan during iftar, breaking fast with dates...", emotion: "Joy" },
      { title: "My Mother's Kitchen", text: "The aroma of spices, the warmth of the stove...", emotion: "Love" }
    ]
  },
  {
    id: 3,
    name: "David Fernandes",
    age: 81,
    diagnosis: "Advanced Alzheimer's",
    theme: "Ocean & Faith",
    profileImage: "https://images.unsplash.com/photo-1543423924-b9f161af87e4?w=400",
    caregiver: "Nurse Maria D'Souza",
    memories: [
      {
        id: 8,
        title: "Fishing Boat at Sunrise",
        emotion: "Calm",
        decade: "1970s",
        image: "https://images.unsplash.com/photo-1534843021-7f0e47a3c1d4?w=600",
        description: "Early morning catches on the Arabian Sea.",
        type: "photo"
      },
      {
        id: 9,
        title: "Christmas Mass at St. Francis Church",
        emotion: "Peace",
        decade: "1960s",
        image: "https://images.unsplash.com/photo-1482398650355-d4c6462afa0e?w=600",
        description: "Midnight mass filled with carols and candlelight.",
        type: "photo"
      },
      {
        id: 10,
        title: "Beach Walks with My Wife",
        emotion: "Love",
        decade: "1990s",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        description: "Golden sunsets and gentle waves.",
        type: "photo"
      }
    ],
    musicLibrary: [
      { title: "Silent Night", artist: "Church Choir", decade: "1960s", cover: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=300" },
      { title: "Ave Maria", artist: "Classical", decade: "1950s", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" }
    ],
    stories: [
      { title: "The Big Catch", text: "I remember the day we caught a fish so big, it took three men to pull it in...", emotion: "Triumph" },
      { title: "Building Our Home", text: "Brick by brick, we built our dream house by the sea...", emotion: "Pride" }
    ]
  },
  {
    id: 4,
    name: "Priya Sharma",
    age: 69,
    diagnosis: "Early-Stage Vascular Dementia",
    theme: "Books & Culture",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    caregiver: "Dr. Anjali Verma",
    memories: [
      {
        id: 11,
        title: "University Convocation Day",
        emotion: "Pride",
        decade: "1970s",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
        description: "Receiving my PhD in Literature - years of hard work.",
        type: "photo"
      },
      {
        id: 12,
        title: "Kathak Performance at India Habitat Centre",
        emotion: "Joy",
        decade: "1980s",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
        description: "Dancing to the rhythm of tabla and ghungroo.",
        type: "photo"
      },
      {
        id: 13,
        title: "Reading in the Library",
        emotion: "Calm",
        decade: "2000s",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
        description: "Lost in the pages of Tagore's poetry.",
        type: "photo"
      }
    ],
    musicLibrary: [
      { title: "Ekla Chalo Re", artist: "Rabindranath Tagore", decade: "1970s", cover: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300" },
      { title: "Classical Tabla", artist: "Zakir Hussain", decade: "1990s", cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300" }
    ],
    stories: [
      { title: "My First Published Paper", text: "The thrill of seeing my name in print for the first time...", emotion: "Pride" },
      { title: "Summer in Shimla", text: "Reading books on the hillside, surrounded by pine trees...", emotion: "Nostalgia" }
    ]
  }
];

export const caregiverSessions = [
  { date: "2025-10-15", patient: "Rajan Iyer", memoryType: "Photo", emotion: "Calm", duration: "15 min" },
  { date: "2025-10-15", patient: "Fatima Begum", memoryType: "Music", emotion: "Joy", duration: "20 min" },
  { date: "2025-10-14", patient: "David Fernandes", memoryType: "Story", emotion: "Peace", duration: "12 min" },
  { date: "2025-10-14", patient: "Priya Sharma", memoryType: "Photo", emotion: "Pride", duration: "18 min" },
  { date: "2025-10-13", patient: "Rajan Iyer", memoryType: "Garden Walk", emotion: "Nostalgia", duration: "25 min" },
  { date: "2025-10-13", patient: "Fatima Begum", memoryType: "Photo", emotion: "Love", duration: "16 min" },
  { date: "2025-10-12", patient: "David Fernandes", memoryType: "Music", emotion: "Calm", duration: "22 min" },
  { date: "2025-10-12", patient: "Priya Sharma", memoryType: "Story", emotion: "Joy", duration: "14 min" }
];

export const emotionColors = {
  "Love": "#FFB6C1",
  "Joy": "#FFD700",
  "Calm": "#87CEEB",
  "Peace": "#B8E6D5",
  "Nostalgia": "#C1A3FF",
  "Triumph": "#FFA500",
  "Pride": "#D4A017"
};

