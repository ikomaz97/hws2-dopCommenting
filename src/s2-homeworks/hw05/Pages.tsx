import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Error404 from './pages/Error404'
import PreJunior from './pages/PreJunior'
import Junior from './pages/Junior'
import JuniorPlus from './pages/JuniorPlus'

export const PATH = {
    PRE_JUNIOR: '/pre-junior',
    JUNIOR: '/junior',
    JUNIOR_PLUS: '/junior-plus',
    PAGE_ERROR: 'Error404'
}

function Pages() {
    return (
        <div>
            {/*Routes выбирает первый подходящий роут*/}
            <Routes>
                {/*роутинг будут писать студенты*/}
                {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу /pre-junior*/}
                <Route path={PATH.PRE_JUNIOR} element={<PreJunior />} />

                {/*роуты для /pre-junior, /junior, /junior-plus*/}
                <Route path={PATH. PRE_JUNIOR} element={<PreJunior/>}/>
                <Route path={PATH.JUNIOR} element={<Junior/>}/>
                <Route path={PATH.JUNIOR_PLUS} element={<JuniorPlus/>}/>

                <Route path={"/*"} element={<Navigate to ={"/error404"}/>} />
                <Route path={PATH.PAGE_ERROR}element ={ <Error404/>}/>

                {/*роут для несуществующей страницы должен отрисовать <Error404 />*/}
                {/*<Route ...*/}
            </Routes>
        </div>
    )
}

export default Pages


// function Pages() {
//     return (
//         <div>
//             {/*Routes выбирает первый подходящий роут*/}
//             <Routes>
//                 {/*роутинг будут писать студенты*/}
//                 {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу /pre-junior*/}
//                 {/*<Route  path={'...'} element={<Navigate to={...} />}*/}
//
//                 {/*роуты для /pre-junior, /junior, /junior-plus*/}
//                 {/*<Route path={...} element={<PreJunior />}*/}
//                 {/*<Route ...*/}
//                 {/*<Route ...*/}
//
//                 {/*роут для несуществующей страницы должен отрисовать <Error404 />*/}
//                 {/*<Route ...*/}
//             </Routes>
//         </div>
//     )
// }