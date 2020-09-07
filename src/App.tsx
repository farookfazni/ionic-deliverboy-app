import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./pages/LoginPage";
import AppAuthPages from "./AppAuthPages";
import { AuthContext } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";
import { auth } from "./firebase";

const App: React.FC = () => {
  const [AuthState, setAuthState] = useState({loading: true, loggedIn: false});
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState({loading: false, loggedIn:Boolean(user)});
    });
  }, []);

  console.log(`rendering App with AuthState:`,AuthState);
  if(AuthState.loading){
    return<IonLoading isOpen/>;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn: AuthState.loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/loginpage">
              <LoginPage />
            </Route>
            <Route path="/my">
              <AppAuthPages />
            </Route>
            <Route exact path="/" render={() => <Redirect to="/my/home" />} />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
