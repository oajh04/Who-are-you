export interface IProjectInfo {
  id: string;
  name: string;
  start_at: string;
  end_at: string;
  description: string;
  image_arr: string[];
  user_id: string;
}

export interface IProjectCreate {
  name: string;
  start_at: string;
  end_at: string;
  description: string;
  image_arr: string[];
  user_id: string;
}
