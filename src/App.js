import React, {useEffect, useState, useReducer} from 'react'
import axios from 'axios'
import { Segment, Header, Form } from 'semantic-ui-react'

const App = () => {
  const [options, setOptions] = useState({});
  let unitFrom = 'EUR'
  let unitConv = 'USD'

  const [currency, dispatch] = useReducer((state, {type, payload}) => {
      let newState = {};
      switch (type){
        case 0:
            newState = {...state, [type]:payload}
          break;
        default:
            newState = {...state, [type]:payload}
          break;
      }
      console.log(newState)
      return newState
    }, {ref: '', dest: '', unitFrom : '', unitConv:''});

  const handleChange = (e, {value, name}) => {
    dispatch({
      type: name,
      payload: value
    });
  };

  useEffect(() => {
    fetchData(setOptions);
  }, []);

  return (
    <Segment style={{margin:'auto', maxWidth:'500px', marginTop:30}}>
      <Header size='medium' style={{marginBottom:0}}>
        {
          !!  currency.ref
          ?   `${currency.ref} ${unitFrom} entspricht`
          :   'Fill the fieds' //TODO: add more logic into this output message
        }
      </Header>
      <Header size='large' color={'blue'} style={{marginTop:0}}>
        { !!  currency.dest &&  `${currency.dest} ${unitConv}` }
      </Header>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input  name='ref' value={currency.ref} onChange={handleChange} />
          <Form.Select name='unitFrom' placeholder={'Currency Reference'} options={makeFormOpts(options)} onChange={handleChange} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input  name='dest' value={currency.dest} onChange={handleChange} />
          <Form.Select name='unitConv' placeholder={'Currency destiny'} options={makeFormOpts(options)} onChange={handleChange} />
        </Form.Group>
      </Form>
    </Segment>
  )
}

export default App

const makeFormOpts = (obj) => Object.keys(obj).map((value, i)=>({key:i, text:obj[value], value}))

const fetchData = async (how) => {
  const currencies = await axios(
    'https://openexchangerates.org/api/currencies.json',
  );
  how(currencies.data);
};

//https://api.exchangeratesapi.io/latest?symbols=USD,GBP