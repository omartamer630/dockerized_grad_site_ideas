export interface NewIdeaProps {
  [key: string]: string;
  title: string;
  content: string;
}

export interface IdeaProps {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IdeaCardProps {
  cardData: IdeaProps;
  refresh: (q: string) => Promise<void>;
}
export interface returnedIdeasProps {
  message: string;
  ideas: IdeaProps[];
}

export interface IdeaErrorProps {
  message?: string;
  contnet?: string;
  title?: string;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: IdeaProps;
}

export interface EditIdeaProps {
  cardData?: IdeaProps;
}
