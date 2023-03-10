import React from "react";
import ReactDOM from "react-dom/client";
import {HashRouter, Route, Routes} from "react-router-dom";
import {observer, Provider} from "mobx-react";
import {EluvioConfiguration} from "../configuration";

import "Assets/stylesheets/app.scss";
import * as Stores from "./stores";
import LeftNavigation from "Components/LeftNavigation";
import {PageLoader} from "Components/Loader";
import TenantBasics from "Pages/TenantBasics";
import TenantUsers from "Pages/TenantUsers";
import TenantGroups from "Pages/TenantGroups";
import TenantPermissions from "Pages/TenantPermissions";
import MarketplaceBasics from "Pages/MarketplaceBasics";
import MarketplaceProducts from "Pages/MarketplaceProducts";
import MarketplacePayments from "Pages/MarketplacePayments";
import UsageBasics from "Pages/UsageBasics";
import UsageBilling from "Pages/UsageBilling";

const rootElement = ReactDOM.createRoot(document.getElementById("app"));

export var appRoutes = [
  {
    section: "Tenant",
    routes:[
      {path: "/", Component: <TenantBasics />, label: "Basics"},
      {path: "/tenant/users", Component: <TenantUsers />, label: "Users"},
      {path: "/tenant/groups", Component: <TenantGroups />, label: "Groups"},
      {path: "/tenant/permissions", Component: <TenantPermissions />, label: "Permissions"}
    ]
  },
  {
    section: "Marketplace",
    routes:[
      {path: "/marketplace/basics", Component: <MarketplaceBasics />, label: "Basics"},
      {path: "/marketplace/products", Component: <MarketplaceProducts />, label: "Products"},
      {path: "/marketplace/payments", Component: <MarketplacePayments />, label: "Payments"},
    ]
  },
  {
    section: "Usage",
    routes:[
      {path: "/usage/basics", Component: <UsageBasics />, label: "Basics"},
      {path: "/usage/billing", Component: <UsageBilling />, label: "Billing"},
    ]
  }
];

console.log(EluvioConfiguration["mode"]);
if(EluvioConfiguration["mode"] == "production") {
  appRoutes = [
    {
      section: "Tenant",
      routes:[
        {path: "/", Component: <TenantBasics />, label: "Basics"},
      ]
    },
    {
      section: "Marketplace",
      routes:[
        {path: "/marketplace/basics", Component: <MarketplaceBasics />, label: "Basics"},
      ]
    }
  ];
}

const App = observer(() => {
  if(!rootStore.loaded) { return <PageLoader />; }

  return (
    <main>
      <Routes>
        {
          appRoutes.map(({routes}) => (
            routes.map(({path, Component}) => (
              <Route
                exact={true}
                key={path}
                path={path}
                element={Component}
              />
            ))
          ))
        }
      </Routes>
    </main>
  );
});

rootElement.render(
  <Provider {...Stores}>
    <React.StrictMode>
      <HashRouter>
        <div className="app-container">
          <LeftNavigation />
          <App />
        </div>
      </HashRouter>
    </React.StrictMode>
  </Provider>
);
