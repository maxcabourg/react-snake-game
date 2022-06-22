

export function initEmptyGrid(width, height) {
    return [...Array(height)].map(x=>Array(width).fill('blank'))
}

export function getRandomCoordinates(maxX, maxY) {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
    }
}

export function getSnakeHead(snake) {
    return snake[snake.length - 1]
}

export function getSnakeTail(snake) {
    return snake[0]
}

export function isCellSnake(grid, x, y) {
    return grid[y][x] === 'snake';
}