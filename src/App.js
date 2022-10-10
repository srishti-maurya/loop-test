import { PageRoutes } from './routes/PageRoutes';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <PageRoutes />
    </>
  );
};
