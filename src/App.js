import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddContact from './components/AddContact'
import { action as addAction } from './components/AddContact'
import './App.css';
import RootLayout from './pages/Root';
import ErrorElement from './pages/Error';
import ShowContacts, { loader as showContactLoader } from './components/ShowContacts';
import ContactDetail from './components/ContactDetail';
import { loader as detailLoader } from './components/ContactDetail';
import HomePage from './components/HomePage';

const contactRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorElement/>,
    children: [
      {
        path: '',
        element: <HomePage/>
      },
      {
        path: '/contact',
        element: <ShowContacts/>,
        loader: showContactLoader,
        children: [
          {
            path: ':contactId',
            id: 'detail',
            element: <ContactDetail/>,
            loader: detailLoader,
            children: [
              {
                path: 'edit',
                element: <AddContact method='PATCH'/>,
                action: addAction
              }
            ]
          }
        ]
      },
      {
        path: 'addcontact',
        element: <AddContact method='POST'/>,
        action: addAction
      }
  ]
  }
])

function App() {
  return (
    <RouterProvider router={contactRouter} />
  );
}

export default App;
