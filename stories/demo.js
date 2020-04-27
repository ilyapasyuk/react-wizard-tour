import React from 'react'
import Wizard from 'react-onboarding'
import styled from 'styled-components'

const ElementOne = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid red;
`

const ElementTwo = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid red;
    margin-left: 200px;
`

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
            <ElementOne id="elementIdOne" />
            <ElementTwo id="elementIdTwo" />
            <Wizard
                rule={rule}
                nextButtonTitle="Next click"
                prevButtonTitle="Prev click"
                isShow
            />
        </div>
    )
}

export default Demo
