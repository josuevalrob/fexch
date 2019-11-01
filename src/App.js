import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Segment, Header, Form } from 'semantic-ui-react'

const App = () => {
  const [options, setOptions] = useState([]);
  let exFrom = 'EUR'
  let exDest = 'USD'
  const [currency, setCurrencies] = useState({from : 'USD', dest:'GBP'})
  const [input, setInputs] = useState({from : '0', dest:'0'})
  const [rates, setRates] = useState({})

  const handleSelect = (e, {value, name}) => setCurrencies({...currency ,[name]:value})

  const handleInput = (e, {value, name}) => {
    const itsMe = name==='from'
    setInputs({
      [name]: value.replace(/\D/,''),
      [itsMe ? 'dest' : 'from'] : value.replace(/\D/,'') * rates[(itsMe? currency.dest : currency.from)]
    })
  }

  useEffect(() => {
    fetchData(setOptions);
  }, []);

  useEffect(() => {
    const {from, dest} = currency
    fetchCurrency(from, dest, setRates);
  }, [currency]);

  console.log(rates)
  return (
    <Segment style={{margin:'auto', maxWidth:'500px', marginTop:30}}>
      <Header size='medium' style={{marginBottom:0}}>
        {
          !!  input.from
          ?   `${input.from} ${exFrom} entspricht`
          :   'Fill the fieds' //TODO: add more logic into this output message
        }
      </Header>
      <Header size='large' color={'blue'} style={{marginTop:0}}>
        { !!  input.dest &&  `${input.dest} ${exDest}` }
      </Header>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input  name='from' value={input.from} onChange={handleInput} />
          <Form.Select name='from' value={currency.from} placeholder={'Currency Reference'} options={options} onChange={handleSelect} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input  name='dest' value={input.dest} onChange={handleInput} />
          <Form.Select name='dest' value={currency.dest} placeholder={'Currency destiny'} options={options} onChange={handleSelect} />
        </Form.Group>
      </Form>
    </Segment>
  )
}

export default App

const makeFormOpts = (obj) => Object.keys(obj).map((value, i)=>({key:i, text:obj[value], value}))

const fetchData = async (how) => {
  Promise.all([
    axios('https://openexchangerates.org/api/currencies.json'),
    axios('https://api.exchangeratesapi.io/latest')
  ])
  .then(([currencies, whatWeHave]) => {
    const trated = makeFormOpts(currencies.data).filter(o=>Object.keys(whatWeHave.data.rates).includes(o.value))
    how(trated);
  })

};

const fetchCurrency = async (from, dest, how)=>{
  const response = await axios(
    `https://api.exchangeratesapi.io/2019-10-31?symbols=${from},${dest}`
  );
  how(response.data.rates)
}