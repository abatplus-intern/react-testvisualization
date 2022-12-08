import React, { Fragment, ReactNode } from 'react';
import { withSnackbar, WithSnackbarProps } from 'notistack';

interface ErrorBoundaryProps extends WithSnackbarProps {
    children: ReactNode | ReactNode[];
}

interface ErrorBoundaryState {
    error: Error | undefined;
}

/**
 * React error boundary based on documentation: https://reactjs.org/docs/error-boundaries.html
 * Displays errors as snackbar messages to the user.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: undefined };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidMount() {
        window.addEventListener('unhandledrejection', this.promiseRejectionHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.promiseRejectionHandler);
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.handleError(error, errorInfo);
    }

    render() {
        return <Fragment>{this.props.children}</Fragment>;
    }

    private handleError(error: Error, errorInfo: React.ErrorInfo) {
        this.props.enqueueSnackbar(error.message, {
            variant: 'error',
        });
        console.error(error, errorInfo.componentStack);
    }

    /**
     * Makes promise rejections available to the error boundaries error handling and display
     * mechanism.
     */
    private promiseRejectionHandler = (event: PromiseRejectionEvent) => {
        this.handleError(event.reason, {
            componentStack: '',
        });
    };
}

export default withSnackbar(ErrorBoundary);
