export interface IProfile {
  id: string;
  name: string;
  contact: {
    email: string;
    phone_number: string;
    github: string;
  };
  award: string[];
  certificate: string[];
  skills: string[];
  schools: string[];
  profile_image_url: string;
}
