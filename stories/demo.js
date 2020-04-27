import React from 'react'
import Wizard from 'react-onboarding'

const rule = [
    {
        elementId: 'elementIdOne',
        title: 'Title 1',
        description: 'description 1',
    },
    {
        elementId: 'elementIdTwo',
        title: 'Title 2',
        description: 'description 2',
    },
]

const Demo = ({}) => {
    return (
        <div>
            <div id="elementIdOne"/>
            <div id="elementIdTwo"/>
            <Wizard rule={rule} nextButtonTitle="Next click" prevButtonTitle="Prev click" isShow/>
        </div>
    )
}

export default Demo
