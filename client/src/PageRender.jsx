import React from 'react'
import { useParams } from 'react-router-dom'
import Notfound from './components/Notfound'


const generatePage = pageName=>{
    const component = ()=> require( `./pages/${pageName}`).default
    try {
        return React.createElement(component())
    } catch (error) {
        return  <Notfound />
    }
}

function PageRender() {
    let {page,id} = useParams()
    let pageName =""
    if (id) {
        pageName = `${page}/${id}`
    }else{
        pageName = `${page}`
    }
    return generatePage(pageName)
//   return (
//     <div>
//         <h1>{page}</h1>
//         <h1>{id}</h1>
//         <h1>{pageName}</h1>
//     </div>
//   )
}

export default PageRender