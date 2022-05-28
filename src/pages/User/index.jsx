import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../account-overview.css';
import Actions from '../../components/Actions';
import api from '../../services/api';
import DATATABLE from '../../components/DataTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const userApiService = new api();
const columns = [
  {
    label: '#',
    field: 'num',
    sort: 'asc',
    width: 10
  },
  {
    label: 'Name',
    field: 'name',
    sort: 'asc',
    width: 300
  },
  {
    label: 'Email',
    field: 'email',
    sort: 'asc',
    width: 300
  },
  {
    label: 'Telephone',
    field: 'telephone',
    sort: 'asc',
    width: 300
  },
  {
    label: 'Address',
    field: 'address',
    sort: 'asc',
    width: 300
  },
  {
    label: 'Actions',
    field: 'action',
    sort: 'asc',
    width: 300
  }

];
export default function UsersList({ data }) {
  const [openForm, setOpenForm] = useState(0);
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telephone, setTelephone] = useState()
  const [address, setAdress] = useState('')
  const [list, setList] = useState([]);

  useEffect(async () => {
    loadTable();
  }, []);

  const setData = (user = null) => {
    setId(user?.id);
    setName(user?.name);
    setEmail(user?.email);
    setTelephone(user?.telephone);
    setAdress(user?.address)
    setOpenForm(3);
  }


  const notify = () => toast("user Saved!");
  const handleUserList = () => {
    setOpenForm(0)
  }
  const handleUsersForm = () => {
    setOpenForm(1)
  }
  const handleEdit = (user) => {
    setData(user)
    setOpenForm(3);

  }
  const handleView = (user) => {
    setData(user)
    setOpenForm(2)
  }

  const saveForm = async () => {

    const rowData = {
      id: id,
      name: name,
      email: email,
      password: password,
      telephone: telephone,
      address: address
    }

    let timer = setTimeout(() => {
      // hideAlertShow();
      clearTimeout(timer);
    }, 5 * 1000);

    let result = await userApiService.saveUser(rowData);
    if (result) {
      setData()
      notify();
      loadTable();
      setOpenForm(0);

    } else {
      //showMsg.error(createErrorMessage(result))
    }
    setTimeout(() => {
    }, 1000);
  }


  const updateForm = async () => {

    const rowData = {
      id: id,
      name: name,
      email: email,
      password: password,
      telephone: telephone,
      address: address
    }

    let timer = setTimeout(() => {
      // hideAlertShow();
      clearTimeout(timer);
    }, 5 * 1000);

    let result = await userApiService.getUserById(rowData);
    if (result) {
      setData()
      notify();
      loadTable();
      setOpenForm(0);

    } else {
      //showMsg.error(createErrorMessage(result))
    }
    setTimeout(() => {
    }, 1000);
  }


  const loadTable = async () => {
    let list = await userApiService.getUsers();
    let rows = [];
    if (list) {
      Object.values(list).map(l => {
        rows.push({
          num: l?.id,
          name: l?.name,
          email: l?.email,
          telephone: l?.telephone,
          address: l?.address,
          action: (<Actions value={l} handleView={handleView} handleEdit={handleEdit} handleDelete={handleView} />)
        });
      });
      setList({ columns: columns, rows: rows })
    }
  }
  const usersForm = () => {
    return (
      <div className='p-5'>
        <h3>Users</h3>
        <div className="container  p-5">
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Name:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setName(e.target.value)}
              required />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Email:</span>
            <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Password:</span>
            <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Telephone:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setTelephone(e.target.value)}
              required />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Address:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setAdress(e.target.value)}
              required />
          </div>
          <div className='row'>
            <div className='col-sm'><button onClick={saveForm} type="submit" className="btn btn-primary">Save</button>
              <button onClick={handleUserList} className="btn btn-warning">Back</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const editForm = () => {
    return (
      <div className='p-5'>
        <h3>Users</h3>
        <div className="container  p-5">
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Name:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Email:</span>
            <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Telephone:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setTelephone(e.target.value)}
              value={telephone}
              required />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Address:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setAdress(e.target.value)}
              value={address}
              required />
          </div>
          <div className='row'>
            <div className='col-sm'><button onClick={saveForm} type="submit" className="btn btn-primary">Save</button>
              <button onClick={handleUserList} className="btn btn-warning">Back</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const viewUsersForm = () => {
    return (
      <div classNameName='p-5'>
        <h3>Users</h3>
        <div classNameName="container  p-5">
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Name:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled={true}
              value={name} />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Email:</span>
            <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled={true}
              value={email} />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Telephone:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled={true}
              value={telephone} />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Address:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled={true}
              value={address} />
          </div>
          <button onClick={handleUserList} className="btn btn-warning">Back</button>
          <div classNameName='row'>
          </div>
        </div>
      </div>
    )
  }
  const userListForm = () => {
    return (
      <div className='container-fluid h-100 w-100 p-3 m-0'>
        <h4>Users</h4>
        <div className="row justify-content-md-left"><div className="col col-lg-2"> <button onClick={handleUsersForm} className="btn btn-success btn-sm float-left">Add User</button>
        </div>
        </div>
        <DATATABLE
          data={list} />
      </div>
    )
  }
  const start = () => {
    switch (openForm) {
      case 0:
        return userListForm();
      case 1:
        return usersForm();
      case 2:
        return viewUsersForm();
      case 3:
        return editForm();
      default:
        break;
    }
  }
  return start();
}