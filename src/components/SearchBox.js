import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SearchBox = ({history}) => {
    // const history=useHistory()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
          <Button type='submit' variant='outline-success' className='p-2' style={{
              backgroundColor:"white" ,color:"black",width:"40px"}}>
              <i className="fa fa-search mr-1" aria-hidden="true" style={{fontSize:"22px"}}></i>
      </Button>
    </Form>
  )
}

export default SearchBox