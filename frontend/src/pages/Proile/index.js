import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import "./styles.css";

import logoImg from '../../assets/logo.svg'
import logoImg1 from '../../assets/logo2.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const [hoverColor, setHoverColor] = useState('a8a8b3');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    function hoverChangeColor() {
        setHoverColor('#E02041');
    }

    function hoverReturnColor() {
        setHoverColor('a8a8b3');
    }

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente!')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img className='logoImg1' src={logoImg} alt="Be The Hero" />
                <img className='logoImg2' src={logoImg1} alt="Be The Hero" />
                <span>Welcome, {ongName}</span>

                <Link className="newIncident button" to="/incidents/new" />

                <button onClick={handleLogout} type="button">
                    <FiPower size={22} color="#E02041" />
                </button>
            </header>
            <h1>Current Incidents</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button" onMouseOver={hoverChangeColor} onMouseOut={hoverReturnColor}>
                            <FiTrash2 size={20} color={hoverColor} style={{ transition: "all .2s"}} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}