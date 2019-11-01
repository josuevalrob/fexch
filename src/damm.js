import React, {useEffect, useState, useReducer} from 'react'
import axios from 'axios'
import { Segment, Header, Form } from 'semantic-ui-react'

const App = () => {
  const [options, setOptions] = useState({});
  let unitFrom = 'EUR'
  let unitConv = 'USD'

  const [currency, dispatch] = useReducer(async (state, {type, payload}) => {
      let newState = {};
      let rates = {}
      switch (type){
        case 'ref':
            newState = {...state, payload}
          break;
        case 'dest':
            newState = {...state, payload}
          break;
        case 'unitFrom':
            rates = await fetchCurrency(state.unitConv, payload[type])
            newState = {...state, payload, rates}
          break;
        case 'unitConv':
            rates = await fetchCurrency(state.unitFrom, payload[type])
            newState = {...state, payload, rates}
          break;
        default:
            newState = {...state, [type]:payload}
          break;
      }
      console.log(newState)
      return newState
    }, {ref: '', dest: '', unitFrom : 'USD', unitConv:'GDP', rates:{}});

  const handleSelect = (e, {value, name}) => dispatch({
    type: name,
    payload: {[name]:value}
    });

  const handleInput = (e, {value, name}) => {
    dispatch({
      type: name === 'ref' ? 'destUpdate' :'refUpdate',
      payload: {[name]:value, name}
    })
  }

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
          <Form.Input  name='ref' value={currency.ref} onChange={handleInput} />
          <Form.Select name='unitFrom' placeholder={'Currency Reference'} options={makeFormOpts(options)} onChange={handleSelect} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input  name='dest' value={currency.dest} onChange={handleInput} />
          <Form.Select name='unitConv' placeholder={'Currency destiny'} options={makeFormOpts(options)} onChange={handleSelect} />
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

const fetchCurrency = async (cFrom, cDest)=>{
  const response = await axios(
    `https://api.exchangeratesapi.io/latest?symbols=${cFrom},${cDest}`
  );
  debugger
  return response.data
}