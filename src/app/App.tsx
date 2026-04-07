import { RouterProvider } from 'react-router';
import { AppProvider } from './store';
import { router } from './routes';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
