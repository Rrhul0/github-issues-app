import React from 'react';
import ReactDOM from 'react-dom';
import Issues from './components/Issues';


// fetch('https://api.github.com/repos/ytdl-org/youtube-dl/issues').then(response => response.json()).then(jsonIssues => {

//     ReactDOM.render(
//         <IssuesApp issues = {jsonIssues}/>,
//         document.getElementById('root')
//     );
// })

ReactDOM.render(
    <Issues />,
    document.getElementById('root')
);