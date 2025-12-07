// about.types.ts

// --- 1. Core Data Interfaces ---

/**
 * Interface for the main 'about' data endpoint.
 */
export interface AboutData {
  hero: HeroSection;
  sections: CorePrinciple[];
}

/**
 * Interface for the Team Members endpoint.
 */
export interface TeamMember {
  name: string;
  position: string;
  image: string; // URL to the member's image
}

/**
 * Interface for the Statistics endpoint.
 */
export interface Statistic {
  number: string; // Stored as string to handle formatted numbers like "5k+", "200%"
  label: string;
}

/**
 * Interface for the Clients endpoint.
 */
export interface Client {
  logo: string; // URL to the client's logo
  name?: string; // Optional: Client name for alt text/accessibility
}

// --- 2. Nested/Detail Interfaces ---

/**
 * Details for the Hero section.
 */
export interface HeroSection {
  backgroundImage: string; // URL to the hero background image
  title: string;
  subtitle: string;
}

/**
 * Details for the Vision, Mission, Values sections.
 */
export interface CorePrinciple {
  // This string must match a key in the iconMap used in the component (e.g., 'FaEye').
  icon: 'FaEye' | 'FaBullseye' | 'FaHandshake' | string; 
  title: string;
  description: string;
}

// --- 3. Utility Type for the fetchData function ---

/**
 * Utility type representing all possible top-level data shapes.
 */
export type FetchedDataType = AboutData | TeamMember[] | Statistic[] | Client[];