import { useSelector, useDispatch } from 'react-redux'
import faker from 'faker'
import _ from 'lodash'

import GridItem from './GridItem'
import { withRedux } from '../lib/redux'
import { AppStore } from '../lib/types'
import { members as slicer } from '../slicers'

const GridContainer = () => {
  const members = useSelector((state: AppStore) => state.members)
  const dispatch = useDispatch()

  const handleClick = () => {
    const fake = faker.fake("{{random.uuid}}|{{internet.avatar}}|{{internet.userName}}")
    const temp: [string, string][] =  _.zipWith(['id','avatar', 'name', 'clicked'], [ ...fake.split('|'), 0 ])
    const person = temp.reduce<{[key: string]: string|undefined}>((acc, [key, val]) => {
      acc[key] = val
      return acc
    }, {})
    dispatch(slicer.actions.addPerson(person))
  }

  return (
    <>
      <div className="relative w-full h-full">
        <div className="container">
          { members.map(person => <GridItem key={person.id} person={person}/>)}
        </div>
        <div className="absolute top-0 right-0 p-4">
          <button className="pb-1 w-12 h-12 bg-red-400 rounded-full leading-none text-gray-100 text-4xl text-center hover:bg-red-500" onClick={handleClick}>&#43;</button>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, 12rem);
          grid-template-rows: repeat(16rem);
        }
      `}</style>
    </>
  )
}

export default withRedux(GridContainer)
