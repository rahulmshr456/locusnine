import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, InputGroup, Input, InputGroupAddon, InputGroupText, Button, Table, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { baseUrl } from '../config/baseUrl'
import axios from 'axios'
import { UserForm, Status } from './'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'

function List () {
  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState({ isOpen: false, title: 'Add User' })
  const [isLoading, setisLoaded] = useState(true)
  const [editIndex, setEditIndex] = useState()
  const toggle = (event, title = 'Add User', action = 'Save', data = {}) => {
    setModal({ isOpen: !modal.isOpen, title, action, data })
  }
  const closeModal = <img src="/assets/ico_close.svg" alt='close' onClick={toggle} />
  const addUser = (data) => {
    const users = userList
    users.push(data)
    setUserList(users)
  }
  const updateUser = (data) => {
    const users = userList
    users[editIndex] = data
    setUserList(users)
  }
  const editUser = (index) => {
    setEditIndex(index)
    toggle('', 'Edit User', 'Update', userList[index])
  }
  const deleteUser = (index) => {
    confirmAlert({
      title: 'Delete User',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const list = JSON.parse(JSON.stringify(userList))
            axios
              .delete(
                `${baseUrl}user/${list[index]._id}`
              )
              .then((users) => {
                list.splice(index, 1)
                setUserList(list)
                toast.success('User Deleted Successfully')
              }).catch((e) => {
                toast.error(e)
              })
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    })
  }
  const renderUserList = () => {
    const List = []
    userList.forEach((user, index) => {
      List.push(<tr key={index}>
        <td className='pl-md-5 pl-3'>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.mobile}</td>
        <td className="text-capitalize">{user.role}</td>
        <td><Status status={user.status} /></td>
        <td className="text-nowrap"><i className="fa fa-edit fa-lg" onClick={() => { editUser(index) }}></i> <i className="fa fa-trash fa-lg ml-1" onClick={() => { deleteUser(index) }}></i></td>
      </tr>)
    })
    return List
  }
  useEffect(() => {
    axios
      .get(
        baseUrl + 'users'
      )
      .then((users) => {
        setUserList(users.data)
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        setisLoaded(false)
      })
  }, [])

  return (
    <div className="p-4 bg-dark">
      <Card>
        <CardHeader className='d-flex align-items-center pl-md-5 pl-3 pr-2 justify-content-between'>
          <div className="d-flex">
            <img src="/assets/ico_users.svg" alt="users" />
            <h4 className="ml-2 mb-0 text-gray font-weight-normal">Users</h4>
          </div>
          <div className="d-flex">
            <InputGroup className="border-radius-0 d-none d-md-flex">
              <Input placeholder="Search" className="border-radius-0 border-right-0" />
              <InputGroupAddon addonType="append" className="border-radius-0 border-left-0">
                <InputGroupText className="bg-white border-left-0 border-radius-0 text-gray">
                  <img src="/assets/ico_search.svg" alt="search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Button color="orange" onClick={toggle} className="text-nowrap text-white ml-4 mr-2 border-radius-0 d-flex align-items-center">
              <img src="/assets/ico_add.svg" className="mr-1" alt="add" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-0 table-container">
          <Table>
            <thead>
              <tr>
                <th className="pl-md-5 pl-3">Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th className="text-nowrap">Role Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? <tr>
                <th scope="row" colSpan="5" className="text-center"><i className='fa fa-spinner fa-spin fa-2x'></i> </th>
              </tr> : (userList.length ? renderUserList()
                : <tr>
                  <th scope="row" colSpan="5" className="text-center">Sorry! No users found </th>
                </tr>)}

            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Modal isOpen={modal.isOpen} toggle={toggle} size="custom">
        <ModalHeader toggle={toggle} className='d-flex justify-content-between border-bottom-0 pb-0' close={closeModal}></ModalHeader>
        <ModalBody className="mx-4 py-0 mb-5" >
          <div>
            <h3 className="font-weight-normal mb-4">{modal.title}</h3>
            <UserForm data={modal.data} action={modal.action} closeModal={toggle} addUser={addUser} updateUser={updateUser} />
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default List
