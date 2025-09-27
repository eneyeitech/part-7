import { useState, useEffect } from 'react'
import axios from 'axios'

// generic resource hook
export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // fetch all resources
  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setResources(response.data)
    })
  }, [baseUrl])

  // create a new resource
  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data))
    return response.data
  }

  // object with resource operations
  const service = {
    create
  }

  return [resources, service]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  // return all props except reset separately
  return {
    type, value, onChange
  }
}
