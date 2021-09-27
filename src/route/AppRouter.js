import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { CreateScreen } from "../components/CreateScreen/CreateScreen";
import { EditScreen } from "../components/EditScreen/EditScreen";
import { Header } from "../components/Header/Header";
import { ProjectList } from "../components/HomeScreen/ProjectList";

export const AppRouter = () => {

    return (
        <Router>
            <Header/>

            <Switch>
                <Route exact path="/" component={ProjectList}/>
                <Route exact path="/create" component={CreateScreen}/>
                <Route exact path="/edit/:id" component={EditScreen}/>

                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    )
}
