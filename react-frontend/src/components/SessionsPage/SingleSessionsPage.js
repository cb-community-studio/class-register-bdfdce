import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleSessionsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [courses, setcourses] = useState([]);
    const [lecturers, setlecturers] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("sessions")
            .get(urlParams.singleSessionsId, { query: { $populate: ["courseID","lecID"] }})
            .then((res) => {
                set_entity(res || {});
                const courses = Array.isArray(res.courseID)
            ? res.courseID.map((elem) => ({ _id: elem._id, title: elem.title }))
            : res.courseID
                ? [{ _id: res.courseID._id, title: res.courseID.title }]
                : [];
        setcourses(courses);
                setcourses(res?.courseID?.map((elem) => ({ _id: elem._id, title: elem.title })) || []);
                const lecturers = Array.isArray(res.lecID)
            ? res.lecID.map((elem) => ({ _id: elem._id, lecName: elem.lecName }))
            : res.lecID
                ? [{ _id: res.lecID._id, lecName: res.lecID.lecName }]
                : [];
        setlecturers(lecturers);
                setlecturers(res?.lecID?.map((elem) => ({ _id: elem._id, lecName: elem.lecName })) || []);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Sessions", type: "error", message: error.message || "Failed get sessions" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/sessions", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Sessions</h3>
                </div>
                <p>sessions/{urlParams.singleSessionsId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">courseID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.courseID}</p></div>
                    <label className="text-sm text-primary">weekday</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.weekday}</p></div>
                    <label className="text-sm text-primary">hours</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.hours}</p></div>
                    <label className="text-sm text-primary">FromTo</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.time}</p></div>
                    <label className="text-sm text-primary">lecID</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.lecID}</p></div>
            <label className="text-sm">courseID</label>
            {courses.map((elem) => (
                    <Link key={elem._id} to={`/courses/${elem._id}`}>
                        <div className="card">
                            <p>{elem.title}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">lecID</label>
            {lecturers.map((elem) => (
                    <Link key={elem._id} to={`/lecturers/${elem._id}`}>
                        <div className="card">
                            <p>{elem.lecName}</p>
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

export default connect(mapState, mapDispatch)(SingleSessionsPage);
