/* eslint-disable quotes */
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import NewContact from "./pages/NewContact";
import { Container as EditContact } from "./pages/EditContact/index";
import Categories from "./pages/Categories";
import NewCategory from "./pages/NewCategory";
import EditCategory from "./pages/EditCategory";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/contacts/new" component={NewContact} />
      <Route path="/contacts/edit/:id" component={EditContact} />

      <Route path="/categories" exact component={Categories} />
      <Route path="/categories/new" component={NewCategory} />
      <Route path="/categories/edit/:id" component={EditCategory} />
    </Switch>
  );
}
