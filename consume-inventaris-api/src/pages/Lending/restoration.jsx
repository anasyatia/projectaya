import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Case from "../../components/case";
import Swal from "sweetalert2";

export default function LendingReturn({data, onClose}) {
    const [forms, setForms] = useState({
        date_time: '',
        total_good_stuff: '',
        total_defect_stuff: ''
    })

    const lending = data

    const [error, setError] = useState([]);

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
        }
    })

    const handleReturnLend = (event) => {
        event.preventDefault();

        instance.post(`restoration/${data.id}`, forms)
           .then(res => {
                Swal.fire({
                    icon:'success',
                    title: 'Berhasil mengembalikan barang!',
                    showConfirmButton: false,
                    timer: 1500
                })
                onClose();
            })
           .catch(err => {
                setError(err.response.data.data)
                console.log(err.response)
            })
    }

    return (
        <div className="items-center m-5 mt-0 pb-10 pt-0">
            {
                Object.keys(error).length > 0 ? (
                    <div role="alert">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Gagal!
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <ul>
                                {
                                    Object.entries(error).map(([key, value], i) => (
                                    <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                ) : ''
            }

            {}

            
        </div>
    )
}