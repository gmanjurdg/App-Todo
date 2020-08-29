import React, { Fragment } from 'react';
import { Heading } from './Heading';
import { Employeelist } from './Employeelist';


export const Home = () => {
    React.useEffect(() => {
        fetch('https://gorest.co.in/public-api/posts')
          .then(results => results.json())
      }, []);
    return (
        <Fragment>
            <div className="App" >
                <div className="container mx-auto" style={{padding:"0rem 4rem 0rem 4rem"}}>
                    <h3 className="text-center  text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">TODO List</h3>
                    <Heading />
                    <Employeelist />
                </div>
            </div>
        </Fragment>
    )
}