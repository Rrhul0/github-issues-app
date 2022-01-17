import { useState,useEffect } from "react"
import { formatDistanceToNowStrict,parseISO } from 'date-fns'
import './Issues-style.css'
import NextPages from "./NextPages"
import Loading from "./Loading"

function Issues(props){
    const [issues,setIssues] = useState([])
    const [pages,setPages] = useState({
        currentPage:1,
        lastPage: null,
    })

    useEffect(()=>{
            setIssues([])
            fetch(`https://api.github.com/repos/${props.owner}/${props.repo}/issues?page=${pages.currentPage}`)
            .then(resp => {
                const linkHeader = resp.headers.get('Link')
                // link header is a string 
                //so need to perse it to get next page and last
                const linkHeaderSplited = linkHeader.split('page=')
                let lastPage = linkHeaderSplited[2].split('>;')[0]
                
                setPages({
                    currentPage:pages.currentPage,
                    lastPage:pages.lastPage?pages.lastPage:lastPage,
                })
                return resp.json()
            })
            .then(json =>{if (json) setIssues(json)})
            },[props.owner, props.repo,pages.currentPage])

    function onClickPagesHandler(i){
        setPages({
            currentPage:i,
            lastPage:pages.lastPage
        })
    }

    const onlyIssues = issues.filter(entry => !entry['pull_request'])
    const issuesArray = onlyIssues.map(issue => {
        const createdAt = parseISO(issue.created_at)
        return(
        <li key={issue.number} className='issue'>
            <div className={`issue-state ${issue.state}`} >{issue.state}</div>
            <div className="issue-body">
                <h3><a href={issue.html_url}>{issue.title}</a></h3>
                <div>{'#'+issue.number+' opened '+formatDistanceToNowStrict(createdAt)+' ago by '}<a href={issue.user.html_url}>{issue.user.login}</a></div>
            </div>
        </li>)
    })
    return(
        <div>
            <div className='issues-container'>
                <div style={{height:'70px'}}></div>
                <ul className='issues'>
                    {issuesArray.length?issuesArray:<Loading/>}
                </ul>
            </div>
            <NextPages 
                pages = {pages}
                onClickPagesHandler = {onClickPagesHandler}
            />
        </div>
    )
    }


export default Issues