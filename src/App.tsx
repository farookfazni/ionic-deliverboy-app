import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./pages/LoginPage";
import AppAuthPages from "./AppAuthPages";
import { AuthContext } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`rendering App with loggedIn=${loggedIn}`);
  return (
    <IonApp>
      <AuthContext.Provider value={{loggedIn}}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/loginpage">
              <LoginPage
                loggedIn={loggedIn}
                onlogin={() => setLoggedIn(true)}
              />
            </Route>
            <Route path="/my">
              <AppAuthPages />
            </Route>
            <Route exact path="/" render={() => <Redirect to="/my/home" />} />
            <Route>
              <NotFoundPage/>
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
