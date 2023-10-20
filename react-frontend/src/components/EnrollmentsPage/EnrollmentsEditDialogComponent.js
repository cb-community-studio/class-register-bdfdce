import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';



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

const EnrollmentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [students, setstudents] = useState([])
    const [courses, setcourses] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);
     useEffect(() => {
                //on mount
                client
                    .service("students")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setstudents(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Students", type: "error", message: error.message || "Failed get students" });
                    });
            }, []);
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
    const onSave = async () => {
        let _data = {
            studentID: _entity.studentID,
            courseID: _entity.courseID,
        };

        setLoading(true);
        try {
            const result = await client.service("enrollments").patch(_entity._id, _data);
            props.onHide();
            props.alert({ type: "success", title: "Edit info", message: "Info updated successfully" });
            props.onEditResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

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
    // children dropdown options
    const studentsOptions = students.map((elem) => ({ label: elem.StudentName, value: elem._id }));
    const coursesOptions = courses.map((elem) => ({ label: elem.title, value: elem._id }));

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="enrollments-edit-dialog-component">
                <div>
                <p className="m-0">studentID:</p>
                <Dropdown value={_entity?.studentID} options={studentsOptions} onChange={(e) => setValByKey("studentID", e.value)} />
            </div>
            <div>
                <p className="m-0">courseID:</p>
                <MultiSelect value={_entity?.courseID} options={coursesOptions} onChange={(e) => setValByKey("courseID", e.value)} />
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
    return{}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(EnrollmentsCreateDialogComponent);
