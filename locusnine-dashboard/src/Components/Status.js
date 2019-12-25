import React from 'react'
import { string } from 'prop-types'

function Status (props) {
  const getStatus = () => {
    switch (props.status) {
      case 'inactive':
        return <><img src="/assets/ico_inactive.svg" alt="inactive" className="mr-1" /> Inactive</>

      case 'active':
        return <><img src="/assets/ico_active.svg" alt="active" className="mr-1" /> Active</>

      default:
        return <><img src="/assets/ico_pending.svg" alt="pending" className="mr-1" /> Pending </>
    }
  }
  return (
    <div className="d-flex justify-content-start">
      {getStatus()}
    </div>
  )
}

Status.propTypes = {
  status: string
}

export default Status
