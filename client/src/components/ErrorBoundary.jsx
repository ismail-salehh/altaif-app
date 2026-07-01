import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown error' };
  }

  componentDidCatch(error, info) {
    // In production you'd send this to Sentry / your logging service
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        dir="rtl"
        className="min-h-screen bg-gradient-to-br from-pink-100 to-teal-50 flex flex-col items-center justify-center gap-6 p-8 text-center"
      >
        <img src="/StoryLogo.png" alt="Logo" className="h-16 opacity-70" />
        <h1 className="text-3xl font-bold text-gray-800">حدث خطأ غير متوقع</h1>
        <p className="text-gray-500 max-w-sm">
          نأسف لذلك! يمكنك العودة للصفحة الرئيسية والمحاولة مرة أخرى.
        </p>
        {process.env.NODE_ENV !== 'production' && (
          <pre className="text-xs text-left text-red-500 bg-red-50 p-3 rounded-lg max-w-lg overflow-auto">
            {this.state.message}
          </pre>
        )}
        <div className="flex gap-4">
          <button
            onClick={() => this.setState({ hasError: false, message: '' })}
            className="bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600"
          >
            حاول مرة أخرى
          </button>
          <Link
            to="/"
            className="bg-white border border-emerald-500 text-emerald-600 px-6 py-2 rounded-full hover:bg-emerald-50"
          >
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }
}