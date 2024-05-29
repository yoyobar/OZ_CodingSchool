import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('카운트는 0부터 시작합니다.', () => {
    render(<App />);

    const counterElement = screen.getByTestId('counter');
    expect(counterElement).toHaveTextContent(0);
});
test('마이너스 버튼은 - 입니다.', () => {
    render(<App />);

    const buttonElement = screen.getByTestId('minus-button');
    expect(buttonElement).toHaveTextContent('-');
});
test('플러스 버튼은 + 입니다.', () => {
    render(<App />);

    const buttonElement = screen.getByTestId('plus-button');
    expect(buttonElement).toHaveTextContent('+');
});
test('- 버튼이 눌리면 카운트가 -1 됩니다.', () => {
    render(<App />);

    const buttonElement = screen.getByTestId('minus-button');
    fireEvent.click(buttonElement);
    const counterElement = screen.getByTestId('counter');
    expect(counterElement).toHaveTextContent(-1);
});
test('+ 버튼이 눌리면 카운트가 +1 됩니다.', () => {
    render(<App />);

    const buttonElement = screen.getByTestId('plus-button');
    fireEvent.click(buttonElement);
    const counterElement = screen.getByTestId('counter');
    expect(counterElement).toHaveTextContent(1);
});
test('On/Off 버튼은 bg-indigo-400 클래스를 가지고 있습니다.', () => {
    render(<App />);

    const buttonElement = screen.getByTestId('toggle-button');
    expect(buttonElement).toHaveClass(`bg-indigo-400`);
});
test('On/Off 버튼을 누를경우 +, - 버튼이 비활성화/활성화 됩니다.', () => {
    render(<App />);

    const buttonElement = screen.getByTestId('toggle-button');
    fireEvent.click(buttonElement);
    const plusButtonElement = screen.getByTestId('plus-button');
    expect(plusButtonElement).toBeDisabled();
    const minusButtonElement = screen.getByTestId('minus-button');
    expect(minusButtonElement).toBeDisabled();
});
