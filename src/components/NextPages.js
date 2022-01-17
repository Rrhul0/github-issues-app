import './NextPages-style.css'

export default function NextPages(props){
    const numberOfPages = Number(props.pages.lastPage)
    function onClickHandler(e){
        props.onClickPagesHandler(e.target.textContent)
    }
    const buttons=[]
    for (let i=1;i<=numberOfPages;i++){
        buttons.push(<button key={i} className={`page-btn ${props.pages.currentPage===i.toString()?'active':''}`} onClick={props.onClickPage}>{i}</button>)
    }

    return(
        <div className="next-pages" onClick={onClickHandler}>
            <button className={`page-btn page-btn-txt ${props.pages.currentPage===1?'disabled-btn':''}`}>Previous</button>
            {buttons}
            <button className={`page-btn page-btn-txt ${props.pages.currentPage===props.pages.lastPage?'disabled-btn':''}`}>Next</button>
        </div>
    )
}