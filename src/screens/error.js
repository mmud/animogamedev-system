import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Error() {
    const route = useNavigate();
    route("")
  return (
    <div>error</div>
  )
}
