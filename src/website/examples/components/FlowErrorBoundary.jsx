import { Component } from "react";

export default class FlowErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(`[ExamplesPage] flow render failed: ${this.props.flowId}`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-100">
          Este flujo no pudo renderizarse. Revisa la consola para diagnosticar el
          componente que falló.
        </div>
      );
    }

    return this.props.children;
  }
}
