export interface IUser {
  id: number;
  name: string;
  avatar: string | null;
  email: string;
  description: string | null;
  avatarPreview?: string | null;
}

