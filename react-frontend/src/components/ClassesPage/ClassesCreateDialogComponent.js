import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
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

const ClassesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            classID: _entity.classID,
            topic: _entity.topic,
            title: _entity.title,
            lecturer: _entity.lecturer,
            date: _entity.date,
            time: _entity.time,
            price: _entity.price,
            details: _entity.details,
        };

        setLoading(true);
        try {
            const result = await client.service("classes").create(_data);
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
    

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="classes-create-dialog-component">
            <div>
                <p className="m-0">classID:</p>
                <InputText className="w-full mb-3" value={_entity?.classID} onChange={(e) => setValByKey("classID", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">topic:</p>
                <InputText className="w-full mb-3" value={_entity?.topic} onChange={(e) => setValByKey("topic", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">title:</p>
                <InputText className="w-full mb-3" value={_entity?.title} onChange={(e) => setValByKey("title", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">lecturer:</p>
                <InputText className="w-full mb-3" value={_entity?.lecturer} onChange={(e) => setValByKey("lecturer", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">date:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.date} onChange={ (e) => setValByKey("date", e.target.value)} showTime ></Calendar>
            </div>
            <div>
                <p className="m-0">time:</p>
                <InputText className="w-full mb-3" value={_entity?.time} onChange={(e) => setValByKey("time", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">price:</p>
                <InputText type="number" className="w-full mb-3" value={_entity?.price} onChange={(e) => setValByKey("price", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">details:</p>
                <InputText className="w-full mb-3" value={_entity?.details} onChange={(e) => setValByKey("details", e.target.value)}  />
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

export default connect(null, mapDispatch)(ClassesCreateDialogComponent);
