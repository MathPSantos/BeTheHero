import React, { useState } from 'react';
import { useFields } from '../../hooks/useFields';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import "./styles.css";

import logoImg from '../../assets/logo.svg'

export default function EditIncident({ location }) {
    const [fields, setFields] = useFields({ ...location.state.incident })

    const history = useHistory()

    const ongId = localStorage.getItem('ongId');

    async function handleEditIncident(e) {
        e.preventDefault();
        
        try {
            await api.put(`incidents/${fields.id}`, fields, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile')

        } catch (err) {
            alert(err)
        }
    }

    function updateFields({ target }) {
        setFields(target)
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Edit incident</h1>
                    <p>Descrie the incident in detail to find a hero to solve it!</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Return to home
                    </Link>
                </section>

                <form onSubmit={handleEditIncident}>
                    <input
                        name="title"
                        type="text"
                        placeholder="Incident title"
                        value={fields.title}
                        onChange={updateFields}
                        required
                    />
                    <textarea
                        name="description"
                        type="text"
                        placeholder="Description"
                        value={fields.description}
                        onChange={updateFields}
                        required
                    />
                    <input
                        name="value"
                        type="text"
                        placeholder="Value"
                        value={fields.value}
                        onChange={updateFields}
                        required
                    />

                    <button className="button" type="submit">
                        Edit incident
                    </button>
                </form>
            </div>
        </div>
    );
}