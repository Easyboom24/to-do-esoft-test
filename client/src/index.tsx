import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { createContext } from 'react';
import UserStore from './stores/UserStore';
import TaskStore from './stores/TaskStore';

export interface StoreTypeForContext {userStore: UserStore,taskStore: TaskStore};

const defaultContext = {
  userStore: new UserStore(),
  taskStore: new TaskStore()
};
export const Context = createContext<StoreTypeForContext>(defaultContext);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={defaultContext}>
    <App />
  </Context.Provider>
);


