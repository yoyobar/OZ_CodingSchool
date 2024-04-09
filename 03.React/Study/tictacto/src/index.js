import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState } from 'react';

function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Board(props) {
    function renderSquare(i) {
        return <Square onClick={() => props.onClick(i)} value={props.squares[i]} />;
    }
    return (
        <div>
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}
function Game() {
    //state
    const [history, setHistory] = useState([
        {
            squares: Array(9).fill(null),
        },
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i) {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(newHistory.concat([{ squares: squares }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((x, move) => {
        const desc = move ? '단계 이동 : ' + move : '게임 시작지점으로 돌아감';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    let status;
    if (winner) {
        status = '승자: ' + winner;
    } else if (history.length === 10) {
        status = '무승부';
    } else {
        status = '다음 플레이어: ' + (xIsNext ? 'X' : 'O');
    }
    return (
        <div className='game'>
            <div className='game-board'>
                <Board onClick={(i) => handleClick(i)} squares={current.squares} />
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
