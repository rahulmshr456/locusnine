
import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

function Header (props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color="black" dark={true} expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/component" >
              <img src="/assets/Logo.svg" alt="logo" />
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/" className="active d-flex">
                <img src="/assets/ico_dashboard.svg" alt="dashboard-logo" className="navbarImg mr-1" /> Dashboard</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/components/" className="activeLink d-flex">
                <img src="/assets/ico_user_active.svg" alt="users-logo" className="navbarImg mr-1" /> Users</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/components/" className="active d-flex">
                <img src="/assets/ico_sessionmanager.svg" alt="sessionmanager-logo" className="navbarImg mr-1" /> Session Manager</NavLink>
            </NavItem>

          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/" className="d-flex">
                <img src="/assets/ico_notification.svg" alt="notifications-logo" className="navbarImg" /> </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar className="active">
              <DropdownToggle nav className="active d-flex align-items-center">
                <img src="/assets/ico_user.svg" alt="users-logo" className="navbarImg mr-1" />   John Smith <img src="/assets/ico_downarrow.svg" className="ml-1" alt="arrow-down" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                                    Option 1
                </DropdownItem>
                <DropdownItem>
                                    Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                                    Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Header
