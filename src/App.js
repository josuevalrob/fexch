import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Segment, Header, Form } from 'semantic-ui-react'

const App = () => {
  const [options, setOptions] = useState({});
  let unitFrom = 'EUR'
  let unitConv = 'USD'

  useEffect(() => {
    const fetchData = async () => {
      const currencies = await axios(
        'https://openexchangerates.org/api/currencies.json',
      );
      setOptions(currencies.data);
    };
    fetchData();
  }, []);

  return (
    <Segment style={{margin:'auto', maxWidth:'500px', marginTop:30}}>
      <Header size='medium' style={{marginBottom:0}}>1.00  {unitFrom} entspricht</Header>
      <Header size='large' color={'blue'} style={{marginTop:0}}>0.99 {unitConv}</Header>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid />
          <Form.Select fluid placeholder={'Currency Reference'} options={makeFormOpts(options)} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid />
          <Form.Select fluid placeholder={'Currency destiny'} options={makeFormOpts(options)} />
        </Form.Group>
      </Form>
    </Segment>
  )
}

export default App

const makeFormOpts = (obj) => Object.keys(obj).map((value, i)=>({key:i, text:obj[value], value}))