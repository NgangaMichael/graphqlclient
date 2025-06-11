// App.js
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Header />
          <div className="container">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
