export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };

  summary: string;

  skills: string[];

  experience: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
}