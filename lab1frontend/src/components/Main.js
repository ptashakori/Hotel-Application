import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './LandingPage/Navbar';
import Login from './Login/Login';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Create from './Create/Create';
import CreateCourse from './CreateCourse/CreateCourse';

import editName from './Profile/editName';
import editPhoneNumber from './Profile/editPhoneNumber';
import editAboutMe from './Profile/editAboutMe';
import editCity from './Profile/editCity';
import editCountry from './Profile/editCountry';
import editCompany from './Profile/editCompany';
import editSchool from './Profile/editSchool';
import editHometown from './Profile/editHometown';
import editLanguages from './Profile/editLanguages';
import editGender from './Profile/editGender';
import editProfileImage from './Profile/editProfileImage';

import SearchClasses from './Search/SearchClasses';
import searchByTerm from './Search/searchByTerm';
import searchByName from './Search/searchByName';
import searchByID from './Search/searchByID';

import enrollClass from './Enroll/enrollClass';
import dropClass from './Drop/dropClass';
import viewClasses from './View/viewClasses';
import viewFacultyCourses from './View/viewFacultyCourses';

import dropStudent from './Drop/dropStudent';

import allStudentsRegistered from './View/allStudentsRegistered';
import allOtherStudents from './View/allOtherStudents';

import createAnnouncement from './Create/createAnnouncement';
import viewAnnouncement from './View/viewAnnouncement';

import lectureNotesAndFiles from './Upload/lectureNotesAndFiles';
import viewNotesAndFiles from './View/viewNotesAndFiles';

import createAssignment from './Create/createAssignment';

import submitAssignment from './Submit/submitAssignment';

import studentSubmissions from './View/studentSubmissions';

import createGrade from './Grades/createGrade';
import viewGrades from './Grades/viewGrades';

class Main extends Component
{
    render()
    {
        return(
            <div>
                {}
                <Route path = "/" component = {Navbar} />
                <Route path = "/login" component = {Login} />
                <Route path = "/home" component = {Home} />
                <Route path = "/create" component = {Create} />
                <Route path = "/profile" component = {Profile} />
                <Route path = "/createcourse" component = {CreateCourse} />

                <Route path = "/editName" component = {editName} />
                <Route path = "/editPhoneNumber" component = {editPhoneNumber} />
                <Route path = "/editAboutMe" component = {editAboutMe} />
                <Route path = "/editCity" component = {editCity} />
                <Route path = "/editCountry" component = {editCountry} />
                <Route path = "/editCompany" component = {editCompany} />
                <Route path = "/editSchool" component = {editSchool} />
                <Route path = "/editHometown" component = {editHometown} />
                <Route path = "/editLanguages" component = {editLanguages} />
                <Route path = "/editGender" component = {editGender} />
                <Route path = "/editProfileImage" component = {editProfileImage} />

                <Route path = "/searchclasses" component = {SearchClasses} />
                <Route path = "/searchByTerm" component = {searchByTerm} />
                <Route path = "/searchByName" component = {searchByName} />
                <Route path = "/searchByID" component = {searchByID} />

                <Route path = "/enrollClass" component = {enrollClass} />
                <Route path = "/dropClass" component = {dropClass} />
                <Route path = "/viewClasses" component = {viewClasses} />
                <Route path = "/viewFacultyCourses" component = {viewFacultyCourses} />

                <Route path = "/dropStudent" component = {dropStudent} />
                <Route path = "/allStudentsRegistered" component = {allStudentsRegistered} />
                <Route path = "/allOtherStudents" component = {allOtherStudents} />

                <Route path = "/createAnnouncement" component = {createAnnouncement} />
                <Route path = "/viewAnnouncement" component = {viewAnnouncement} />

                <Route path = "/lectureNotesAndFiles" component = {lectureNotesAndFiles} />
                <Route path = "/viewNotesAndFiles" component = {viewNotesAndFiles} />

                <Route path = "/createAssignment" component = {createAssignment} />

                <Route path = "/submitAssignment" component = {submitAssignment} />
            
                <Route path = "/studentSubmissions" component = {studentSubmissions} />
            
                <Route path = "/createGrade" component = {createGrade} />
                <Route path = "/viewGrades" component = {viewGrades} />
            </div>
        )
    }
}

export default Main;