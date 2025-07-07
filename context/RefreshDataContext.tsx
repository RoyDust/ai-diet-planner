import { createContext } from "react";

export const RefreshDataContext = createContext({
  refreshData: null,
  setRefreshData: (data: any) => {},
});
