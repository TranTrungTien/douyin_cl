import { ReactNode } from "react";

export interface ISidebarType {
  actionImage: string;
  actionName: string;
  path: string;
}

export interface INavRoutes {
  name: string;
  icon: ReactNode;
}
