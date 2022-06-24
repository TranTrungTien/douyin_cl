import { AxiosError } from "axios";
import React, { ReactNode } from "react";

class ErrorBoundary extends React.Component<{ fallback: ReactNode }> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error | AxiosError) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
