## React 자습서 TicTacTo 함수형 변환
![React](https://img.shields.io/badge/-REACT-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)<br>
리액트 자습서에 기술되어있는 클래스형 예문을 함수형으로 변경하는 개인 스터디입니다.<br>


<h2 style=color:purple> Function <span style=color:tomato>Board</span> </h2>

```javascript
//function:Board (컴포넌트)
function Board(props) {
    function renderSquare(i) {
        return <Square onClick={() => props.onClick(i)}value={props.squares[i]}/>;
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
```
```javascript
//function:game (전체 관할)
<Board onClick={(i) => handleClick(i)} squares={current.squares} />
```
부모요소에게서부터 클릭시 `i`를 매개변수로받는 함수 `handleClick`를 실행합니다.<br>
`handleClick`은 함수 실행이전의 기록을 배열로서 가지고, `선수교대`와 `상태유지`를 관리합니다.<br>
해당 값을 `renderSquare`에 변수로서 받아, 클릭시에는 `handleClick(i)`을 작동시키고, `props`로 전달 받은 `current` 변수의 값을 가지게 됩니다.

<h2 style=color:purple> Function <span style=color:tomato>Game</span> </h2>

```javascript
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
```
 - 상태유지로서 관리할 배열을 기록하는 `history`, 빈 배열을 9개 가지고 있습니다.
 - 돌아갈 번호를 기록하는 `stepNumber`, 0을 가지고 있습니다.
 - 다음 상대가 누구인지 가리키는 `xIsNext`, true를 가지고 있습니다.<br>

우선 아까전에 설명했던 `handleClick`에서 클릭시 발생하는 이벤트를 처리합니다.

1. `history`의 배열을 돌아갈 번호 기준으로 새로만든 `newHistory`가 할당됩니다.
2. 해당 `newHistory`의 인덱스를 기준으로하는 `current`가 할당됩니다.
3. 해당 `current`를 기준으로 자신의 번호를 기록하는 `square`가 할당됩니다.
4. 만약 승자가 나왔거나, 이미 할당되있는 번호의 경우 종료시킵니다.
4. 자신의 인덱스를 기준으로 다음 차례가 누구인지 나타냅니다.<br>
5. `history`에 돌아갈 번호 기준으로 만들었던 `newHistory`를 합칩니다.
6. `stepNumber`에 돌아갈 번호 기준으로 만들었던 `newHistory`의 인덱스를 할당합니다.
7. `xisNext`가 가리킨 상대방을 뒤집습니다. 이제 다음 상대의 차례입니다.<br>

`handleClick`함수가 종료됩니다.<br>

`jumpto` 함수가 선언됩니다. <br>
해당 함수는 `history`를 `Array.map`으로 순회하여 각각의 버튼에 할당됩니다.<br>
해당 함수는 `stepNumber`를 누른 버튼의 값으로 변경합니다.<br>
해당 함수는 `xIsNext`를 기준으로 다시 차례를 선택하게 합니다.<br>
 - `stepNumber`가 바뀌면 `handleClick`에서 인덱스가 변경되어 이전 배열로 값이 돌아갑니다.<br>

`if`문으로 승자를 결정합니다. <br>
- `history.length`가 10이 되어버리면 무승부로 끝나게 됩니다.
- `calculateWinner`함수에서 winner가 반환이 되면 승자를 적어줍니다.
- 2가지 모두가 아닐경우 다음차례를 적어줍니다.


이로서 모든 기능의 대한 설명이 끝났다. 지금은 전부 이해하진 못한 것 같지만 어떤 맥락으로<br>
흐름이 흘러가고, 진행되는지는 이해한 것 같다.
