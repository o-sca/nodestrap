import { Manager } from "./Manager";
import { Lang } from "./Lang";

export type Answers = {
  templateChoice: Lang;
  projectName: string;
  authorName: string;
  packageManager: Manager;
};
