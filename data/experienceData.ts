interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  startDate: string;
  endDate: string;
  type: 'freelance' | 'fulltime' | 'technical';
  description: string[];
  skills: string[];
  level: number; // Game-style level representation
  achievements: number; // Number of achievements/key points
}

export const experiences: Experience[] = [
  {
    id: 'freelancer',
    title: 'FullStack Developer',
    company: 'Freelancer',
    period: 'May 2024 - Present',
    startDate: '2024-05',
    endDate: 'present',
    type: 'freelance',
    description: [
      'Freelancing in web and mobile app development, specializing in React Native with Expo',
      'Leveraging AI tools like Bolt.new, Windsurf, and ChatGPT for innovative solutions',
      'Delivering custom solutions for diverse client needs'
    ],
    skills: ['React Native', 'Expo', 'AI Tools', 'Full Stack Development'],
    level: 5,
    achievements: 3
  },
  {
    id: 'skillur',
    title: 'FullStack Developer',
    company: 'SKILLUR AB',
    period: 'Aug 2022 - May 2024',
    startDate: '2022-08',
    endDate: '2024-05',
    type: 'fulltime',
    description: [
      'Developed web apps using React.js, Node.js, MySQL, and TypeScript',
      'Designed and implemented database schemas for efficient data storage',
      'Created responsive UIs with HTML, CSS, and Figma',
      'Developed APIs using Express.js with JSON data exchange',
      'Optimized code performance and resolved technical challenges',
      'Managed projects using Jira and collaborated via Confluence',
      'Worked with cross-functional teams to deliver exceptional UX'
    ],
    skills: ['React.js', 'Node.js', 'MySQL', 'TypeScript', 'Express.js', 'Jira', 'Figma'],
    level: 4,
    achievements: 7
  },
  {
    id: 'tag',
    title: 'Frontend Developer',
    company: 'TALAL ABU GHAZALEH',
    period: 'Dec 2017 - Apr 2019',
    startDate: '2017-12',
    endDate: '2019-04',
    type: 'fulltime',
    description: [
      'Contributed to front-end development projects using HTML, CSS, and JavaScript',
      'Played key role in development at TAG-ITI, leading IT services organization in Arab world',
      'Member of Talal Abu Ghazaleh Organization (TAG-Org) in Amman, Jordan'
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'Front-end Development'],
    level: 3,
    achievements: 3
  },
  {
    id: 'alaa',
    title: 'Store Employee',
    company: "ALA'A ELDDEEN STORE",
    period: 'Sep 2016 - Dec 2017',
    startDate: '2016-09',
    endDate: '2017-12',
    type: 'technical',
    description: [
      'Sales of computer games and gaming consoles (PS, Xbox, Nintendo)',
      'Provided technical support for gaming systems',
      'Managed inventory and customer relations'
    ],
    skills: ['Technical Support', 'Customer Service', 'Gaming Systems'],
    level: 2,
    achievements: 3
  },
  {
    id: 'gameover',
    title: 'Technical Supporter',
    company: 'GAMEOVER',
    period: 'Mar 2012 - Jul 2016',
    startDate: '2012-03',
    endDate: '2016-07',
    type: 'technical',
    description: [
      'Provided comprehensive technical support at GameOver',
      'Managed hardware and network infrastructure',
      'Handled software installation and maintenance',
      'Ensured seamless network operations'
    ],
    skills: ['Hardware Support', 'Network Management', 'Technical Support'],
    level: 1,
    achievements: 4
  }
];
