import React from 'react';
import './app.css';

class App extends React.Component {
    static propTypes = {};

    state = {
        componentA: false,
        componentB: false,
    };

    showNext = () => {
        if (!this.state.componentA) {
            import(
                /* webpackChunkName: "ComponentA" */
                './ComponentA'
            ).then((module) => {
                this.setState({ componentA: module.default });
            });
        } else if (!this.state.componentB) {
            import(
                /* webpackChunkName: "ComponentB" */
                './ComponentB'
                ).then((module) => {
                this.setState({ componentB: module.default });
            });
        }
    };

    render() {
        let a = false;
        if (this.state.componentA) {
            const ComponentA = this.state.componentA;
            a = <ComponentA />;
        }

        let b = false;
        if (this.state.componentB) {
            const ComponentB = this.state.componentB;
            b = <ComponentB />
        }

        return (
            <div>
                <span>Span 1</span>
                <p>
                    <span>Span 2</span>
                </p>
                <button
                    onClick={this.showNext}
                    disabled={!!this.state.componentB}
                >
                    Show next
                </button>
                {a}
                {b}
            </div>
        );
    }
}

export default App
