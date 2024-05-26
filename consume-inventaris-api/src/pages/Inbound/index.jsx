import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/case";


export default function Stuff() {
    const [inbounds, setInbounds] = useState([]);
    const [stuffs, setStuffs] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState([]);

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
        }
    })

    useEffect(() => {
        instance.get('inbound', {
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setInbounds(res.data.data);
        })
        .catch(err => {
            if(err.response.status === 401) {
                navigate('/login?massage=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, [navigate])

    const deleteInbound = (id) => {
        instance.delete(`/inbound-stuffs/delete/${id}`)
        .then(res => {
            location.reload()
        })
        .catch(err => {
            setError(err.response.data)
        })
    }
    return(
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Inbound Stuff</h5>
                        
                        <Link to="/inbound/create" className="px-4 py-2 mx-1 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                            Tambah
                            <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                        </Link>
                    </div>
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
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Total</th>
                                    <th scope="col" className="px-6 py-4">Date</th>
                                    <th scope="col" className="px-6 py-4">Photo</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {inbounds.map((inbound, id) => (
                                        <tr key={inbound.id} className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 px-4">{id+1}</td>
                                            <td className="whitespace-nowrap px-6 px-4">{inbound.stuff ? inbound.stuff.name : "0"}</td>
                                            <td className="whitespace-nowrap px-6 px-4">{inbound.total}</td>
                                            <td className="whitespace-nowrap px-6 px-4">{inbound.date}</td>
                                            <td className="whitespace-nowrap px-6 px-4">
                                                <img src={`{http://localhost:8000/proff/${inbound.proff_file}`} className="w-16 h-16 object-cover rounded" alt="" />
                                            </td>
                                            <td className="whitespace-nowrap px-6 px-4">
                                                <button type="button" onClick={() => deleteInbound(Inbound.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    )
}
