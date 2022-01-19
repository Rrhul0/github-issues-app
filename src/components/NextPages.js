import './NextPages-style.css'

export default function NextPages(props){
    const numberOfPages = Number(props.pages.lastPage)
    const currentPage = Number(props.pages.currentPage)

    function onClickHandler(e){
        props.onClickPagesHandler(e.target.textContent)
    }
    let buttons
    
    if (numberOfPages >9){
        let pagesToShow = [1,2]
        pagesToShow.push(currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2)
        pagesToShow.push(numberOfPages-1,numberOfPages)
        if (currentPage === 1) pagesToShow.push(3,4,5)
        else if (currentPage === numberOfPages) pagesToShow.push(numberOfPages-4,numberOfPages-3,numberOfPages-2)
        pagesToShow.sort((a,b) => a-b)
        const finalPagesToShow = pagesToShow.filter((value, index, self) => {
            return value>0 && self.indexOf(value) === index;
        })
        buttons = finalPagesToShow.map((pageNo,i,self) => {
            return(
                <>
                    {pageNo === self[i-1]+1?'':i?<span className='gap'>...</span>:''}
                    <button 
                        key={pageNo} 
                        className={currentPage===pageNo?'active':''}
                        onClick={props.onClickPage}
                    >
                        {pageNo}
                    </button>
                </>
            )
        })
    }
    return(
        <div className="next-pages" onClick={onClickHandler}>
            <button className={`text-btn ${currentPage===1?'disabled-btn':''}`}>Previous</button>
            {buttons}
            <button className={`text-btn ${currentPage===numberOfPages?'disabled-btn':''}`}>Next</button>
        </div>
    )
}