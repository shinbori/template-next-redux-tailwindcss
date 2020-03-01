import { memo } from 'react'
import { Person } from '../lib/types'
import { useDispatch } from 'react-redux'
import { members as slice } from '../slicers'

type Props = {
  person: Person
}

const GridItem = ({ person }: Props) => {
  const dispatch = useDispatch()
  const handleClick = (() => {
    dispatch(slice.actions.updatePerson({
      ...person,
      clicked: person.clicked + 1
    }))
  })

  return (
    <div className="border p-2 m-2 w-40 text-center shadow-md hover:bg-gray-200" title="Click to plus counter" onClick={handleClick}>
      <div>{person.name}</div>
      <img className="border m-auto" src={person.avatar} alt={person.name}/>
      <div className="text-sm text-blue-600">{person.clicked}</div>
    </div>
  )
}

export default memo(GridItem)
