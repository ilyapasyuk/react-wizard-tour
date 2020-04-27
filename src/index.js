import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
    CloseButton,
    Description,
    Footer,
    Info,
    Line,
    Pin,
    StepButton,
    StepsCount,
    Title,
    WizardStyled,
} from './style.js'

import { POSITION } from './position.js'

const Wizard = ({ isShow, rule, prevButtonTitle, nextButtonTitle, position }) => {
    const [isShowState, setShow] = useState(isShow)
    const [transition, setTransition] = useState(null)
    const [coords, setCoords] = useState(undefined)
    const [currentStepNumber, setCurrentStepNumber] = useState(0)
    const currentStepContent = getStep(currentStepNumber, rule)

    const wrapperStyle = {
        position: 'absolute',
        zIndex: 99,
        transition: transition,
        ...coords,
    }

    useEffect(() => {
        setCoords(getCoords(getStep(currentStepNumber, rule).elementId))
    }, [rule])

    function onStepButtonClick(stepNumber) {
        setCurrentStepNumber(stepNumber)
        setCoords(getCoords(getStep(stepNumber, rule).elementId))
        setTransition('all 100ms ease')
    }

    if (!isShowState || !coords) {
        return null
    }

    return (
        <div style={wrapperStyle}>
            <WizardStyled>
                <CloseButton onClick={() => setShow(false)}>X</CloseButton>
                <Info>
                    <StepsCount>
                        {currentStepNumber + 1} of {rule.length}
                    </StepsCount>
                </Info>

                <Title dangerouslySetInnerHTML={{ __html: currentStepContent.title }} />
                <Description
                    dangerouslySetInnerHTML={{ __html: currentStepContent.description }}
                />

                <Footer>
                    {currentStepNumber !== 0 && (
                        <StepButton
                            onClick={() => onStepButtonClick(currentStepNumber - 1)}
                        >
                            {prevButtonTitle}
                        </StepButton>
                    )}

                    {currentStepNumber !== rule.length - 1 && (
                        <StepButton
                            onClick={() => onStepButtonClick(currentStepNumber + 1)}
                            disabled={currentStepNumber + 1 === rule.length}
                        >
                            {nextButtonTitle}
                        </StepButton>
                    )}
                </Footer>
            </WizardStyled>
            <Pin />
            <Line />
        </div>
    )
}

function getStep(stepNumber, rules) {
    return rules[stepNumber]
}

function getCoords(elementId) {
    const element = document.getElementById(elementId)
    const coordinates = element.getBoundingClientRect()

    return {
        top: coordinates.top + coordinates.height / 2,
        left: coordinates.left + coordinates.width,
    }
}

Wizard.propTypes = {
    isShow: PropTypes.bool,
    nextButtonTitle: PropTypes.string,
    position: PropTypes.string,
    prevButtonTitle: PropTypes.string,
    rule: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            elementId: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    ).isRequired,
}

Wizard.defaultProps = {
    isShow: true,
    nextButtonTitle: 'Next',
    position: POSITION.RIGHT,
    prevButtonTitle: 'Prev',
}

export default Wizard
