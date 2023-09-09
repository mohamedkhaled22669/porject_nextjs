import { cookies } from 'next/headers'


const GetCookies = ({name}) => {
  const cookiesStore = cookies()
  const token = cookiesStore.get(name)

  return token
}

export default GetCookies