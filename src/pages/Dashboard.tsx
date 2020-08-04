import React, { useState, useEffect } from 'react';


export function Dashboard() {
    const [on, setOn] = useState(false);
    const [log, setLog] = useState([]);

    useEffect(() => {
        fetch("/status").then(res => res.json()).then((response) => {
            setOn(response.status == "on");
        });
        fetch("/log").then(res => res.json()).then((response) => {
            setLog(response);
        });
        setInterval(() => {
            fetch("/log").then(res => res.json()).then((response) => {
                setLog(response);
            });
        }, 5000);
    }, []);
    function changeOnOff(isOn) {
        setOn(isOn);
        fetch(isOn ? "/start" : "/shutdown").then(() => {});
    }

    return (
        <div>
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" checked={on} onChange={event => changeOnOff(event.target.checked)} id={"toggle"}/>
                <label className="custom-control-label" htmlFor={"toggle"}>{on ? "On" : "Off"}</label>
            </div>
            <ul className="list-group">
                {log.map(text => <li className="list-group-item" key={text}>{text}</li>)}
            </ul>
        </div>
    );
}