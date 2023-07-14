import React from 'react'
import Button from 'react-bootstrap/esm/Button'

export const ListButton = ({list}) => {
  return (
    <Button>
        {list.title}
    </Button>
  )
}
