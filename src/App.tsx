import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./pages/LoginPage";
import AppAuthPages from "./AppAuthPages";
import { AuthContext, useAuthInit } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  const {loading, auth} = useAuthInit();
 

  
  if(loading){
    return<IonLoading isOpen/>;
  }
  console.log(`rendering App with auth:`,auth);
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
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
