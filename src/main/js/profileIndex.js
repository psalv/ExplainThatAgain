import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router';
import AddAdmin from './addAdmin';
import DeleteAdmin from './deleteAdmin';
import AddClass from './addClass'
import DeleteClass from './deleteClass'
import AddCourse from './addCourse'
import DeleteCourse from './deleteCourse'

const Paths = {
    ADDADMIN: "/addAdmin",
    DELETEADMIN: "/deleteAdmin",
    ADDCLASS: "/addClass",
    DELETECLASS: "/deleteClass",
    ADDCOURSE: "/addCourse",
    DELETECOURSE: "/deleteCourse"
};

const Greet = () =>
    <div className="jumbotron">
    <h1>Teacher Profile</h1>
        <p>Add an Administrator</p>
        <AddAdmin />
        <p><Link to={Paths.ADDADMIN}>Add Admin</Link></p>
        <p>Remove an Administrator</p>
        <DeleteAdmin />
        <p><Link to={Paths.DELETEADMIN}>Remove Admin</Link></p>
        <p>Add a class</p>
        <AddClass />
        <p><Link to={Paths.ADDCLASS}>Add Class</Link></p>
        <p>Remove a class</p>
        <DeleteClass />
        <p><Link to={Paths.DELETECLASS}>Remove Class</Link></p>
        <p>Add a course</p>
        <AddCourse />
        <p><Link to={Paths.ADDCOURSE}>Add Course</Link></p>
        <p>Remove a course</p>
        <DeleteCourse />
        <p><Link to={Paths.DELETECOURSE}>Remove Course</Link></p>
    </div>;

const NotFound = () =>
    <div className="row">
        <h1>404.</h1>
    </div>;

ReactDOM.render(
    <Router history={browserHistory}>

            <IndexRoute component={Greet}/>
            <Route path={Paths.ADDADMIN}/>
            <Route path={Paths.DELETEADMIN}/>
            <Route path={Paths.ADDCLASS}/>
            <Route path={Paths.DELETECLASS}/>
            <Route path={Paths.ADDCOURSE}/>
            <Route path={Paths.DELETECOURSE}/>
            <Route path="*" component={NotFound} />

    </Router>
);