import { useOutlet } from "react-router-dom";
import { useKeepOutlets } from "../KeepAliveLayout";

const CacheLayout = ({ children }: any) => {
  const outlet = useOutlet();
  const element = useKeepOutlets();
  return outlet ? element : children;
};

export default CacheLayout;
