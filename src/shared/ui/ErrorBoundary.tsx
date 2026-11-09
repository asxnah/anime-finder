import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // Убрали ненужный аргумент _: Error
  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1f1f2d] text-white p-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-[#B399F3]">Oops! Something went wrong.</h1>
          <p className="text-[#9CA3AF] mb-8 max-w-md">
            The application encountered an unexpected error. Please try reloading the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#B399F3] text-[#1f1f2d] px-8 py-3 rounded-[16px] font-semibold hover:bg-[#A78BFA] transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
