import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Pranavi",
      email: "pranavi@bdnt.tech",
      phone: 12345,
      password: bcrypt.hashSync("google@123", 8),
      role: "admin",
    },
    {
      name: "Abhishek",
      email: "abhishek@bdnt.tech",
      phone: 67890,
      password: bcrypt.hashSync("google@123", 8),
      role: "admin",
    },
    {
      name: "Md wasique",
      email: "mdwasique234@bdnt.tech",
      phone: 9876,
      password: bcrypt.hashSync("bdnt@123", 8),
      role: "admin",
    },
    {
      name: "Sample-user",
      email: "sample_user@bdnt.tech",
      phone: 54321,
      password: bcrypt.hashSync("google@123", 8),
      role: "student",
    },
    {
      name: "Sample-user1",
      email: "sample_user1@bdnt.tech",
      phone: 78546565,
      password: bcrypt.hashSync("google@123", 8),
      role: "student",
    },
    {
      name: "Prashant G",
      email: "prashantg@bdnt.tech",
      phone: 99999,
      password: bcrypt.hashSync("google@123", 8),
      role: "employee",
    },
  ],
  courses: [
    {
      name: "SAP-ABAP",
      category: "coding",
      image: "/images/p1.jpg",
      price: 3000,
      rating: 4.5,
      available: true,
      description:
        "complete SAP-ABAP course that will enhance your skills in SAP with using  ABAP programming.. ",
    },
    {
      name: "MERN",
      category: "coding",
      image: "/images/p2.jpg",
      price: 3500,
      rating: 4.2,
      available: true,
      description:
        "complete course on Mongodb,Expressjs,Reactjs and nodejs.. This course helps you to design and develop and deploy a full functional Websites  ",
    },

    {
      name: "Devops",
      category: "command-line-interfacing",
      image: "/images/p3.jpg",
      price: 5000,
      rating: 4.6,
      available: false,
      description:
        "A Beginer to advance course in Devops.. This course helps you to learn popular devops technologies like 'Jenkins', 'Docker containers', 'Kubernetes' and more",
    },
    {
      name: "AI-ML",
      category: "coding",
      image: "/images/p4.jpg",
      price: 5500,
      available: false,
      rating: 4.8,
      description:
        "An advance course for Machine learning and Artificial intelligence. This course contains different 'ML and AI' such as Linear Regression, Support-vector-machines , Decesion-trees, Reinforcement learning and Neural networks ",
    },
    {
      name: "VISION-OS",
      category: "coding",
      image: "/images/p5.jpg",
      price: 7000,
      available: true,
      rating: 4.9,
      description:
        "We'll take you through the frameworks you'll use to create apps for visionOS and show you how to design with depth, scale, and immersion. Explore how you can use tools from Apple, like Xcode and the new Reality Composer Pro, and how you can make spatial computing apps that work well for everyone.",
    },
    {
      name: "UNREAL-ENGINE-5",
      category: "coding",
      image: "/images/p6.jpg",
      price: 5000,
      available: true,
      rating: 4.4,
      description:
        "This course will teach you about materials, static meshes, lighting, Quixel tools, Nanite, animations, cutscenes, UI screens, game flow logic, blueprints - and much more. Get ready to start your journey in an endless world with the power of Unreal Engine 5!",
    },
    {
      name: "Next-js",
      category: "coding",
      image: "/images/p7.jpg",
      price: 8000,
      available: true,
      rating: 5,
      description:
        " NextJS allows you to build React apps with built-in server-side rendering and page pre-rendering. Building great user experiences and search engine friendly (SEO!) React apps has never been easier!",
    },
    {
      name: "JAVA-SPRINGBOOT",
      category: "coding",
      image: "/images/p8.jpg",
      price: 7000,
      available: true,
      rating: 5,
      description:
        "The course typically covers core framework concepts, Microservices, Web applications, Data access, and Testing. You also learn to develop Spring-based applications and Microservices, understand how to use Spring Boot Auto-Configuration, and master Spring Boot Actuator.",
    },
    {
      name: "MY-SQL",
      category: "coding",
      image: "/images/p9.jpg",
      price: 7000,
      available: true,
      rating: 5,
      description:
        "We have framed MySQL Course Curriculum to make you familiar with basic MSSQL, relation modeling, SQL optimization, execution plans, table joining internals, subqueries, advanced SQL operators.",
    },
  ],
};

export default data;
