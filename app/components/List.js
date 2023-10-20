import React from 'react'
import Button from "react-bootstrap/cjs/Button";


const List = ({mps, dataUser,  setEmailData,  setShowFindForm, setShowEmailForm, tweet}) => {

    const tweetText = `.${mps.twitter} ${tweet}`

    const click = e => {
        e.preventDefault()
        setEmailData({
            ...dataUser,
            ...mps
        })
        setShowEmailForm(false)
        setShowFindForm(true)
        
    }
    return (
        <div className={'buttonsContainer'}>
            <div className={'list-content-location'}>
                <div>
                    <h3 className='capitalize-style'> {mps.name} </h3>
                    <p>State: {mps.state ? mps.state : ' ---'}, Party:{mps.party ? mps.party: ' ---'}</p>
                </div>
            </div>
            <div className={'buttons'}>
                <div >
                    {
                        mps.twitter && mps.clientId?.plan !== 'basic'?
                        <Button
                        id="tweetList-button"
                            className='list-button'
                            size={'sm'}
                            variant={'dark'}
                            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                            target={"blank"}
                        >
                            Tweet
                        </Button> :
                        <p className='list-notweeter-text' >No Twitter</p>
                    }
                </div>
                <div >
                    {
                        mps.email ?
                            <Button
                            id="emailList-button"
                                className='list-button'
                                size={'sm'}
                                variant={'dark'}
                                target={"blank"}
                                onClick={click}
                            >
                                Email
                            </Button> :
                            <p className='list-notweeter-text'>No Email</p>
                    }
                </div>
                <div >
                    {
                        mps.phone  && mps.clientId?.plan !== 'basic' ?
                            <Button
                            id="callList-button"
                                className='list-button'
                                size={'sm'}
                                variant={'dark'}
                                href={`tel:${mps.phone}`}
                                target={"blank"}
                            >
                                Call
                            </Button> :
                            <p className='list-notweeter-text'>No Phone</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default List


