import React from 'react';
import './app.css';

class App extends React.Component {
    static propTypes = {};

    state = {
        componentA: false,
        componentB: false,
    };

    showA = () => {
        import(
            /* webpackChunkName: "ComponentA" */
            './ComponentA'
            ).then((module) => {
            this.setState({ componentA: module.default });
        });
    };

    showB = () => {
        import(
            /* webpackChunkName: "ComponentB" */
            './ComponentB'
            ).then((module) => {
            this.setState({ componentB: module.default });
        });
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
                <div>
                    <button
                        onClick={this.showA}
                        disabled={!!this.state.componentA}
                    >
                        Load ComponentA
                    </button>
                    <button
                        onClick={this.showB}
                        disabled={!!this.state.componentB}
                    >
                        Load ComponentB
                    </button>
                </div>
                <span>Span 1</span>
                <p>
                    <span>Span 2</span>
                </p>
                {a}
                {b}
            </div>
        );
    }
}

export default App
