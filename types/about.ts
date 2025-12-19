
export interface AboutData {
  hero: HeroSection;
  sections: CorePrinciple[];
}

export interface TeamMember {
  name: string;
  position: string;
  image: string; 
}

export interface Statistic {
  number: string; 
  label: string;
}

export interface Client {
  logo: string;
  name?: string;
}

export interface HeroSection {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

export interface CorePrinciple {
  icon: 'FaEye' | 'FaBullseye' | 'FaHandshake' | string; 
  title: string;
  description: string;
}

export type FetchedDataType = AboutData | TeamMember[] | Statistic[] | Client[];