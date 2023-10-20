import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const SessionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [courses, setcourses] = useState([])
    const [lecturers, setlecturers] = useState([])

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            courseID: _entity.courseID,
            weekday: _entity.weekday,
            hours: _entity.hours,
            time: _entity.time,
            lecID: _entity.lecID,
        };

        setLoading(true);
        try {
            const result = await client.service("sessions").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };
     useEffect(() => {
                //on mount
                client
                    .service("courses")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setcourses(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Courses", type: "error", message: error.message || "Failed get courses" });
                    });
            }, []);
    useEffect(() => {
                //on mount
                client
                    .service("lecturers")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setlecturers(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Lecturers", type: "error", message: error.message || "Failed get lecturers" });
                    });
            }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    const coursesOptions = courses.map((elem) => ({ label: elem.title, value: elem._id }));
    const lecturersOptions = lecturers.map((elem) => ({ label: elem.lecName, value: elem._id }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="sessions-create-dialog-component">
            <div>
                <p className="m-0">courseID:</p>
                <Dropdown value={_entity?.courseID} options={coursesOptions} onChange={(e) => setValByKey("courseID", e.value)} />
            </div>
            <div>
                <p className="m-0">weekday:</p>
                <InputText className="w-full mb-3" value={_entity?.weekday} onChange={(e) => setValByKey("weekday", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">hours:</p>
                <InputText className="w-full mb-3" value={_entity?.hours} onChange={(e) => setValByKey("hours", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">FromTo:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.time} onChange={ (e) => setValByKey("time", e.target.value)} showTime ></Calendar>
            </div>
            <div>
                <p className="m-0">lecID:</p>
                <Dropdown value={_entity?.lecID} options={lecturersOptions} onChange={(e) => setValByKey("lecID", e.value)} />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(SessionsCreateDialogComponent);
