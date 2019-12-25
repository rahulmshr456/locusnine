import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'
import { baseUrl } from '../config/baseUrl'
import { object, string, func } from 'prop-types'
import { toast } from 'react-toastify'

function UserForm (props) {
  const closeModal = props.closeModal
  const userId = props.data._id
  const [name, setName] = useState(props.data.name ? props.data.name : '')
  const [email, setEmail] = useState(props.data.email ? props.data.email : '')
  const [role, setRole] = useState(props.data.role ? props.data.role : 'admin')
  const [mobile, setMobile] = useState(props.data.mobile ? props.data.mobile : '')
  const action = props.action
  const handleChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value)
        break
      case 'email':
        setEmail(event.target.value)
        break
      case 'role':
        setRole(event.target.value)
        break
      case 'mobile':
        setMobile(event.target.value)
        break
      default:
        break
    }
  }

  const testEmail = (email) => {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g
    return re.test(String(email).toLowerCase())
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!testEmail(email)) {
      toast.error('Please provide a valid email')
      return
    }
    if (userId) {
      axios
        .put(
          `${baseUrl}user/${userId}`, { name, email, role, mobile }
        )
        .then((users) => {
          props.updateUser(users.data)
          closeModal()
          toast.success('User Updated Successfully')
        }).catch((e) => {
          toast.error(e)
        })
    } else {
      axios
        .post(
          `${baseUrl}user`, { name, email, role, mobile }
        )
        .then((users) => {
          props.addUser(users.data)
          closeModal()
          toast.success('User Added Successfully')
        }).catch((e) => {
          toast.error(e)
        })
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input type="text" name="name" id="name" value={name} onChange={handleChange} placeholder="Name" className="border-radius-0" />
      </FormGroup>
      <FormGroup>
        <Input type="email" name="email" id="email" value={email} onChange={handleChange} placeholder="Email" className="border-radius-0" />
      </FormGroup>
      <FormGroup check className='d-flex justify-content-between pb-3'>
        <Label check className="text-gray">
          <Input checked={role === 'admin'} type="radio" name="role" value="admin" onChange={handleChange} />{' '}
          Admin
        </Label>
        <Label check className="text-gray">
          <Input type="radio" checked={role === 'customer executive'} name="role" value="customer executive" onChange={handleChange} />{' '}
          Customer Executive
        </Label>
      </FormGroup>
      <FormGroup>
        <Input type="text" name="mobile" id="mobile" value={mobile} onChange={handleChange} placeholder="Mobile (Optional)" className="border-radius-0" />
      </FormGroup>
      <Button color="orange" className="text-white w-100">{action}</Button>
    </Form>
  )
}

UserForm.propTypes = {
  closeModal: func,
  action: string,
  data: object,
  addUser: func,
  updateUser: func
}

export default UserForm
