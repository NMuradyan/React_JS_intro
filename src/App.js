import React from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToDo from "./Components/pages/ToDo/ToDo";
import About from "./Components/pages/About/About";
import Contact from "./Components/pages/Contact/Contact";
import TaskPage from "./Components/pages/TaskPage/TaskPage";
import NotFound from "./Components/pages/NotFound/NotFound";
import NavMenu from "./Components/NavMenu/NavMenu";
import Footer from "./Components/Footer/Footer";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./Components/Spinner/Spinner";

function App(props) {
  const { loading, errorMassage, successMassage } = props;

  if (errorMassage) {
    toast.error(errorMassage);
  }

  if (successMassage) {
    toast.success(successMassage);
  }

  return (
    <div className="App">
      <NavMenu />

      <Switch>
        <Route path="/" exact component={ToDo} />
        <Route path="/task" exact component={ToDo} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/task-page/:id" exact component={TaskPage} />
        <Route path="/404" exact component={NotFound} />
        <Redirect to="/404" />
      </Switch>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {loading && <Spinner />}

      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMassage: state.errorMassage,
    successMassage: state.successMassage,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, null)(App);
