import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


function Square(props) {
    return (<button className={props.winner !== -1 ? 'square winner' : 'square'} onClick={props.onClick}>
        {props.value}
    </button>);
}


class Board extends React.Component {
    renderSquare(i, winner = 0) {
        return (
            <Square
                value={this.props.squares[i]}
                key={i}
                winner={winner}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                {
                    [...Array(3).keys()].map(
                        (row) => {
                            return (<div className="board-row" key={row}>
                                {
                                    [...Array(3).keys()].map(
                                        (col) => {
                                            return this.renderSquare(
                                                row * 3 + col,
                                                this.props.winnerSquares.indexOf(row * 3 + col))
                                        }
                                    )
                                }
                            </div>);
                        }
                    )
                }
            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                coordinate: null
            }],
            stepNumber: 0,
            xIsNext: true,
            ascending: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const coordinate = {
            0: [0, 0],
            1: [0, 1],
            2: [0, 2],
            3: [1, 0],
            4: [1, 1],
            5: [1, 2],
            6: [2, 0],
            7: [2, 1],
            8: [2, 2]
        };

        if (Object.keys(calculateWinner(current.squares))[0] || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                coordinate: coordinate[i]
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const ascending = this.state.ascending;

        let showHistory = Object.assign([], history);
        showHistory = ascending ? showHistory : showHistory.reverse();

        let moves;
        moves = showHistory.map(
            (step, move) => {
                const position = ascending ? move : Object.keys(showHistory).length - move - 1;
                const positionBold = ascending ?
                    this.state.stepNumber : Object.keys(showHistory).length - this.state.stepNumber - 1;
                const desc = position ? 'Go to move #' + step.coordinate : 'Go to game start';
                if (move === positionBold) {
                    return (<li key={position}>
                        <button style={{fontWeight: "bold"}} onClick={() => this.jumpTo(position)}>{desc}</button>
                    </li>);
                } else {
                    return (<li key={position}>
                        <button onClick={() => this.jumpTo(position)}>{desc}</button>
                    </li>);
                }
            }
        );

        const olReverse = ascending ? <ol>{moves}</ol> : <ol reversed>{moves}</ol>

        let status;
        const winnerSign = Object.keys(winner)[0];
        let winnerSquares = [];
        console.log(this.state.stepNumber);
        if (winnerSign) {
            status = 'Winner: ' + winnerSign;
            winnerSquares = winner[winnerSign];
        } else if (this.state.stepNumber === 9){
            status = 'Draw'
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }

        let order;
        order = ascending ? 'Descending records' : 'Ascending records';

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winnerSquares={winnerSquares}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={
                        () => {
                            this.setState({ascending: !this.state.ascending});
                        }
                    }>{order}</button>
                    {olReverse}
                </div>
            </div>
        );
    }
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let result = {};
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            result[squares[a]] = [a, b, c];
            return result;
        }
    }
    return {};
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
