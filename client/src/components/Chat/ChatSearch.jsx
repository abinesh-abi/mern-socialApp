import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { postDataAPI } from '../../utils/fetchData'

function ChatSearch() {
    const [searchItems, setSearchItems] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [isSearch, setisSearch] = useState(false)


    const { auth } = useSelector((state) => state);
    function searchSubmit(e) {
        e.preventDefault()
        postDataAPI(`/user/search`,{name:searchInput},auth.token)
        .then(({data})=>{
            setisSearch(true)
            let users = data.users.filter(value=>value._id !== auth.user._id)
            setSearchItems(users)
        })
    }

    return (
        <div className="input-group">
                <form onSubmit={searchSubmit}>
                    <input type="text" className="form-control" placeholder="Search..." value={searchInput} onChange={e=>setSearchInput(e.target.value)} />
                    <div className="input-group-prepend position-relative">
                        <i id='close-search'
                         className="fa-sharp fa-solid fa-xmark position-absolute text-danger chat-search-close"
                         onClick={()=>{
                            setSearchInput('')
                        }}
                        ></i>
                        <button type='submit' className="input-group-text chat-search-button" ><i className="fa fa-search"></i></button>
                    </div>
                </form>
            </div>
    )
}

export default ChatSearch 


                