import styled from 'styled-components'

const StyledWrapper = styled.div`
    position: absolute;
    z-index: 9999;
    transition: all 100ms ease;
`

const StyledWizard = styled.div`
    width: 226px;
    min-height: 100px;
    background-color: white;
    padding: 10px;
    border: 1px solid #d9d9d9;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.15);
    transform: translate(22px, -50px);
    z-index: 2;
    position: relative;
`

const StyledCloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 10px;
    padding: 0;
    cursor: pointer;
    color: grey;
    border: 0;
    outline: none;
    background: transparent;
`

const StyledInfo = styled.div`
    display: flex;
    width: 87%;
    margin-bottom: 10px;
    align-items: center;
`

const StyledStepsCount = styled.div`
    width: 35%;
    font-size: 12px;
`

const StyledTitle = styled.div`
    margin-bottom: 8px;
    letter-spacing: normal;
    color: #000000;
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
`

const StyledDescription = styled.div`
    margin-bottom: 15px;
    color: #4d4d4d;
    font-size: 12px;
    line-height: 1.25px;
`

const StyledFooter = styled.div`
    padding: 10px 0 0;
    text-align: right;
`
const StyledPin = styled.div`
    position: absolute;
    z-index: 2;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #1787fc;
    box-shadow: 0 0 0 2px white;
    top: -7px;
    left: -7px;
`

const StyledLine = styled.div`
    height: 1px;
    width: 25px;
    top: 1px;
    position: absolute;
    z-index: 1;
    background: #1787fc;
`

const StyledStepButton = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 300;
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    padding: 0 16px;
    text-align: center;
    white-space: nowrap;
    user-select: none;
    border: 0;
    border-radius: 3px;
    outline: none;
    background-color: #0084ff;
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
`

export {
    StyledCloseButton,
    StyledDescription,
    StyledFooter,
    StyledInfo,
    StyledLine,
    StyledPin,
    StyledStepButton,
    StyledStepsCount,
    StyledTitle,
    StyledWizard,
    StyledWrapper,
}
