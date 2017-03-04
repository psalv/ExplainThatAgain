import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'
import { GraphUpdater } from './graph';
import { CourseObject } from './course';
import { SessionObject } from './session';
import { AdminObject } from './admin';

class HomePage extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <GraphUpdater/>
                <SessionObject/>
                <CourseObject/>
                <AdminObject/>
            </div>
        )
    }
}

export default Navigation;