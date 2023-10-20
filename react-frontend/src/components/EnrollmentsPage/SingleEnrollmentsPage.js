import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleEnrollmentsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [students, setstudents] = useState([]);
    const [courses, setcourses] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("enrollments")
            .get(urlParams.singleEnrollmentsId, { query: { $populate: ["studentID","courseID"] }})
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
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Enrollments", type: "error", message: error.message || "Failed get enrollments" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/enrollments", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Enrollments</h3>
                </div>
                <p>enrollments/{urlParams.singleEnrollmentsId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">studentID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.studentID}</p></div>
                    <label className="text-sm text-primary">courseID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.courseID}</p></div>
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

export default connect(mapState, mapDispatch)(SingleEnrollmentsPage);
