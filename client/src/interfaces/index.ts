import { ReactNode } from "react";

export interface ISidebarType {
  actionImage: string;
  actionName: string;
  path: string;
  target: string;
}

export interface INavRoutes {
  name: string;
  icon: ReactNode;
}
