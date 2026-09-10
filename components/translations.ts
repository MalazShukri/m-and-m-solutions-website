// English and Arabic translations for the entire website

export const translations = {
  en: {
    // Navbar
    nav: {
      home: "Home",
      about: "About",
      web: "Websites",
      erp: "ERP",
      projects: "Projects",
      contact: "Contact",
      getStarted: "Get Started",
    },

    // Hero Section
    hero: {
      title: "Tired of missed messages and lost orders?",
      titleHighlight: "Get a real website.",
      description:
        "Websites and apps with customer service and ordering built in — no more juggling Instagram DMs. Plus ERP systems that run your whole business from one place.",
      viewProjects: "See Our Work",
      getInTouch: "Talk on WhatsApp",
      // The scattered mess that converges into the device on scroll — these are
      // the exact questions the Web section says businesses field over and over.
      fragments: ["Where are you located?", "Do you have size L?", "Order — no address", "How much?", "Are you open now?"],
      liveLabel: "Live in your inbox",
      pillars: {
        // "automation" pillar intentionally excluded from the hero grid for now —
        // Meta's developer platform (WhatsApp/Instagram API) isn't available in Syria,
        // so this isn't currently a deliverable service. Kept here so it can come
        // straight back once that changes; ai-section.tsx is commented out for the same reason.
        automation: {
          title: "AI Customer Service",
          description: "24/7 AI replies on WhatsApp & Instagram — never miss an order again.",
        },
        web: {
          title: "Websites & Apps",
          description: "A real site with built-in customer service and ordering — no more DMs.",
        },
        erp: {
          title: "ERP Systems",
          description: "Finance, inventory, HR, and sales — all in one place.",
        },
      },
    },

    // Live chat automation console — not currently used (see hero.pillars comment above)
    chatConsole: {
      heading: "Command Center",
      subheading: "One AI, every channel, answered instantly",
      typing: "typing…",
      resolvedBy: "Resolved by AI",
      answeredIn: "Answered in",
      threads: [
        {
          channel: "WhatsApp",
          customer: "Is my order ready for pickup?",
          reply: "Yes! Order #482 is ready — pick it up anytime after 5 PM today. 🙌",
          time: "1.2s",
        },
        {
          channel: "Instagram",
          customer: "Do you have this in size L?",
          reply: "We do! I've reserved one for you — send your address and we'll ship today.",
          time: "0.9s",
        },
        {
          channel: "Website",
          customer: "What's your return policy?",
          reply: "Easy 14-day returns, no questions asked. Want me to start one for you?",
          time: "1.6s",
        },
      ],
    },

    // About Section
    about: {
      title: "About M & M Solutions",
      subtitle: "No tech background needed — just tell us what your business needs.",
      description1:
        "We build custom websites, mobile apps, and ERP systems for businesses of every size — from a single shop to multi-department companies. You focus on your business; we handle the technology.",
    },

    // Sector ticker — mirrors the sectors already named in the ERP section.
    marquee: {
      items: [
        "Retail & Supermarkets",
        "Manufacturing",
        "Schools & Institutes",
        "Clinics",
        "Logistics & Distribution",
        "Restaurants",
        "E-commerce",
        "Service Businesses",
      ],
    },

    // "Which service do you need?" comparison section
    compare: {
      title: "Which One Do You Need?",
      subtitle: "Not sure where to start? Here's the short version.",
      options: [
        {
          title: "Website",
          description: "Customers find you, see your work, and order directly — no more losing sales in DMs.",
        },
        {
          title: "Mobile App",
          description: "For when your business outgrows the browser and customers want it on their home screen.",
        },
        {
          title: "ERP System",
          description: "For managing inventory, staff, or accounts across more than one department.",
        },
      ],
    },

    // AI Automations & AI Agents Section — commented out of app/page.tsx.
    // Meta's developer platform (WhatsApp/Instagram Business API) doesn't work in
    // Syria yet, so this isn't a service we can actually deliver right now.
    // Uncomment <AISection /> in app/page.tsx once it does.
    ai: {
      title: "AI Automations & AI Agents",
      subtitle:
        "Automate your repetitive and time-consuming tasks using AI so your team can focus on what matters most.",
      automations: {
        title: "AI Automations",
        description:
          "Streamline your business operations by automating routine tasks that consume valuable time and resources.",
        features: [
          "Automate workflows and business processes",
          "Generate reports and analytics automatically",
          "Streamline data entry and processing",
          "Schedule and manage recurring tasks",
          "Reduce human error in repetitive operations",
        ],
      },
      agents: {
        title: "AI Agents",
        description:
          "Your 24/7 digital employee that never gets tired — handling customer interactions and tasks around the clock.",
        features: [
          "Book appointments and manage schedules",
          "Answer customer inquiries instantly",
          "Reply to customers on Instagram and WhatsApp",
          "Provide instant support around the clock",
          "Handle multiple conversations simultaneously",
        ],
      },
      highlights: {
        available: "24/7 Available",
        instant: "Instant Responses",
        social: "Social Media Ready",
        booking: "Smart Booking",
      },
      cta: "Get Your AI Solution",
    },

    // Websites & Mobile Apps Section
    web: {
      title: "Websites & Mobile Apps",
      subtitle:
        "Endless questions in your Instagram comments. Orders missing an address or a size. Customers who can't find your hours or prices. A real website fixes all of it.",
      whyTitle: "The problems businesses face on Instagram",
      whyDescription:
        "Customers ask the same questions over and over. Orders arrive missing details. Hours, prices, and location get buried under old posts. A website built for your business fixes this — everything lives on your own site, not scattered across chat apps.",
      features: [
        { title: "Built-In Customer Service", description: "Answer common questions automatically, right on your site — not buried in comments." },
        { title: "Structured Ordering", description: "Customers order with every detail you need — no more back-and-forth for a missing address." },
        { title: "One Place for Everything", description: "Hours, prices, location, and products — always easy to find, never buried under old posts." },
        { title: "Native Mobile Apps", description: "Android & iOS apps when your business outgrows the browser." },
        { title: "You Own the Platform", description: "No algorithm, ban, or feature change can take your storefront away from you." },
        { title: "Built to Rank & Load Fast", description: "Optimized for search and speed, so customers find you and stay." },
      ],
      cta: "Get Your Website",
    },

    // ERP Section
    erp: {
      title: "ERP Systems",
      subtitle:
        "Your warehouse, accounting, and staff records live in different places — spreadsheets here, notebooks there. One ERP system brings it all together.",
      whatIsTitle: "Everything your business runs on, in one place",
      whatIsDescription:
        "An ERP system connects your accounting, inventory, HR, and sales into one platform — accurate information in one place, not scattered across spreadsheets and separate tools.",
      whenNeeded:
        "It works for almost any growing business — retail, manufacturing, schools, clinics, logistics. If your team spends more time tracking information than doing the work, ERP fixes that.",
      featuresTitle: "What's Included",
      features: [
        {
          title: "Accounting & Finance",
          description: "Comprehensive financial management with real-time reporting and analytics.",
        },
        {
          title: "Inventory & Warehouse",
          description: "Track stock levels, orders, sales, and deliveries with precision.",
        },
        {
          title: "HR & Payroll",
          description: "Streamline employee management, attendance, and payroll processing.",
        },
        {
          title: "CRM & Sales",
          description: "Manage customer relationships and optimize your sales pipeline.",
        },
        {
          title: "Manufacturing",
          description: "Plan production, manage resources, and track factory-floor processes.",
        },
        {
          title: "Custom Modules",
          description: "Tailor your ERP to your specific business needs with custom modules.",
        },
      ],
      learnMore: "Talk to Us About ERP",
    },

    // Projects Section
    projects: {
      title: "Our Projects",
      subtitle:
        "Explore our portfolio of custom websites, software solutions, and mobile applications that we've built for clients across various industries.",
      liveDemo: "Live Demo",
      viewCode: "Code",
    },

    // Contact Section
    contact: {
      title: "Get In Touch",
      subtitle: "Have a project in mind or want to learn more about our services? We'd love to hear from you!",
      infoTitle: "Contact Information",
      emailLabel: "Email",
      emailValue: "info@mandsolutions.com",
      phoneLabel: "Phone",
      phoneValue: "+1 (555) 123-4567",
      followUs: "Follow Us",
      formTitle: "Send Us a Message",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailFieldLabel: "Email",
      emailPlaceholder: "Your email address",
      messageLabel: "Message",
      messagePlaceholder: "Tell us about your project or inquiry",
      sendButton: "Send Message",
      sendingButton: "Sending...",
    },

    // Footer
    footer: {
      description: "We build websites, mobile apps, and ERP systems built for how your business actually runs.",
      copyright: "All rights reserved.",
      madeWith: "Made with",
      by: "by M & M Solutions",
    },
  },

  ar: {
    // Navbar
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      web: "المواقع الإلكترونية",
      erp: "نظام ERP",
      projects: "المشاريع",
      contact: "اتصل بنا",
      getStarted: "ابدأ الآن",
    },

    // Hero Section
    hero: {
      title: "هل تعاني من الرسائل الضائعة والطلبات المفقودة؟",
      titleHighlight: "احصل على موقع إلكتروني حقيقي.",
      description:
        "مواقع وتطبيقات فيها خدمة عملاء وإدارة طلبات متكاملة، دون رسائل إنستغرام المتفرقة. وأنظمة ERP تدير أعمال شركتك من مكان واحد.",
      viewProjects: "شاهد أعمالنا",
      getInTouch: "تواصل معنا عبر واتساب",
      // الفوضى المتفرقة التي تتجمّع داخل الجهاز عند التمرير — الأسئلة نفسها
      // التي يذكر قسم المواقع أنها تتكرر على الأعمال يومياً.
      fragments: ["أين موقعكم؟", "هل يتوفر مقاس L؟", "طلب بدون عنوان", "كم السعر؟", "هل أنتم مفتوحون الآن؟"],
      liveLabel: "نشط الآن في صندوق الوارد",
      pillars: {
        automation: {
          title: "خدمة عملاء بالذكاء الاصطناعي",
          description: "ردود فورية على واتساب وإنستغرام على مدار الساعة، حتى لا يفوتك أي طلب.",
        },
        web: {
          title: "مواقع وتطبيقات",
          description: "موقع إلكتروني حقيقي بخدمة عملاء وطلبات متكاملة، دون الحاجة للرسائل الخاصة.",
        },
        erp: {
          title: "أنظمة ERP",
          description: "الشؤون المالية والمخزون والموارد البشرية والمبيعات، جميعها في مكان واحد.",
        },
      },
    },

    // مركز الدردشة الآلي — غير مستخدم حالياً (انظر ملاحظة hero.pillars أعلاه)
    chatConsole: {
      heading: "مركز التحكم",
      subheading: "ذكاء اصطناعي واحد يستجيب فوراً عبر جميع القنوات",
      typing: "يكتب الآن…",
      resolvedBy: "تم الرد بواسطة الذكاء الاصطناعي",
      answeredIn: "تم الرد خلال",
      threads: [
        {
          channel: "واتساب",
          customer: "هل طلبي جاهز للاستلام؟",
          reply: "نعم، الطلب رقم 482 جاهز للاستلام بعد الساعة الخامسة مساءً اليوم. 🙌",
          time: "1.2ث",
        },
        {
          channel: "إنستغرام",
          customer: "هل يتوفر هذا الموديل بمقاس L؟",
          reply: "نعم، تم حجز قطعة لك. يرجى إرسال عنوانك ليتم شحنها اليوم.",
          time: "0.9ث",
        },
        {
          channel: "الموقع الإلكتروني",
          customer: "ما سياسة الاستبدال لديكم؟",
          reply: "نوفر إمكانية الاستبدال خلال 14 يوماً دون أي شروط. هل ترغب أن أبدأ لك عملية الاستبدال الآن؟",
          time: "1.6ث",
        },
      ],
    },

    // About Section
    about: {
      title: "عن M & M Solutions",
      subtitle: "لا حاجة لخبرة تقنية — يكفي أن تخبرنا باحتياجات عملك.",
      description1:
        "نصمم مواقع وتطبيقات وأنظمة ERP لكل أنواع الشركات، من المحل الواحد إلى الشركات متعددة الأقسام. أنت تركّز على عملك، ونحن نتكفّل بالتقنية بالكامل.",
    },

    // شريط القطاعات — يطابق القطاعات المذكورة في قسم ERP.
    marquee: {
      items: [
        "محال تجارية وأسواق",
        "مصانع ومنشآت تصنيع",
        "مدارس ومعاهد",
        "عيادات",
        "شركات توزيع ولوجستيات",
        "مطاعم",
        "متاجر إلكترونية",
        "شركات خدمات",
      ],
    },

    // قسم "أي خدمة تناسبك؟"
    compare: {
      title: "أي خدمة تناسب عملك؟",
      subtitle: "لست متأكداً من أين تبدأ؟ إليك الخلاصة.",
      options: [
        {
          title: "موقع إلكتروني",
          description: "يجدك عملاؤك ويطلبون مباشرة، دون ضياع الطلبات في الرسائل.",
        },
        {
          title: "تطبيق موبايل",
          description: "عندما يكبر عملك ويحتاج عملاؤك تجربة أسرع من هاتفهم.",
        },
        {
          title: "نظام ERP",
          description: "عند إدارة المخزون أو الموظفين أو الحسابات في أكثر من قسم.",
        },
      ],
    },

    // قسم أتمتة الذكاء الاصطناعي — تم تعليقه من app/page.tsx.
    // منصة ميتا للمطورين (واتساب وإنستغرام) غير متوفرة بسوريا حالياً،
    // فهذه الخدمة غير قابلة للتنفيذ فعلياً حالياً. أعد تفعيل <AISection /> في app/page.tsx عند توفرها.
    ai: {
      title: "أتمتة الذكاء الاصطناعي ووكلاء الذكاء الاصطناعي",
      subtitle:
        "أتمتة المهام المتكررة التي تستهلك الوقت باستخدام الذكاء الاصطناعي، ليتمكن فريقك من التركيز على ما يهم فعلاً.",
      automations: {
        title: "أتمتة الذكاء الاصطناعي",
        description: "تبسيط عمليات عملك من خلال أتمتة المهام الروتينية التي تستهلك الوقت والموارد.",
        features: [
          "أتمتة سير العمل والعمليات التجارية",
          "إنشاء التقارير والتحليلات تلقائياً",
          "تبسيط إدخال البيانات ومعالجتها",
          "جدولة المهام المتكررة وإدارتها",
          "تقليل الأخطاء البشرية في العمليات المتكررة",
        ],
      },
      agents: {
        title: "وكلاء الذكاء الاصطناعي",
        description: "موظفك الرقمي الذي يعمل على مدار الساعة دون توقف، ويتولى تفاعلات العملاء والمهام باستمرار.",
        features: [
          "حجز المواعيد وإدارة الجداول",
          "الرد على استفسارات العملاء فوراً",
          "الرد على العملاء عبر إنستغرام وواتساب",
          "تقديم دعم فوري على مدار الساعة",
          "إدارة محادثات متعددة في الوقت نفسه",
        ],
      },
      highlights: {
        available: "متاح على مدار الساعة",
        instant: "ردود فورية",
        social: "جاهز للتواصل الاجتماعي",
        booking: "حجز ذكي",
      },
      cta: "احصل على حل الذكاء الاصطناعي",
    },

    // قسم المواقع والتطبيقات
    web: {
      title: "مواقع وتطبيقات موبايل",
      subtitle:
        "أسئلة متكررة لا تنتهي في تعليقات إنستغرام، وطلبات تصل ناقصة العنوان أو المقاس، وعملاء لا يجدون أسعارك أو مواعيد عملك. الموقع الإلكتروني الحقيقي يحل هذه المشكلات جميعها.",
      whyTitle: "المشكلات التي تواجهها الأعمال على إنستغرام",
      whyDescription:
        "يكرر العملاء الأسئلة نفسها مراراً. تصل الطلبات ناقصة. وتضيع المواعيد والأسعار تحت المنشورات القديمة. موقعك الخاص يحل هذا: كل شيء في مكان واحد، لا موزّعاً على تطبيقات المحادثة.",
      features: [
        { title: "خدمة عملاء متكاملة", description: "رد تلقائي على الأسئلة المتكررة مباشرة من موقعك، دون أن تضيع بين التعليقات." },
        { title: "طلبات منظمة", description: "يرسل العميل طلبه مع كل التفاصيل المطلوبة، دون الحاجة لرسائل متكررة لتصحيح عنوان ناقص." },
        { title: "كل شيء في مكان واحد", description: "المواعيد والأسعار والموقع والمنتجات، متاحة دائماً وبسهولة، دون أن تضيع تحت منشورات قديمة." },
        { title: "تطبيقات موبايل أصلية", description: "تطبيقات على نظامي Android و iOS عندما يكبر عملك عن حدود المتصفح." },
        { title: "أنت تمتلك المنصة بالكامل", description: "لا يمكن لأي خوارزمية أو حظر أو تغيير في السياسات أن يسلبك متجرك." },
        { title: "مبني للسرعة والظهور في نتائج البحث", description: "موقع محسّن للسرعة ولمحركات البحث، ليجدك عملاؤك بسهولة ويستمروا في التعامل معك." },
      ],
      cta: "احصل على موقعك الإلكتروني",
    },

    // ERP Section
    erp: {
      title: "أنظمة ERP",
      subtitle: "يتوزّع مخزونك وحساباتك وسجلات موظفيك بين أماكن متعددة: جدول بيانات هنا، ودفتر هناك. نظام ERP واحد يجمع كل ذلك في مكان واحد.",
      whatIsTitle: "كل ما يحتاجه عملك، في مكان واحد",
      whatIsDescription:
        "يربط نظام ERP حساباتك ومخزونك ومواردك البشرية ومبيعاتك في منصة واحدة، بدلاً من جداول ودفاتر متفرقة.",
      whenNeeded:
        "يناسب أي شركة تسعى للنمو: محال تجارية، مصانع، مدارس، عيادات، وشركات توزيع. إذا كان فريقك يقضي وقتاً بالبحث عن المعلومات أكثر من العمل نفسه، فنظام ERP يحل هذا.",
      featuresTitle: "ماذا يشمل النظام؟",
      features: [
        {
          title: "المحاسبة والشؤون المالية",
          description: "إدارة مالية شاملة، مع تقارير وتحليلات فورية ودقيقة.",
        },
        {
          title: "المخزون والمستودعات",
          description: "متابعة دقيقة لمستويات المخزون والطلبات والمبيعات وعمليات التسليم.",
        },
        {
          title: "الموارد البشرية والرواتب",
          description: "تبسيط إدارة الموظفين والحضور واحتساب الرواتب.",
        },
        {
          title: "إدارة علاقات العملاء والمبيعات",
          description: "إدارة علاقات العملاء وتحسين مسار المبيعات بشكل كامل.",
        },
        {
          title: "التصنيع",
          description: "تخطيط الإنتاج وإدارة الموارد ومتابعة عمليات خط الإنتاج بدقة.",
        },
        {
          title: "حلول مخصصة لعملك",
          description: "إذا كانت طبيعة عملك مختلفة عمّا سبق، نطوّر لك ميزات إضافية مصممة خصيصاً لتلبية احتياجاتك الفعلية.",
        },
      ],
      learnMore: "تواصل معنا بخصوص نظام ERP",
    },

    // Projects Section
    projects: {
      title: "مشاريعنا",
      subtitle:
        "استكشف مجموعة أعمالنا من المواقع الإلكترونية المخصصة والحلول البرمجية وتطبيقات الهاتف المحمول التي صممناها لعملائنا في مختلف القطاعات.",
      liveDemo: "عرض مباشر",
      viewCode: "الكود",
    },

    // Contact Section
    contact: {
      title: "تواصل معنا",
      subtitle: "هل لديك مشروع في ذهنك أو ترغب بمعرفة المزيد عن خدماتنا؟ يسعدنا التواصل معك.",
      infoTitle: "معلومات التواصل",
      emailLabel: "البريد الإلكتروني",
      emailValue: "info@mandsolutions.com",
      phoneLabel: "رقم الهاتف",
      phoneValue: "+1 (555) 123-4567",
      followUs: "تابعنا",
      formTitle: "أرسل لنا رسالة",
      nameLabel: "الاسم",
      namePlaceholder: "اسمك",
      emailFieldLabel: "البريد الإلكتروني",
      emailPlaceholder: "عنوان بريدك الإلكتروني",
      messageLabel: "الرسالة",
      messagePlaceholder: "أخبرنا عن مشروعك أو استفسارك",
      sendButton: "إرسال الرسالة",
      sendingButton: "جارٍ الإرسال...",
    },

    // Footer
    footer: {
      description: "نصمم مواقع إلكترونية وتطبيقات موبايل وأنظمة ERP مبنية خصيصاً لتناسب طريقة عمل شركتك.",
      copyright: "جميع الحقوق محفوظة.",
      madeWith: "صُنع بـ",
      by: "من قبل M & M Solutions",
    },
  },
}
