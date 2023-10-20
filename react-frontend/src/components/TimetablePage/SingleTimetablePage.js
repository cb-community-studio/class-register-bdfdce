import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleTimetablePage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [students, setstudents] = useState([]);
    const [courses, setcourses] = useState([]);
    const [sessions, setsessions] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("timetable")
            .get(urlParams.singleTimetableId, { query: { $populate: ["studentID","courseID","sessionID"] }})
            .then((res) => {
                set_entity(res || {});
                const students = Array.isArray(res.studentID)
            ? res.studentID.map((elem) => ({ _id: elem._id, StudentName: elem.StudentName }))
            : res.studentID
                ? [{ _id: res.studentID._id, StudentName: res.studentID.StudentName }]
                : [];
        setstudents(students);
                setstudents(res?.studentID?.map((elem) => ({ _id: elem._id, StudentName: elem.StudentName })) || []);
                const courses = Array.isArray(res.courseID)
            ? res.courseID.map((elem) => ({ _id: elem._id, title: elem.title }))
            : res.courseID
                ? [{ _id: res.courseID._id, title: res.courseID.title }]
                : [];
        setcourses(courses);
                setcourses(res?.courseID?.map((elem) => ({ _id: elem._id, title: elem.title })) || []);
                const sessions = Array.isArray(res.sessionID)
            ? res.sessionID.map((elem) => ({ _id: elem._id, courseID: elem.courseID }))
            : res.sessionID
                ? [{ _id: res.sessionID._id, courseID: res.sessionID.courseID }]
                : [];
        setsessions(sessions);
                setsessions(res?.sessionID?.map((elem) => ({ _id: elem._id, courseID: elem.courseID })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Timetable", type: "error", message: error.message || "Failed get timetable" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/timetable", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Timetable</h3>
                </div>
                <p>timetable/{urlParams.singleTimetableId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">studentID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.studentID}</p></div>
                    <label className="text-sm text-primary">courseID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.courseID}</p></div>
                    <label className="text-sm text-primary">sessionID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.sessionID}</p></div>
            <label className="text-sm">studentID</label>
            {students.map((elem) => (
                    <Link key={elem._id} to={`/students/${elem._id}`}>
                        <div className="card">
                            <p>{elem.StudentName}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">courseID</label>
            {courses.map((elem) => (
                    <Link key={elem._id} to={`/courses/${elem._id}`}>
                        <div className="card">
                            <p>{elem.title}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">sessionID</label>
            {sessions.map((elem) => (
                    <Link key={elem._id} to={`/sessions/${elem._id}`}>
                        <div className="card">
                            <p>{elem.courseID}</p>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleTimetablePage);
