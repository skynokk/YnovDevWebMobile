import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { SplashScreen } from "@capacitor/splash-screen";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/listTopTheme.css";
import { CreateTop, Home, ViewTop, Connection, LoadingPage } from "./pages";
import { Menu } from "./components";
import { useFirebaseLogin } from "./hooks";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const App: React.FC = () => {
  const { user, checkAuth } = useFirebaseLogin();
  const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   SplashScreen.show({
  //     autoHide: false,
  //   });
  // }, []);
  useEffect(() => {
    initializeApp(firebaseConfig);
    checkAuth().then(() => {
      setLoading(false);
      SplashScreen.hide();
    });
  }, [checkAuth]);
  console.log(`IONIC::::`, user);
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route
              path="/"
              exact
              render={(_props) =>
                loading ? <LoadingPage /> : user ? <Home /> : <Connection />
              }
            />
            <Route path="/create" exact component={CreateTop} />
            <Route path="/view/:title" exact component={ViewTop} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
