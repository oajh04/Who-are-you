export interface IProjectInfo {
  id: string;
  name: string;
  start_at: string;
  end_at: string;
  description: string;
  image_url: string[];
}

export interface ProjectList {
  name: string;
  id: string;
  start_at: string;
  end_at: string;
  description: string;
}
