// Type definitions for react-onboarding 1.2.1
// Project: https://github.com/ilyapasyuk/react-onboarding#readme
// Definitions by: ilyapasyuk <https://github.com/ilyapasyuk>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1

import * as React from 'react'

type Step = {
    elementId: string
    title: string
    description?: string
}

export interface ReactOnboardingProps {
    isShow?: boolean
    rule: Step[]
    prevButtonStyledTitle?: string
    nextButtonStyledTitle?: string
}

export default class ReactOnboarding extends React.Component<ReactOnboardingProps> {}
