import {
  DiamondLgBlue,
  DiamondLgGreen,
  DiamondLgOrange,
  DiamondLgPink,
  DiamondLgYellow,
  SkillHtml5,
  SkillPhotoshop,
  SkillXd,
  CGI,
  SkillPowerpoint,
  THWS,
  SkillPython,
  SkillJS,
  SkillCplus,
  SkillKotlin,
  SkillSolidity,
  SkillBash,
  SkillPhp,
  SkillBlender,
  SkillDesign,
  Ableton,
  Word,
  Waldorf,
  UniWien,
  Pillap_one,
  Pillap_two,
  Pillap_three,
  MetaMerce,
  MunichPieces,
  BikeOne,
  BikeTwo,
  BikeThree

} from "../assets/image";
  
  const DATA_EN = {
  
    headerText: [
      {
        header_text: "In October 2024 I'm moving to Vienna, maybe I'll start a master's degree in computer science there, I'd probably prefer to work for your company and this is my specially programmed application for it!",
      }
    ],
  
    professionalExperiences: [
      {
        id: "prof_exp_1",
        startDate: "Sep 2022",
        endDate: "Aug 2023",
        position: "Internship/Working student",
        diamondColors: ["Purple", "Yellow", "Blue"],
        company: {
          logo: CGI,
          name: "CGI",
          info: "IT-Consulting, Frankfurt am Main",
        },
        description:
          "I worked at CGI Consulting for 11 months, including 5 months in Gdansk (Poland) as a full-stack developer and IT consultant.  \n\nI mainly gained experience in managing and leading smaller teams of up to 6 people, developing various applications with Python (Django, Flask), VueJS and Solidity, as well as regularly presenting project successes to up to 800 people internally and externally from the company. My employment ended with the start of my semester abroad in Belgium/France.",
        links: [
          {
            label: "CGI",
            url: "https://www.cgi.com/de/de",
          },
        ],
      },
      {
        id: "prof_exp_2",
        startDate: "Mar 2022",
        endDate: "Aug 2022",
        position: "UI/UX-Designer",
        diamondColors: ["Blue", "Orange", "Pink"],
        company: {
          logo: THWS,
          name: "THWS",
          info: "Technical University of Applied Sciences Wuerzburg-Schweinfurt",
        },
        description:
          "As a research assistant at THWS, my task was to develop UX design prototypes and to validate and subsequently optimize them using user tests.",
        links: [
          {
            label: "THWS",
            url: "https://www.thws.de/",
          },
        ],
      },
      
    ],
    educationalExperiences: [
  
      {
        id: "edu_1",
        icon: Waldorf,
        course: "Waldorf School Wuerzburg",
        institution: "Waldorf School Wuerzburg",
        degree: "Abitur",
        startDate: "2006",
        endDate: "2019",
        position: "begin"
      },
  
      {
        id: "edu_2",
        icon: THWS,
        course: "E-Commerce B.Sc.",
        institution: "THWS",
        degree: "Bachelor of Science",
        startDate: "2021",
        endDate: "2024",
        position: "middle"
      },
  
      {
        id: "edu_3",
        icon: UniWien,
        course: "Master Computer Science",
        institution: "University Wien",
        degree: "Master of Science",
        startDate: "2024",
        endDate: "~",
        position: "end"
      },
  
    ],
    skills: [
      {
        id: "skill_1",
        icon: SkillPython,
        name: "Python",
        description: "Django, Tensorflow, Flask, Pandas",
        skill_level: "9/10",
        skill: "python",
        project_name: "MetaMerce",
        project_description: "A huge project to scan e-commerce websites with OCR and translate the scaned data into JSON-LD",
        project_link: "https://github.com/Mvb-DL/MetaMerce"
      },
      {
        id: "skill_2",
        icon: SkillJS,
        name: "JavaScript",
        description: "ReactJS, ThreeJS",
        skill_level: "7/10",
        skill: "js",
        project_name: "Munich Pieces",
        project_description: "This is a Web-App where you can buy Munich Pieces (NFTs) of Art pieces in Munich to help museum to earn money",
        project_link: "https://github.com/Mvb-DL/NFT-Munich-Pieces"
      },
      {
        id: "skill_3",
        icon: SkillCplus,
        name: "C++",
        description: "Juice",
        skill_level: "6/10",
        skill: "c",
        project_name: "Ableton Plugins",
        project_description: "My greatest passion is music, in my spare time I like to build synthesizers, especially for techno."
      },
      {
        id: "skill_4",
        icon: SkillKotlin,
        name: "Kotlin",
        description: "Android Dev",
        skill_level: "6.5/10",
        skill: "kotlin",
        project_name: "CitIndi",
        project_description: "An Android App written in Kotlin for managing my trips and stays in different places in the world",
        project_link: "https://github.com/Mvb-DL/CitIndi"
      },
      {
        id: "skill_5",
        icon: SkillSolidity,
        name: "Solidity",
        description: "Ethereum & Web3 Dev",
        skill_level: "7.7/10",
        skill: "solidity",
      },
      {
        id: "skill_6",
        icon: SkillBash,
        name: "Bash",
        description: "Linux",
        skill_level: "5/10",
        skill: "bash",
      },
      {
        id: "skill_7",
        icon: SkillPhp,
        name: "PHP",
        description: "WordPress Plugin Dev",
        skill_level: "8.5/10",
        skill: "php",
      },
  
      {
        id: "skill_8",
        icon: SkillHtml5,
        name: "HTML",
        description: "WordPress Plugin Dev",
        skill_level: "9.8/10",
        skill: "html",
      },
  
    ],

    random: {
      first: "How do I see my future?",
      second: "One day I'll either write a biography of Claude Debussy or end up in a punk band with an audience of 20 people.",
      three: "Something else in between...",
      four: "Songs that you have to hear and that I would love to discover again!",
      five: "Best movies?",
      sixth: "Bladerunner (1982!), Taxi Driver, Crank, Apocalypse Now",
      seven: "Which animal would I be?",
      eight: "I don't know, I've never understood the question. The lion also stands for strength and is the laziest animal.",
      nine: "Overrated movies?!",
      ten: "Dune, Interstellar (also has a lot to do with Hans Zimmer haha)",
      eleven: "My weaknesses?",
      twelve: "Of course there are, otherwise I wouldn't work in IT. We can discuss this in more detail in a personal meeting ;)",

    },
  
    otherSkills:[
      {
        id: "skill_9",
        icon: SkillBlender,
        name: "Blender",
        skill_level: "5/10",
        skill: "blender",
      },
  
      {
        id: "skill_10",
        icon: Ableton,
        name: "Ableton",
        skill_level: "7/10",
        skill: "ableton",
      },
  
      {
        id: "skill_11",
        icon: SkillDesign,
        name: "InDesign",
        skill_level: "8/10",
        skill: "design",
      },
  
      {
        id: "skill_12",
        icon: Word,
        name: "Microsoft Office",
        skill_level: "8/10",
        skill: "micro",
      },
    ],
  
    certificatesAndAwards: [
      {
        id: "cert_award_1",
        icon: "",
        provider: "Sportverein Veitshöchheim",
        course: "Ausgebildeter Fitness-Trainer",
        startDate: "Dez 2019",
        endDate: "-",
      },
      {
        id: "cert_award_2",
        icon: "",
        provider: "-",
        course: "-",
        startDate: "-",
        endDate: "-",
      },
      {
        id: "cert_award_3",
        icon: "",
        provider: "-",
        course: "-",
        startDate: "-",
        endDate: "-",
      },
    ],
    hobbiesAndInterests: [
      {
        id: "hob_1",
        icon: "",
        name: "Gym",
      },
      {
        id: "hob_2",
        icon: "",
        name: "-",
      },
      {
        id: "hob_3",
        icon: "",
        name: "Reisen",
      },
      {
        id: "hob_4",
        icon: "",
        name: "-",
      },
    ],
  
    model:{
      modelUrl: ""
    },
  
    langOption:{
      german_icon: "",
      english_icon: "",
    },
  
    externDocs: 
      {
        logo: "",
        notes: "",
        realpdf: "./docs/lebenslauf.pdf"
        
      },

      biopic_text: {
        header_name: "That´s me...",
        pic_text: "Mario, 24 from Wuerzburg",
        hobbies: "Hobbies:",
        hobbies_attr: "Running, Boxing, Reading",
        interest: "Interests:",
        interest_attr: "Music, pop culture, history",
        cv: "Resumee",
        notes: "Notes",
        ausbildung: "Education",
        exp: "Experience",
        skills: "Skills",
        projects: "Projects"
      },

      titles: {
        title_one: "Professional experience",
        title_two: "Education",
        title_three: "Programming Skills",
        title_four: "Other Skills",
        title_five: "Languages",
        title_six: "Programs",
        title_seven: "German",
        title_eight: "English (B2)",
        title_nine: "French(A2)",
        title_ten: "Projects",
        title_eleven: "Resume",
        title_twelve: "Random Facts",
        subtitle: "(Just to get to know me a little...)"
      },

      cloud_text: [
        "Boxing", "Pop culture", "Kafka", "David Bowie", "Techno", "Punk",
        "10K-Run", "Bike", "History", "Claude Debussy"
    ],

    projects: [

      { 
        id: 1,
        name: "Pillap",
        short_desc: "Start-up for sustainable laptop bags in the textile sector mobile working",
        desc: "Pillap (Pillow + Laptop) is an award-winning start-up (Kickstarter, Startbahn27), which I founded with two other team members. Our product is a sustainable, innovative laptop bag that can be used as a pillow, for example, and can also be adapted to the customer's individual needs using a patented modular system.",
        next_desc: "Find out more about the project via the following links on LinkedIn",
        pic_one: Pillap_one,
        pic_two: Pillap_two,
        pic_three: Pillap_three,
        link_one : "https://www.linkedin.com/posts/werkraum-thws_thws-startupslabfh-fwi-activity-7075491659559399424-A0b2",
        link_two: "https://www.linkedin.com/posts/nico-hildmann_flight-startbahn27-schweinfurt-activity-7197124841701785600-ovEx",
        link_one_text: "Kickstarter",
        link_two_text: "Startbahn27"
      },

    ],


    projects_two: [
      {
        id: 1,
        github: "GitHub",
        github_desc: "You can find all my programming projects on GitHub",
        github_pic_one: MetaMerce,
        github_pic_two: MunichPieces,
        bike: "Cycling through Europe",
        bike_desc: "Every summer, another country in Europe is explored by bike. This year from Rome to Palermo. Countries visited: Switzerland, France, Italy, Spain, Austria, Luxembourg, Belgium, Netherlands, Liechtenstein (but nothing like Italy!)",
        bike_pic_one: BikeOne,
        bike_pic_two: BikeTwo,
        bike_pic_three: BikeThree,
        sdw: "During the Corona period, we decided to found an association so that we could build a network for our fellow students to develop ideas and sustainable entrepreneurial solutions in the Wuerzburg region. Unfortunately, I had to withdraw from this project in summer 2023 due to other commitments."
      }
    ],


    lifeline: {
      monte: "Montessori-School Wuerzburg",
      waldorf: "Waldorfschool Wuerzburg",
      abitur : "Abitur",
      uni: "Uni-Wuerzburg Jurisprudence",
      e_com: "E-Commerce THWS",
      danzig: "Internship abroad CGI Inc. Gdansk",
      pillap: "Pillap",
      full: "Fullstack Developer",
      erasmus: "Erasmus Lille/Kotrijk",
      future: "Your company?",
      now: "Now"
    }

  
  
    
  };
  
  export default DATA_EN;
  