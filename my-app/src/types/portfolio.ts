export type Portfolio = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  talent?: string;
  motivation: string;
  skills?: string;
  photo?: string; // Data URL
  gallery?: string[]; // Data URLs for activities/awards/works
  createdAt: number;
};

export type NewPortfolio = Omit<Portfolio, 'id' | 'createdAt'>;

