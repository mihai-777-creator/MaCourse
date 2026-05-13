// ===== DONNÉES PLATEFORME ÉDUCATIONNELLE =====

// Catégories
const categories = [
  { id: 1, name: 'Programmation', icon: '💻', color: '#3b82f6' },
  { id: 2, name: 'Design', icon: '🎨', color: '#ec4899' },
  { id: 3, name: 'Business', icon: '💼', color: '#f59e0b' },
  { id: 4, name: 'Marketing', icon: '📊', color: '#10b981' },
  { id: 5, name: 'Langues Étrangères', icon: '🌍', color: '#8b5cf6' },
  { id: 6, name: 'Mathématiques', icon: '📐', color: '#06b6d4' },
  { id: 7, name: 'Intelligence Artificielle', icon: '🤖', color: '#ef4444' },
  { id: 8, name: 'Développement Personnel', icon: '🚀', color: '#14b8a6' }
];

// Instructeurs
const instructors = [
  {
    id: 1,
    name: 'Alex Popescu',
    title: 'Expert en Programmation Web',
    bio: 'Avec 10 ans d\'expérience en développement web, Alex a travaillé avec des entreprises Fortune 500 et a formé des milliers d\'étudiants.',
    avatar: '👨‍💼',
    specialties: ['JavaScript', 'React', 'Node.js'],
    studentCount: 15000,
    courses: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Maria Ionescu',
    title: 'UI/UX Designer',
    bio: 'Designer passionnée par l\'expérience utilisateur. Maria a remporté plusieurs prix internationaux pour ses designs.',
    avatar: '👩‍🦰',
    specialties: ['Figma', 'UI Design', 'Prototipage'],
    studentCount: 8500,
    courses: [4, 5]
  },
  {
    id: 3,
    name: 'Ion Diaconu',
    title: 'Consultant d\'Affaires',
    bio: 'Entrepreneur et consultant stratégique avec une expérience dans diverses industries et marchés internationaux.',
    avatar: '👨‍💼',
    specialties: ['Stratégie', 'Négociation', 'Management'],
    studentCount: 12000,
    courses: [6, 7]
  },
  {
    id: 4,
    name: 'Elena Marinescu',
    title: 'Spécialiste Marketing Digital',
    bio: 'Experte en stratégie de marketing digital avec des résultats mesurables et un ROI élevé.',
    avatar: '👩‍💼',
    specialties: ['SEO', 'Social Media', 'PPC'],
    studentCount: 10500,
    courses: [8, 9]
  },
  {
    id: 5,
    name: 'Andrei Țepeș',
    title: 'Ingénieur AI/ML',
    bio: 'Chercheur et ingénieur en machine learning avec des publications internationales et une expérience chez Google.',
    avatar: '👨‍💻',
    specialties: ['Python', 'Machine Learning', 'Deep Learning'],
    studentCount: 6800,
    courses: [11, 12]
  },
  {
    id: 6,
    name: 'Sophia Chen',
    title: 'Professeur de Langues Étrangères',
    bio: 'Polyglotte avec une maîtrise de 5 langues. Méthodes d\'enseignement innovantes et interactives.',
    avatar: '👩‍🏫',
    specialties: ['Anglais', 'Français', 'Espagnol'],
    studentCount: 18000,
    courses: [13, 14, 15]
  }
];

// Cursuri
const courses = [
  {
    id: 1,
    title: 'JavaScript Complet : De Zéro au Héros',
    description: 'Apprenez JavaScript moderne avec des projets pratiques. Nous couvrons ES6+, async/await, et des concepts avancés.',
    category: 1,
    categoryName: 'Programmation',
    level: 'Débutant',
    duration: '40 heures',
    lessons: 85,
    instructor: 1,
    instructorName: 'Alex Popescu',
    price: 199,
    free: false,
    rating: 4.9,
    ratingCount: 2847,
    students: 14200,
    image: '📖',
    objectives: [
      'Connaissances fondamentales de JavaScript',
      'Programmation asynchrone',
      'Manipulation du DOM',
      'ES6 et versions plus récentes',
      'Débogage et meilleures pratiques'
    ],
    bestSeller: true,
    featured: true
  },
  {
    id: 2,
    title: 'React Moderne : Construisez des Applications Web',
    description: 'Maîtrisez React avec Hooks, Context API et Redux. Construisez des applications réelles et scalables.',
    category: 1,
    categoryName: 'Programmation',
    level: 'Intermédiaire',
    duration: '45 ore',
    lessons: 92,
    instructor: 1,
    instructorName: 'Alex Popescu',
    price: 249,
    free: false,
    rating: 4.85,
    ratingCount: 2156,
    students: 10800,
    image: '⚛️',
    objectives: [
      'Composants React et JSX',
      'Hooks et gestion d\'état',
      'Context API et Redux',
      'Routage et code splitting',
      'Optimisation des performances'
    ],
    bestSeller: true,
    featured: true
  },
  {
    id: 3,
    title: 'Node.js : Maîtrise du Développement Backend',
    description: 'Développez des serveurs scalables avec Node.js, Express et bases de données. Projets complets et professionnels.',
    category: 1,
    categoryName: 'Programmation',
    level: 'Intermédiaire',
    duration: '50 ore',
    lessons: 105,
    instructor: 1,
    instructorName: 'Alex Popescu',
    price: 279,
    free: false,
    rating: 4.8,
    ratingCount: 1842,
    students: 9500,
    image: '🛠️',
    objectives: [
      'Fondamentaux de Node.js',
      'Framework Express.js',
      'Bases de données et ORM',
      'Authentification et sécurité',
      'Déploiement et bases DevOps'
    ],
    bestSeller: false,
    featured: true
  },
  {
    id: 4,
    title: 'Principes Fondamentaux du Design UI/UX',
    description: 'Principes du design moderne, recherche utilisateur, wireframing et prototypage avec Figma.',
    category: 2,
    categoryName: 'Design',
    level: 'Débutant',
    duration: '35 ore',
    lessons: 64,
    instructor: 2,
    instructorName: 'Maria Ionescu',
    price: 189,
    free: false,
    rating: 4.75,
    ratingCount: 1523,
    students: 7200,
    image: '🎨',
    objectives: [
      'Principes du design',
      'Recherche utilisateur',
      'Wireframing et maquettes',
      'Prototypage dans Figma',
      'Design responsive'
    ],
    bestSeller: false,
    featured: false
  },
  {
    id: 5,
    title: 'Figma: Masterclass de Design',
    description: 'Devenez expert en Figma. Créez des systèmes de design, des composants et collaborez efficacement.',
    category: 2,
    categoryName: 'Design',
    level: 'Intermédiaire',
    duration: '30 ore',
    lessons: 58,
    instructor: 2,
    instructorName: 'Maria Ionescu',
    price: 169,
    free: false,
    rating: 4.7,
    ratingCount: 1215,
    students: 6800,
    image: '🖌️',
    objectives: [
      'Interface Figma avancée',
      'Systèmes de design',
      'Composants et variantes',
      'Collaboration en temps réel',
      'Export et intégrations'
    ],
    bestSeller: false,
    featured: false
  },
  {
    id: 6,
    title: 'Entrepreneuriat et Innovation',
    description: 'Comment lancer une startup. Stratégie d\'affaires, financement et croissance.',
    category: 3,
    categoryName: 'Business',
    level: 'Intermédiaire',
    duration: '25 ore',
    lessons: 48,
    instructor: 3,
    instructorName: 'Ion Diaconu',
    price: 159,
    free: false,
    rating: 4.6,
    ratingCount: 1089,
    students: 5400,
    image: '🚀',
    objectives: [
      'Idéation et validation',
      'Plan d\'affaires',
      'Pitch deck',
      'Modèles de financement',
      'Croissance et développement exponentiel'
    ],
    bestSeller: false,
    featured: false
  },
  {
    id: 7,
    title: 'Leadership et Management',
    description: 'Développez vos compétences de leader. Gestion d\'équipe, communication et prise de décision.',
    category: 3,
    categoryName: 'Business',
    level: 'Intermédiaire',
    duration: '28 ore',
    lessons: 52,
    instructor: 3,
    instructorName: 'Ion Diaconu',
    price: 149,
    free: false,
    rating: 4.65,
    ratingCount: 945,
    students: 4800,
    image: '👔',
    objectives: [
      'Style de leadership',
      'Gestion des conflits',
      'Motivation et délégation',
      'Communication efficace',
      'Développement d\'équipes'
    ],
    bestSeller: false,
    featured: false
  },
  {
    id: 8,
    title: 'Marketing Digital Complet',
    description: 'SEO, SEM, réseaux sociaux, email marketing. Stratégie complète de marketing en ligne.',
    category: 4,
    categoryName: 'Marketing',
    level: 'Débutant',
    duration: '38 ore',
    lessons: 72,
    instructor: 4,
    instructorName: 'Elena Marinescu',
    price: 179,
    free: false,
    rating: 4.72,
    ratingCount: 1567,
    students: 8900,
    image: '📱',
    objectives: [
      'SEO on-page et off-page',
      'Google Ads et SEM',
      'Marketing des réseaux sociaux',
      'Marketing par email',
      'Analytics et reporting'
    ],
    bestSeller: true,
    featured: true
  },
  {
    id: 9,
    title: 'Stratégie de Marketing de Contenu',
    description: 'Créez du contenu qui vend. Storytelling, blog, vidéo et stratégie de contenu.',
    category: 4,
    categoryName: 'Marketing',
    level: 'Intermédiaire',
    duration: '32 ore',
    lessons: 61,
    instructor: 4,
    instructorName: 'Elena Marinescu',
    price: 159,
    free: false,
    rating: 4.68,
    ratingCount: 876,
    students: 4200,
    image: '📝',
    objectives: [
      'Stratégie de contenu',
      'Storytelling et copywriting',
      'Rédaction de blog',
      'Marketing vidéo',
      'Mesure et optimisation'
    ],
    bestSeller: false,
    featured: false
  },
  {
    id: 10,
    title: 'Anglais des Affaires - Niveau Avancé',
    description: 'Perfectionnez votre anglais des affaires. Négociation, présentations et communication professionnelle.',
    category: 5,
    categoryName: 'Langues Étrangères',
    level: 'Avancé',
    duration: '42 ore',
    lessons: 78,
    instructor: 6,
    instructorName: 'Sophia Chen',
    price: 0,
    free: true,
    rating: 4.55,
    ratingCount: 3245,
    students: 12400,
    image: '🌍',
    objectives: [
      'Terminologie d\'affaires',
      'Présentations professionnelles',
      'Négociation en anglais',
      'Email d\'affaires',
      'Confiance et fluidité'
    ],
    bestSeller: false,
    featured: true
  },
  {
    id: 11,
    title: 'Machine Learning avec Python',
    description: 'Apprenez le machine learning depuis zéro. Scikit-learn, TensorFlow et projets pratiques.',
    category: 7,
    categoryName: 'Intelligence Artificielle',
    level: 'Intermédiaire',
    duration: '55 ore',
    lessons: 112,
    instructor: 5,
    instructorName: 'Andrei Țepeș',
    price: 299,
    free: false,
    rating: 4.88,
    ratingCount: 1432,
    students: 5200,
    image: '🤖',
    objectives: [
      'Fondamentaux du ML',
      'Apprentissage supervisé',
      'Apprentissage non supervisé',
      'Bases du Deep Learning',
      'Projets pratiques'
    ],
    bestSeller: false,
    featured: true
  },
  {
    id: 12,
    title: 'Deep Learning et Réseaux Neuronaux',
    description: 'Construisez des réseaux neuronaux avancés. CNN, RNN, Transformers et applications modernes.',
    category: 7,
    categoryName: 'Intelligence Artificielle',
    level: 'Avancé',
    duration: '60 ore',
    lessons: 128,
    instructor: 5,
    instructorName: 'Andrei Țepeș',
    price: 329,
    free: false,
    rating: 4.92,
    ratingCount: 678,
    students: 2100,
    image: '🧠',
    objectives: [
      'Architecture des réseaux neuronaux',
      'CNN pour la vision par ordinateur',
      'RNN et LSTM',
      'Transformers',
      'Apprentissage par transfert'
    ],
    bestSeller: false,
    featured: false
  },
  {
    id: 13,
    title: 'Espagnol : Conversations Quotidiennes',
    description: 'Apprenez des conversations pratiques en espagnol. Prononciation, vocabulaire et situations réelles.',
    category: 5,
    categoryName: 'Langues Étrangères',
    level: 'Débutant',
    duration: '36 ore',
    lessons: 68,
    instructor: 6,
    instructorName: 'Sophia Chen',
    price: 0,
    free: true,
    rating: 4.6,
    ratingCount: 2156,
    students: 7800,
    image: '🇪🇸',
    objectives: [
      'Prononciation et intonation',
      'Vocabulaire quotidien',
      'Conversations courantes',
      'Grammaire pratique',
      'Aspects culturels'
    ],
    bestSeller: false,
    featured: false
  },
  {
    id: 14,
    title: 'Français : De Zéro à la Conversation',
    description: 'Les plages de France, la culture et la langue. Cours complet pour débutants.',
    category: 5,
    categoryName: 'Langues Étrangères',
    level: 'Débutant',
    duration: '40 ore',
    lessons: 75,
    instructor: 6,
    instructorName: 'Sophia Chen',
    price: 0,
    free: true,
    rating: 4.58,
    ratingCount: 1987,
    students: 6200,
    image: '🇫🇷',
    objectives: [
      'Alphabet et prononciation',
      'Vocabulaire fondamental',
      'Grammaire de base',
      'Conversations quotidiennes',
      'Cultures francophones'
    ],
    bestSeller: false,
    featured: false
  },
  {
    id: 15,
    title: 'Mathématiques Avancées : Calcul et Algèbre Linéaire',
    description: 'Récapitulation et approfondissement. Calcul intégral, dérivées et algèbre linéaire.',
    category: 6,
    categoryName: 'Mathématiques',
    level: 'Avancé',
    duration: '48 ore',
    lessons: 96,
    instructor: 6,
    instructorName: 'Sophia Chen',
    price: 0,
    free: true,
    rating: 4.7,
    ratingCount: 1265,
    students: 3400,
    image: '📐',
    objectives: [
      'Calcul différentiel',
      'Calcul intégral',
      'Algèbre linéaire',
      'Applications pratiques',
      'Résolution de problèmes'
    ],
    bestSeller: false,
    featured: false
  }
];

// Statistici platformă
const platformStats = {
  totalCourses: courses.length,
  totalInstructors: instructors.length,
  totalCategories: categories.length,
  totalStudents: 156000,
  averageRating: 4.72,
  certificatesIssued: 45000
};

// Testimoniale
const testimonials = [
  {
    id: 1,
    name: 'Mihai Georgescu',
    role: 'Developer',
    content: 'Cursurile de JavaScript și React m-au ajutat să îmi găsesc locul de muncă. Recomand vehement!',
    rating: 5,
    avatar: '👨‍💻'
  },
  {
    id: 2,
    name: 'Laura Popescu',
    role: 'Designer UX',
    content: 'Cursul de UI/UX design a fost transformator. Am aplicat imediat ceea ce am învățat.',
    rating: 5,
    avatar: '👩‍🎨'
  },
  {
    id: 3,
    name: 'Cristian Ionescu',
    role: 'Antreprenor',
    content: 'Cursul de Antreprenoriat mi-a dat instrumentele necesare pentru a-mi lansa startup-ul.',
    rating: 5,
    avatar: '👔'
  },
  {
    id: 4,
    name: 'Andrada Vasile',
    role: 'Marketing Specialist',
    content: 'Marketing Digital Complet este cursul pe care l-am căutat. Foarte practic și actualizat.',
    rating: 4.5,
    avatar: '👩‍💼'
  },
  {
    id: 5,
    name: 'David Popovici',
    role: 'Student',
    content: 'Instructorii sunt profesioniști care transmit cu pasiune. Merită fiecare leu investit!',
    rating: 5,
    avatar: '🎓'
  }
];

// FAQ
const faqItems = [
  {
    id: 1,
    question: 'Que sont les cours gratuits ?',
    answer: 'Les cours gratuits sont des cours complets qui ne nécessitent pas de paiement. Ils sont disponibles pour tous les utilisateurs et offrent un contenu de haute qualité, idéal pour découvrir la plateforme ou apprendre des compétences spécifiques sans investissement financier.'
  },
  {
    id: 2,
    question: 'Puis-je me faire rembourser si je ne suis pas satisfait ?',
    answer: 'Oui ! Nous offrons une garantie de remboursement de 30 jours. Si vous n\'êtes pas satisfait du cours pour quelque raison que ce soit, vous pouvez demander un remboursement complet dans les 30 premiers jours après l\'achat.'
  },
  {
    id: 3,
    question: 'Combien de temps ai-je accès aux cours achetés ?',
    answer: 'Vous avez accès à vie aux cours que vous achetez. Vous pouvez revenir à tout moment pour réviser les matériaux, regarder les leçons que vous avez déjà terminées et accéder à toutes les ressources supplémentaires.'
  },
  {
    id: 4,
    question: 'Les cours incluent-ils des certificats ?',
    answer: 'Tous nos cours incluent des certificats de fin. Après avoir terminé le cours et réussi les tests finaux, vous recevrez un certificat téléchargeable que vous pouvez ajouter à votre CV.'
  },
  {
    id: 5,
    question: 'Ai-je besoin d\'un logiciel spécial pour les cours de programmation ?',
    answer: 'Non. Tous les cours de programmation sont faciles à suivre avec un ordinateur standard et un éditeur de texte gratuit. Les instructions détaillées pour la configuration se trouvent dans les premières leçons de chaque cours.'
  },
  {
    id: 6,
    question: 'Puis-je suivre les cours dans un ordre différent ?',
    answer: 'Oui ! Les cours sont indépendants, sauf pour certains cours avancés qui recommandent des connaissances de base. Vous pouvez choisir l\'ordre dans lequel vous voulez apprendre, mais nous vous conseillons de suivre les parcours recommandés.'
  },
  {
    id: 7,
    question: 'Comment fonctionne le support étudiant ?',
    answer: 'Le support est disponible 24/7 via des messages directs sur la plateforme. Les questions courantes sont répondues en 2-4 heures. De plus, chaque cours a une communauté d\'étudiants où vous pouvez demander de l\'aide.'
  },
  {
    id: 8,
    question: 'Quel matériel ai-je besoin ?',
    answer: 'Tout ordinateur moderne (Windows, Mac ou Linux) avec une connexion internet stable suffit. Les cours sont optimisés pour le bureau et sont visionnés sur ordinateurs portables ou ordinateurs.'
  }
];
