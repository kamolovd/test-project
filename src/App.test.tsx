import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "./App";

describe('App', () => {
    test('renders headline', () => {
        render(<App />);
        const headline = screen.getByText(/Интерфейс системы оценки/i);
        expect(headline).toBeInTheDocument();
    });
});