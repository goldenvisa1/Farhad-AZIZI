export type Language = 'fa' | 'en' | 'de';

export interface Translation {
  nav: {
    home: string;
    services: string;
    destinations: string;
    gallery: string;
    stories: string;
    process: string;
    contact: string;
    about: string;
    onlineAssessment: string;
  };
  hero: {
    badge: string;
    title: string;
    titleGold: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  metrics: {
    targetCountries: string;
    yearsExperience: string;
    customerSatisfaction: string;
    lawyers: string;
  };
  about: {
    badge: string;
    title: string;
    titleGold: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    commitment: string;
  };
  whyUs: {
    title: string;
    titleGold: string;
    subtitle: string;
    features: {
      title: string;
      desc: string;
    }[];
    ctaTitle: string;
    ctaDesc: string;
  };
  destinations: {
    badge: string;
    title: string;
    titleGrey: string;
    subtitle: string;
  };
  visaOptions: {
    badge: string;
    title: string;
    titleGold: string;
    subtitle: string;
  };
  servicesSection: {
    badge: string;
    title: string;
    titleGold: string;
    subtitle: string;
    keyBenefits: string;
    whyEuroNobel: string;
    processTime: string;
  };
  downloads: {
    badge: string;
    title: string;
    titleGold: string;
    formDescription: string;
    requirementsDescription: string;
    downloadLabel: string;
  };
  faq: {
    badge: string;
    title: string;
    titleGold: string;
    questions: {
      q: string;
      a: string;
    }[];
  };
  contact: {
    badge: string;
    title: string;
    titleGold: string;
    desc: string;
    phone: string;
    email: string;
    websites: string;
    form: {
      name: string;
      phone: string;
      email: string;
      message: string;
      placeholderName: string;
      placeholderPhone: string;
      placeholderEmail: string;
      placeholderMessage: string;
      submit: string;
      progress: string;
      progressSub: string;
      fieldCount: string;
    };
    success: {
      title: string;
      desc: string;
      descGold: string;
      descPart2: string;
      resubmit: string;
    };
  };
}

export const translations: Record<Language, Translation> = {
  fa: {
    nav: {
      home: "خانه",
      services: "خدمات",
      destinations: "مقاصد",
      gallery: "آلبوم",
      stories: "داستان‌ها",
      process: "فرآیند",
      contact: "تماس",
      about: "درباره ما",
      onlineAssessment: "ارزیابی آنلاین"
    },
    hero: {
      badge: "Exclusive European Residency",
      title: "اقامت اروپا...",
      titleGold: "یک تصمیم، نه یک رویا.",
      desc: "هر روز که منتظر می‌مانید، فرصت‌ها گران‌تر، محدودتر و دور از دسترس‌تر می‌شوند. آینده شما در اروپا از همین امروز شروع می‌شود.",
      ctaPrimary: "ارزیابی تخصصی رایگان",
      ctaSecondary: "مشاهده خدمات"
    },
    metrics: {
      targetCountries: "کشور هدف",
      yearsExperience: "سال تجربه",
      customerSatisfaction: "رضایت مشتری",
      lawyers: "وکیل مجرب"
    },
    about: {
      badge: "Our Vision",
      title: "به ",
      titleGold: "یورو نوبل",
      p1: "ما راهکارهای سطح بالای اقامت اروپا را برای افرادی که به دقت، امنیت و تصمیمات هوشمندانه اهمیت می‌دهند، فراهم می‌کنیم. رویکرد ما هرگز کلیشه‌ای نیست؛ هر پرونده به صورت اختصاصی ارزیابی شده و مسیر آن با شفافیت و تخصص طراحی می‌شود.",
      p2: "در یورو نوبل، شما صرفاً مشاوره دریافت نمی‌کنید، بلکه وارد یک فرآیند ساختاریافته می‌شوید که توسط مشاوران باتجربه‌ای هدایت می‌شود که اهمیت آینده شما را عمیقاً درک می‌کنند.",
      p3: "از اولین ارزیابی تا نتیجه نهایی، هر قدم با رازداری، شفافیت و تعهد به تعالی برداشته می‌شود. اگر آماده‌اید با اطمینان گام بردارید و تصمیمی درست برای آینده خود در اروپا بگیرید، شما در جای درستی هستید.",
      p4: "به استانداردی بالاتر در خدمات مهاجرتی خوش آمدید.",
      commitment: "تعهد ما، امنیت و آرامش خاطر شما در تمام مراحل مهاجرت است."
    },
    whyUs: {
      title: "چرا ",
      titleGold: "یورو نوبل",
      subtitle: "تفاوت در جزئیات است.",
      features: [
        { title: "ارزیابی تخصصی و حرفه‌ای", desc: "تجزیه و تحلیل دقیق شرایط شما برای یافتن سریع‌ترین و هوشمندانه‌ترین مسیر." },
        { title: "استراتژی شفاف و دقیق", desc: "طراحی نقشه راهی که تمام جزئیات قانونی و اجرایی را پوشش می‌دهد." },
        { title: "راهکارهای واقعی و عملی", desc: "ما فقط وعده نمی‌دهیم؛ ما پرونده‌های موفق و نتایج ملموس را به شما تقدیم می‌کنیم." }
      ],
      ctaTitle: "تعهد ما",
      ctaDesc: "همراهی تا زمان دریافت کارت اقامت"
    },
    destinations: {
      badge: "Destination Spotlight",
      title: "انتخاب با شما، ",
      titleGrey: "تسهیل مسیر با ما.",
      subtitle: "برترین کشورهای اروپایی برای زندگی، کار و سرمایه‌گذاری براساس استانداردهای ۲۰۲۴."
    },
    visaOptions: {
      badge: "Visa Categories",
      title: "گزینه‌های اصلی ",
      titleGold: "ویزای اروپا",
      subtitle: "یورو نوبل متخصص در طیف گسترده‌ای از مسیرهای مهاجرتی است. در اینجا به برخی از محبوب‌ترین گزینه‌ها اشاره می‌کنیم. برای بررسی دقیق‌تر شرایط خود، به بخش خدمات مراجعه کنید."
    },
    servicesSection: {
      badge: "Our Professional Solutions",
      title: "خدمات تخصصی ",
      titleGold: "یورو نوبل",
      subtitle: "ما طیف کاملی از راهکارهای مهاجرتی را برای پاسخگویی به نیازهای متنوع مراجعین خود فراهم کرده‌ایم. هر مسیر با دقت و بر اساس آخرین قوانین اتحادیه اروپا طراحی شده است.",
      keyBenefits: "مزایای کلیدی / Key Benefits",
      whyEuroNobel: "چرا با یورو نوبل؟",
      processTime: "Process Time"
    },
    downloads: {
      badge: "Essential Resources",
      title: "فرم‌ها و ",
      titleGold: "مدارک مورد نیاز",
      formDescription: "دانلود فرم خام درخواست ویزای شینگن (PDF)",
      requirementsDescription: "لیست دقیق مدارک مورد نیاز برای اخذ ویزای شینگن (PDF)",
      downloadLabel: "دانلود فایل"
    },
    faq: {
      badge: "سوالات متداول",
      title: "پرسش‌های ",
      titleGold: "پرتکرار",
      questions: [
        { q: "حداقل سرمایه لازم برای اقامت اروپا چقدر است؟", a: "بسته به نوع ویزا و کشور مقصد متفاوت است. برای بررسی دقیق، نیاز به ارزیابی شرایط شما داریم." },
        { q: "مدت زمان دریافت اقامت چقدر است؟", a: "بسته به کشور و نوع پرونده، معمولاً بین ۶ تا ۱۸ ماه متغیر است." },
        { q: "آیا می‌توانم با ویزای شینگن در همه کشورهای اروپا کار کنم؟", a: "خیر، ویزای شینگن معمولاً برای گردشگری یا کسب‌وکار کوتاه‌مدت است و اجازه کار در کشورهای حوزه شینگن را نمی‌دهد." },
        { q: "آیا خانواده من هم اقامت دریافت می‌کنند؟", a: "بله، در اکثر روش‌های اقامتی، امکان همراهی همسر و فرزندان زیر سن قانونی وجود دارد." },
        { q: "تفاوت اقامت دائم و موقت چیست؟", a: "اقامت موقت نیاز به تمدید سالانه دارد، اما اقامت دائم بعد از چند سال زندگی و فعالیت در کشور مقصد قابل دریافت است." }
      ]
    },
    contact: {
      badge: "Get In Touch",
      title: "مشاوره تخصصی ",
      titleGold: "همین حالا آغاز کنید.",
      desc: "تیم کارشناسان ما آماده پاسخگویی به سوالات شماست. فرم را پر کنید تا در کوتاه‌ترین زمان ممکن با شما تماس بگیریم.",
      phone: "تلفن مستقیم",
      email: "ایمیل پشتیبانی",
      websites: "وب‌سایت‌ها",
      form: {
        name: "نام و نام خانوادگی",
        phone: "شماره تماس",
        email: "ایمیل (اختیاری)",
        message: "پیام شما",
        placeholderName: "امیر رضایی",
        placeholderPhone: "0912 345 6789",
        placeholderEmail: "example@gmail.com",
        placeholderMessage: "توضیحات مختصری راجع به درخواست خود بنویسید...",
        submit: "ارسال درخواست مشاوره",
        progress: "وضعیت تکمیل فرم",
        progressSub: "Form Completion Progress",
        fieldCount: "از ۴ فیلد"
      },
      success: {
        title: "درخواست شما با موفقیت ثبت شد",
        desc: "پیام شما توسط تیم ",
        descGold: "یورو نوبل",
        descPart2: " دریافت شد. کارشناسان ما تا حداکثر ۲۴ ساعت آینده جهت مشاوره اولیه با شما تماس خواهند گرفت.",
        resubmit: "ارسال پیام دیگر"
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      destinations: "Destinations",
      gallery: "Gallery",
      stories: "Stories",
      process: "Process",
      contact: "Contact",
      about: "About Us",
      onlineAssessment: "Online Assessment"
    },
    hero: {
      badge: "Exclusive European Residency",
      title: "Residency in Europe...",
      titleGold: "A decision, not a dream.",
      desc: "Every day you wait, opportunities become more expensive, limited, and out of reach. Your future in Europe starts today.",
      ctaPrimary: "Free Specialized Assessment",
      ctaSecondary: "View Services"
    },
    metrics: {
      targetCountries: "Target Countries",
      yearsExperience: "Years Experience",
      customerSatisfaction: "Customer Satisfaction",
      lawyers: "Expert Lawyers"
    },
    about: {
      badge: "Our Vision",
      title: "Welcome to ",
      titleGold: "Euro Nobel",
      p1: "We provide high-level European residency solutions for individuals who value precision, security, and smart decisions. Our approach is never cliché; every case is individually evaluated and its path is designed with transparency and expertise.",
      p2: "At Euro Nobel, you don't just receive advice; you enter a structured process led by experienced consultants who deeply understand the importance of your future.",
      p3: "From the first evaluation to the final result, every step is taken with confidentiality, transparency, and a commitment to excellence. If you are ready to take a step with confidence and make the right decision for your future in Europe, you are in the right place.",
      p4: "Welcome to a higher standard in immigration services.",
      commitment: "Our commitment is your security and peace of mind throughout all stages of immigration."
    },
    whyUs: {
      title: "Why ",
      titleGold: "Euro Nobel?",
      subtitle: "The difference is in the details.",
      features: [
        { title: "Specialized & Professional Assessment", desc: "Detailed analysis of your situation to find the fastest and smartest path." },
        { title: "Transparent & Detailed Strategy", desc: "Designing a roadmap that covers all legal and operational details." },
        { title: "Real & Practical Solutions", desc: "We don't just promise; we present you with successful cases and tangible results." }
      ],
      ctaTitle: "Our Commitment",
      ctaDesc: "Accompanying you until receipt of your residency card"
    },
    destinations: {
      badge: "Destination Spotlight",
      title: "The choice is yours, ",
      titleGrey: "the path is facilitated by us.",
      subtitle: "Top European countries for living, working, and investing based on 2024 standards."
    },
    visaOptions: {
      badge: "Visa Categories",
      title: "Main Options for ",
      titleGold: "European Visa",
      subtitle: "Euro Nobel specializes in a wide range of immigration paths. Here we mention some of the most popular options. For a more detailed review of your situation, see the services section."
    },
    servicesSection: {
      badge: "Our Professional Solutions",
      title: "Specialized Services of ",
      titleGold: "Euro Nobel",
      subtitle: "We have provided a full spectrum of immigration solutions to meet the diverse needs of our clients. Every path is meticulously designed based on the latest EU laws.",
      keyBenefits: "Key Benefits",
      whyEuroNobel: "Why with Euro Nobel?",
      processTime: "Process Time"
    },
    downloads: {
      badge: "Essential Resources",
      title: "Forms and ",
      titleGold: "Required Documents",
      formDescription: "Download Schengen Visa Application Form (PDF)",
      requirementsDescription: "Detailed checklist of required documents for Schengen visa (PDF)",
      downloadLabel: "Download File"
    },
    faq: {
      badge: "Frequently Asked Questions",
      title: "Common ",
      titleGold: "Questions",
      questions: [
        { q: "What is the minimum capital required for European residency?", a: "It varies depending on the visa type and destination country. We need to evaluate your situation for a precise figure." },
        { q: "How long does it take for residency?", a: "Depending on the country and case type, it typically takes between 6 to 18 months." },
        { q: "Can I work in all European countries with a Schengen visa?", a: "No, a Schengen visa is typically for tourism or short-term business and does not grant work permits in Schengen countries." },
        { q: "Can my family receive residency too?", a: "Yes, in most residency programs, spouses and minor children can accompany the main applicant." },
        { q: "What is the difference between permanent and temporary residency?", a: "Temporary residency requires annual renewal, while permanent residency can be obtained after several years of living and activity in the destination country." }
      ]
    },
    contact: {
      badge: "Get In Touch",
      title: "Expert Consultation ",
      titleGold: "Start Right Now.",
      desc: "Our expert team is ready to answer your questions. Fill out the form so we can contact you as soon as possible.",
      phone: "Direct Phone",
      email: "Support Email",
      websites: "Websites",
      form: {
        name: "Full Name",
        phone: "Phone Number",
        email: "Email (Optional)",
        message: "Your Message",
        placeholderName: "Amir Rezaei",
        placeholderPhone: "0912 345 6789",
        placeholderEmail: "example@gmail.com",
        placeholderMessage: "Write a brief description of your request...",
        submit: "Send Consultation Request",
        progress: "Form Status",
        progressSub: "Form Completion Progress",
        fieldCount: "of 4 fields"
      },
      success: {
        title: "Your request was successfully registered",
        desc: "Your message was received by the ",
        descGold: "Euro Nobel",
        descPart2: " team. Our experts will contact you for an initial consultation within the next 24 hours.",
        resubmit: "Send Another Message"
      }
    }
  },
  de: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      destinations: "Ziele",
      gallery: "Galerie",
      stories: "Erfolge",
      process: "Prozess",
      contact: "Kontakt",
      about: "Über uns",
      onlineAssessment: "Online-Bewertung"
    },
    hero: {
      badge: "Exklusive europäische Residenz",
      title: "Residenz in Europa...",
      titleGold: "Eine Entscheidung, kein Traum.",
      desc: "Jeden Tag, den Sie warten, werden Chancen teurer, begrenzter und unerreichbarer. Ihre Zukunft in Europa beginnt heute.",
      ctaPrimary: "Kostenlose Fachbewertung",
      ctaSecondary: "Dienstleistungen ansehen"
    },
    metrics: {
      targetCountries: "Zielländer",
      yearsExperience: "Jahre Erfahrung",
      customerSatisfaction: "Kundenzufriedenheit",
      lawyers: "Fachanwälte"
    },
    about: {
      badge: "Unsere Vision",
      title: "Willkommen bei ",
      titleGold: "Euro Nobel",
      p1: "Wir bieten hochwertige europäische Residenzlösungen für Personen, die Wert auf Präzision, Sicherheit und kluge Entscheidungen legen. Unser Ansatz ist niemals klischeehaft; jeder Fall wird individuell bewertet und sein Weg mit Transparenz und Fachwissen gestaltet.",
      p2: "Bei Euro Nobel erhalten Sie nicht nur Beratung; Sie treten in einen strukturierten Prozess ein, der von erfahrenen Beratern geleitet wird, die die Bedeutung Ihrer Zukunft zutiefst verstehen.",
      p3: "Von der ersten Bewertung bis zum Endergebnis wird jeder Schritt mit Vertraulichkeit, Transparenz und der Verpflichtung zu Spitzenleistungen unternommen. Wenn Sie bereit sind, einen Schritt mit Zuversicht zu gehen und die richtige Entscheidung für Ihre Zukunft in Europa zu treffen, sind Sie hier richtig.",
      p4: "Willkommen zu einem höheren Standard bei Einwanderungsdiensten.",
      commitment: "Unser Engagement ist Ihre Sicherheit und Ihr Seelenfrieden in allen Phasen der Einwanderung."
    },
    whyUs: {
      title: "Warum ",
      titleGold: "Euro Nobel?",
      subtitle: "Der Unterschied liegt im Detail.",
      features: [
        { title: "Spezialisierte & professionelle Bewertung", desc: "Detaillierte Analyse Ihrer Situation, um den schnellsten und klügsten Weg zu finden." },
        { title: "Transparente & detaillierte Strategie", desc: "Entwurf eines Fahrplans, der alle rechtlichen und operativen Details abdeckt." },
        { title: "Reale & praktische Lösungen", desc: "Wir versprechen nicht nur; wir präsentieren Ihnen erfolgreiche Fälle und greifbare Ergebnisse." }
      ],
      ctaTitle: "Unser Engagement",
      ctaDesc: "Begleitung bis zum Erhalt Ihrer Aufenthaltskarte"
    },
    destinations: {
      badge: "Ziel-Spotlight",
      title: "Sie haben die Wahl, ",
      titleGrey: "wir erleichtern den Weg.",
      subtitle: "Top europäische Länder zum Leben, Arbeiten und Investieren nach 2024 Standards."
    },
    visaOptions: {
      badge: "Visa-Kategorien",
      title: "Hauptoptionen für das ",
      titleGold: "Europäische Visum",
      subtitle: "Euro Nobel ist auf eine Vielzahl von Einwanderungswegen spezialisiert. Hier erwähnen wir einige der beliebtesten Optionen. Für eine detailliertere Überprüfung Ihrer Situation siehe den Abschnitt Dienstleistungen."
    },
    servicesSection: {
      badge: "Unsere professionellen Lösungen",
      title: "Spezialisierte Dienstleistungen von ",
      titleGold: "Euro Nobel",
      subtitle: "Wir haben ein volles Spektrum an Einwanderungslösungen bereitgestellt, um den vielfältigen Bedürfnissen unserer Kunden gerecht zu werden. Jeder Weg ist akribisch nach den neuesten EU-Gesetzen gestaltet.",
      keyBenefits: "Hauptvorteile",
      whyEuroNobel: "Warum mit Euro Nobel?",
      processTime: "Bearbeitungszeit"
    },
    downloads: {
      badge: "Wichtige Ressourcen",
      title: "Formulare und ",
      titleGold: "Erforderliche Dokumente",
      formDescription: "Schengen-Visumantragsformular herunterladen (PDF)",
      requirementsDescription: "Detaillierte Checkliste für erforderliche Schengen-Visumdokumente (PDF)",
      downloadLabel: "Datei herunterladen"
    },
    faq: {
      badge: "Häufig gestellte Fragen",
      title: "Häufige ",
      titleGold: "Fragen",
      questions: [
        { q: "Wie hoch ist das Mindestkapital für einen europäischen Aufenthalt?", a: "Dies variiert je nach Visumtyp und Zielland. Wir müssen Ihre Situation für eine genaue Zahl bewerten." },
        { q: "Wie lange dauert es, bis die Aufenthaltserlaubnis erteilt wird?", a: "Je nach Land und Falltyp dauert es in der Regel zwischen 6 und 18 Monaten." },
        { q: "Kann ich mit einem Schengen-Visum in allen europäischen Ländern arbeiten?", a: "Nein, ein Schengen-Visum dient in der Regel dem Tourismus oder kurzfristigen Geschäftsreisen und berechtigt nicht zur Arbeit in Schengen-Ländern." },
        { q: "Kann meine Familie auch eine Aufenthaltserlaubnis erhalten?", a: "Ja, bei den meisten Aufenthaltsprogrammen können Ehepartner und minderjährige Kinder den Hauptantragsteller begleiten." },
        { q: "Was ist der Unterschied zwischen dauerhaftem und vorübergehendem Aufenthalt?", a: "Ein vorübergehender Aufenthalt erfordert eine jährliche Verlängerung, während ein dauerhafter Aufenthalt nach mehreren Jahren des Lebens und der Tätigkeit im Zielland erlangt werden kann." }
      ]
    },
    contact: {
      badge: "Kontaktieren Sie uns",
      title: "Expertenberatung ",
      titleGold: "jetzt starten.",
      desc: "Unser Expertenteam steht bereit, um Ihre Fragen zu beantworten. Füllen Sie das Formular aus, damit wir Sie schnellstmöglich kontaktieren können.",
      phone: "Direkttelefon",
      email: "Support-E-Mail",
      websites: "Webseiten",
      form: {
        name: "Vollständiger Name",
        phone: "Telefonnummer",
        email: "E-Mail (Optional)",
        message: "Ihre Nachricht",
        placeholderName: "Amir Rezaei",
        placeholderPhone: "0912 345 6789",
        placeholderEmail: "beispiel@gmail.com",
        placeholderMessage: "Schreiben Sie eine Kurzbeschreibung Ihrer Anfrage...",
        submit: "Beratungsanfrage senden",
        progress: "Formularstatus",
        progressSub: "Fortschritt der Formularausfüllung",
        fieldCount: "von 4 Feldern"
      },
      success: {
        title: "Ihre Anfrage wurde erfolgreich registriert",
        desc: "Ihre Nachricht wurde vom Team ",
        descGold: "Euro Nobel",
        descPart2: " erhalten. Unsere Experten werden Sie innerhalb der nächsten 24 Stunden für ein Erstgespräch kontaktieren.",
        resubmit: "Weitere Nachricht senden"
      }
    }
  }
};
