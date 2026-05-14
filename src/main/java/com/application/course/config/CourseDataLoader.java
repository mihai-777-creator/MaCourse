package com.application.course.config;

import com.application.course.entity.Category;
import com.application.course.entity.Course;
import com.application.course.entity.Instructor;
import com.application.course.repository.CategoryRepository;
import com.application.course.repository.CourseRepository;
import com.application.course.repository.InstructorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CourseDataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final InstructorRepository instructorRepository;
    private final CourseRepository courseRepository;

    public CourseDataLoader(CategoryRepository categoryRepository,
                            InstructorRepository instructorRepository,
                            CourseRepository courseRepository) {
        this.categoryRepository = categoryRepository;
        this.instructorRepository = instructorRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) {
            return;
        }
        seedCategories();
        seedInstructors();
        seedCourses();
    }

    private void seedCategories() {
        List<Category> cats = List.of(
            Category.builder().name("Programmation").icon("💻").color("#3b82f6").build(),
            Category.builder().name("Design").icon("🎨").color("#ec4899").build(),
            Category.builder().name("Business").icon("💼").color("#f59e0b").build(),
            Category.builder().name("Marketing").icon("📊").color("#10b981").build(),
            Category.builder().name("Langues Étrangères").icon("🌍").color("#8b5cf6").build(),
            Category.builder().name("Mathématiques").icon("📐").color("#06b6d4").build(),
            Category.builder().name("Intelligence Artificielle").icon("🤖").color("#ef4444").build(),
            Category.builder().name("Développement Personnel").icon("🚀").color("#14b8a6").build()
        );
        categoryRepository.saveAll(cats);
    }

    private void seedInstructors() {
        List<Instructor> instructors = List.of(
            Instructor.builder()
                .name("Alex Popescu").title("Expert en Programmation Web")
                .bio("Avec 10 ans d'expérience en développement web, Alex a travaillé avec des entreprises Fortune 500 et a formé des milliers d'étudiants.")
                .avatar("👨‍💼").studentCount(15000)
                .specialties(List.of("JavaScript", "React", "Node.js"))
                .build(),
            Instructor.builder()
                .name("Maria Ionescu").title("UI/UX Designer")
                .bio("Designer passionnée par l'expérience utilisateur. Maria a remporté plusieurs prix internationaux pour ses designs.")
                .avatar("👩‍🦰").studentCount(8500)
                .specialties(List.of("Figma", "UI Design", "Prototypage"))
                .build(),
            Instructor.builder()
                .name("Ion Diaconu").title("Consultant d'Affaires")
                .bio("Entrepreneur et consultant stratégique avec une expérience dans diverses industries et marchés internationaux.")
                .avatar("👨‍💼").studentCount(12000)
                .specialties(List.of("Stratégie", "Négociation", "Management"))
                .build(),
            Instructor.builder()
                .name("Elena Marinescu").title("Spécialiste Marketing Digital")
                .bio("Experte en stratégie de marketing digital avec des résultats mesurables et un ROI élevé.")
                .avatar("👩‍💼").studentCount(10500)
                .specialties(List.of("SEO", "Social Media", "PPC"))
                .build(),
            Instructor.builder()
                .name("Andrei Țepeș").title("Ingénieur AI/ML")
                .bio("Chercheur et ingénieur en machine learning avec des publications internationales et une expérience chez Google.")
                .avatar("👨‍💻").studentCount(6800)
                .specialties(List.of("Python", "Machine Learning", "Deep Learning"))
                .build(),
            Instructor.builder()
                .name("Sophia Chen").title("Professeur de Langues Étrangères")
                .bio("Polyglotte avec une maîtrise de 5 langues. Méthodes d'enseignement innovantes et interactives.")
                .avatar("👩‍🏫").studentCount(18000)
                .specialties(List.of("Anglais", "Français", "Espagnol"))
                .build()
        );
        instructorRepository.saveAll(instructors);
    }

    private void seedCourses() {
        List<Category> cats = categoryRepository.findAll();
        List<Instructor> insts = instructorRepository.findAll();

        Category prog  = cats.get(0);
        Category design = cats.get(1);
        Category biz    = cats.get(2);
        Category mkt    = cats.get(3);
        Category lang   = cats.get(4);
        Category math   = cats.get(5);
        Category ai     = cats.get(6);

        Instructor alex   = insts.get(0);
        Instructor maria  = insts.get(1);
        Instructor ion    = insts.get(2);
        Instructor elena  = insts.get(3);
        Instructor andrei = insts.get(4);
        Instructor sophia = insts.get(5);

        List<Course> courses = List.of(
            Course.builder()
                .title("JavaScript Complet : De Zéro au Héros")
                .description("Apprenez JavaScript moderne avec des projets pratiques. Nous couvrons ES6+, async/await, et des concepts avancés.")
                .category(prog).instructor(alex).level("Débutant")
                .duration("40 heures").lessons(85).price(199.0).free(false)
                .rating(4.9).ratingCount(2847).students(14200).image("📖")
                .bestSeller(true).featured(true)
                .objectives(List.of("Connaissances fondamentales de JavaScript", "Programmation asynchrone", "Manipulation du DOM", "ES6 et versions plus récentes", "Débogage et meilleures pratiques"))
                .build(),
            Course.builder()
                .title("React Moderne : Construisez des Applications Web")
                .description("Maîtrisez React avec Hooks, Context API et Redux. Construisez des applications réelles et scalables.")
                .category(prog).instructor(alex).level("Intermédiaire")
                .duration("45 heures").lessons(92).price(249.0).free(false)
                .rating(4.85).ratingCount(2156).students(10800).image("⚛️")
                .bestSeller(true).featured(true)
                .objectives(List.of("Composants React et JSX", "Hooks et gestion d'état", "Context API et Redux", "Routage et code splitting", "Optimisation des performances"))
                .build(),
            Course.builder()
                .title("Node.js : Maîtrise du Développement Backend")
                .description("Développez des serveurs scalables avec Node.js, Express et bases de données. Projets complets et professionnels.")
                .category(prog).instructor(alex).level("Intermédiaire")
                .duration("50 heures").lessons(105).price(279.0).free(false)
                .rating(4.8).ratingCount(1842).students(9500).image("🛠️")
                .bestSeller(false).featured(true)
                .objectives(List.of("Fondamentaux de Node.js", "Framework Express.js", "Bases de données et ORM", "Authentification et sécurité", "Déploiement et bases DevOps"))
                .build(),
            Course.builder()
                .title("Principes Fondamentaux du Design UI/UX")
                .description("Principes du design moderne, recherche utilisateur, wireframing et prototypage avec Figma.")
                .category(design).instructor(maria).level("Débutant")
                .duration("35 heures").lessons(64).price(189.0).free(false)
                .rating(4.75).ratingCount(1523).students(7200).image("🎨")
                .bestSeller(false).featured(false)
                .objectives(List.of("Principes du design", "Recherche utilisateur", "Wireframing et maquettes", "Prototypage dans Figma", "Design responsive"))
                .build(),
            Course.builder()
                .title("Figma : Masterclass de Design")
                .description("Devenez expert en Figma. Créez des systèmes de design, des composants et collaborez efficacement.")
                .category(design).instructor(maria).level("Intermédiaire")
                .duration("30 heures").lessons(58).price(169.0).free(false)
                .rating(4.7).ratingCount(1215).students(6800).image("🖌️")
                .bestSeller(false).featured(false)
                .objectives(List.of("Interface Figma avancée", "Systèmes de design", "Composants et variantes", "Collaboration en temps réel", "Export et intégrations"))
                .build(),
            Course.builder()
                .title("Entrepreneuriat et Innovation")
                .description("Comment lancer une startup. Stratégie d'affaires, financement et croissance.")
                .category(biz).instructor(ion).level("Intermédiaire")
                .duration("25 heures").lessons(48).price(159.0).free(false)
                .rating(4.6).ratingCount(1089).students(5400).image("🚀")
                .bestSeller(false).featured(false)
                .objectives(List.of("Idéation et validation", "Plan d'affaires", "Pitch deck", "Modèles de financement", "Croissance et développement exponentiel"))
                .build(),
            Course.builder()
                .title("Leadership et Management")
                .description("Développez vos compétences de leader. Gestion d'équipe, communication et prise de décision.")
                .category(biz).instructor(ion).level("Intermédiaire")
                .duration("28 heures").lessons(52).price(149.0).free(false)
                .rating(4.65).ratingCount(945).students(4800).image("👔")
                .bestSeller(false).featured(false)
                .objectives(List.of("Style de leadership", "Gestion des conflits", "Motivation et délégation", "Communication efficace", "Développement d'équipes"))
                .build(),
            Course.builder()
                .title("Marketing Digital Complet")
                .description("SEO, SEM, réseaux sociaux, email marketing. Stratégie complète de marketing en ligne.")
                .category(mkt).instructor(elena).level("Débutant")
                .duration("38 heures").lessons(72).price(179.0).free(false)
                .rating(4.72).ratingCount(1567).students(8900).image("📱")
                .bestSeller(true).featured(true)
                .objectives(List.of("SEO on-page et off-page", "Google Ads et SEM", "Marketing des réseaux sociaux", "Marketing par email", "Analytics et reporting"))
                .build(),
            Course.builder()
                .title("Stratégie de Marketing de Contenu")
                .description("Créez du contenu qui vend. Storytelling, blog, vidéo et stratégie de contenu.")
                .category(mkt).instructor(elena).level("Intermédiaire")
                .duration("32 heures").lessons(61).price(159.0).free(false)
                .rating(4.68).ratingCount(876).students(4200).image("📝")
                .bestSeller(false).featured(false)
                .objectives(List.of("Stratégie de contenu", "Storytelling et copywriting", "Rédaction de blog", "Marketing vidéo", "Mesure et optimisation"))
                .build(),
            Course.builder()
                .title("Anglais des Affaires - Niveau Avancé")
                .description("Perfectionnez votre anglais des affaires. Négociation, présentations et communication professionnelle.")
                .category(lang).instructor(sophia).level("Avancé")
                .duration("42 heures").lessons(78).price(0.0).free(true)
                .rating(4.55).ratingCount(3245).students(12400).image("🌍")
                .bestSeller(false).featured(true)
                .objectives(List.of("Terminologie d'affaires", "Présentations professionnelles", "Négociation en anglais", "Email d'affaires", "Confiance et fluidité"))
                .build(),
            Course.builder()
                .title("Machine Learning avec Python")
                .description("Apprenez le machine learning depuis zéro. Scikit-learn, TensorFlow et projets pratiques.")
                .category(ai).instructor(andrei).level("Intermédiaire")
                .duration("55 heures").lessons(112).price(299.0).free(false)
                .rating(4.88).ratingCount(1432).students(5200).image("🤖")
                .bestSeller(false).featured(true)
                .objectives(List.of("Fondamentaux du ML", "Apprentissage supervisé", "Apprentissage non supervisé", "Bases du Deep Learning", "Projets pratiques"))
                .build(),
            Course.builder()
                .title("Deep Learning et Réseaux Neuronaux")
                .description("Construisez des réseaux neuronaux avancés. CNN, RNN, Transformers et applications modernes.")
                .category(ai).instructor(andrei).level("Avancé")
                .duration("60 heures").lessons(128).price(329.0).free(false)
                .rating(4.92).ratingCount(678).students(2100).image("🧠")
                .bestSeller(false).featured(false)
                .objectives(List.of("Architecture des réseaux neuronaux", "CNN pour la vision par ordinateur", "RNN et LSTM", "Transformers", "Apprentissage par transfert"))
                .build(),
            Course.builder()
                .title("Espagnol : Conversations Quotidiennes")
                .description("Apprenez des conversations pratiques en espagnol. Prononciation, vocabulaire et situations réelles.")
                .category(lang).instructor(sophia).level("Débutant")
                .duration("36 heures").lessons(68).price(0.0).free(true)
                .rating(4.6).ratingCount(2156).students(7800).image("🇪🇸")
                .bestSeller(false).featured(false)
                .objectives(List.of("Prononciation et intonation", "Vocabulaire quotidien", "Conversations courantes", "Grammaire pratique", "Aspects culturels"))
                .build(),
            Course.builder()
                .title("Français : De Zéro à la Conversation")
                .description("Les bases de France, la culture et la langue. Cours complet pour débutants.")
                .category(lang).instructor(sophia).level("Débutant")
                .duration("40 heures").lessons(75).price(0.0).free(true)
                .rating(4.58).ratingCount(1987).students(6200).image("🇫🇷")
                .bestSeller(false).featured(false)
                .objectives(List.of("Alphabet et prononciation", "Vocabulaire fondamental", "Grammaire de base", "Conversations quotidiennes", "Cultures francophones"))
                .build(),
            Course.builder()
                .title("Mathématiques Avancées : Calcul et Algèbre Linéaire")
                .description("Récapitulation et approfondissement. Calcul intégral, dérivées et algèbre linéaire.")
                .category(math).instructor(sophia).level("Avancé")
                .duration("48 heures").lessons(96).price(0.0).free(true)
                .rating(4.7).ratingCount(1265).students(3400).image("📐")
                .bestSeller(false).featured(false)
                .objectives(List.of("Calcul différentiel", "Calcul intégral", "Algèbre linéaire", "Applications pratiques", "Résolution de problèmes"))
                .build()
        );
        courseRepository.saveAll(courses);
    }
}
