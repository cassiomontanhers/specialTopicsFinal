import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import uuidv4 from 'uuid/v4'

import { ADD_CAR, GET_CARS } from '../queries'

import { Button, TextField} from '@material-ui/core'

class AddCar extends Component {
  state = {
    year: '',
    make: '',
    model: '',
    price: '',
    ownerId: '',
  }

  render() {
    const { year, make, model, price, ownerId } = this.state
    const id = uuidv4()
    return (
      <Mutation
        mutation={ADD_CAR}
        update={(store, { data: { addCar } }) => {
          const { cars } = store.readQuery({ query: GET_CARS })
          store.writeQuery({
            query: GET_CARS,
            data: { cars: cars.concat([addCar])}
          })
        }}
      >
        {(addCar, { data, loading, error }) => (
          <form onSubmit={e => {
            e.preventDefault()
            addCar({
              variables: {
                id,
                year,
                make,
                model,
                price,
                ownerId
              },
              optimisticResponse: {
                __typename: 'Mutation',
                addCar: {
                  __typename: 'Car',
                  id,
                  year,
                  make,
                  model,
                  price,
                  ownerId
                }
              }
            })
          }}>
            <TextField
              label='Year'
              value={year}
              placeholder='i.e. 2002'
              onChange={e => this.setState({ year: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='Make'
              value={make}
              placeholder='i.e. Toyota'
              onChange={e => this.setState({ make: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='Model'
              value={model}
              placeholder='i.e. Supra'
              onChange={e => this.setState({ model: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='Price'
              value={price}
              placeholder='i.e. 20,000.00'
              onChange={e => this.setState({ price: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='ownerId'
              value={ownerId}
              placeholder='i.e. 2'
              onChange={e => this.setState({ ownerId: e.target.value })}
              margin='normal'
              varian='outlined'
              style={{ margin: '5px' }}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ margin: '5px' }}
            >
              Add Car
            </Button>
          </form>
        )}
      </Mutation>
    )
  }
}

export default AddCar
