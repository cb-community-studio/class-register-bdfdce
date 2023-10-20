
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';


const ClassesDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.topic}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.title}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.lecturer}</p>
    const calendarTemplate3 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.date)} showTime ></Calendar>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.duration}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.price}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.details}</p>
    const checkboxTemplate7 = (rowData, { rowIndex }) => <Checkbox checked={rowData.validation}  ></Checkbox>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="topic" header="topic" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="title" header="title" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="lecturer" header="lecturer" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="date" header="date" body={calendarTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="duration" header="duration" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="price" header="price" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="details" header="details" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="validation" header="validation" body={checkboxTemplate7} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default ClassesDataTable;