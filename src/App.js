import React from 'react'
import { Segment, Header, Form } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const App = () => {
  let unitFrom = 'EUR'
  let unitConv = 'USD'
  return (
    <Segment style={{margin:'auto', maxWidth:'500px', marginTop:30}}>
      <Header size='medium' style={{marginBottom:0}}>1.00  {unitFrom} entspricht</Header>
      <Header size='large' color={'blue'} style={{marginTop:0}}>0.99 {unitConv}</Header>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid />
          <Form.Select fluid options={options} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid />
          <Form.Select fluid options={options} />
        </Form.Group>
      </Form>
    </Segment>
  )
}

export default App