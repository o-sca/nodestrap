import { Manager } from "./Manager";
import { Lang } from "./Lang";

export type NSAnswers = {
  templateChoice: Lang;
  projectName: string;
  authorName: string;
  gitInit: boolean;
  packageManager?: Manager;
};

