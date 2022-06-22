
import './App.css';
import React, { useCallback, useState, useEffect } from 'react';
import { getRandomCoordinates, getSnakeHead, initEmptyGrid } from './util';
import { CELL_HEIGHT, CELL_WIDTH, GRID_HEIGHT, GRID_WIDTH, LEFT, UP, RIGHT, DOWN, MAX_SPEED } from './constants';

const initialState = {
  grid: initEmptyGrid(GRID_WIDTH, GRID_HEIGHT),
  snake: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}], // snake coordinates, array of [{x: number, y: number}]
  direction: 'right',
  food: getRandomCoordinates(GRID_WIDTH, GRID_HEIGHT),
  speed: 200,
  score: 0
}

function Game({ setIsGameOver }) {
    const [grid, setGrid] = useState(initialState.grid);
    const [snake, setSnake] = useState(initialState.snake);
    const [direction, setDirection] = useState(initialState.direction);
    const [food, setFood] = useState(initialState.food);
    const [speed, setSpeed] = useState(initialState.speed)
    const [score, setScore] = useState(initialState.score);
    const [hasChangedDirection, setHasChangedDirection] = useState(false)

    const isFoodEaten = useCallback(() => {
        const head = getSnakeHead(snake)
        return grid[head.y][head.x] === 'food'
    }, [grid, snake])

      const update = useCallback(() => {
        const newGrid = initEmptyGrid(GRID_WIDTH, GRID_HEIGHT);
        newGrid[food.y][food.x] = 'food';
        const snakeHead = getSnakeHead(snake);
        snake.forEach((snakeCell, index) => {
            newGrid[snakeCell.y][snakeCell.x] = 'snake';
        });
        newGrid[snakeHead.y][snakeHead.x] = 'snake-head';
        setGrid(newGrid)
        setHasChangedDirection(false)
    }, [food.x, food.y, snake])
    

    const loop = useCallback(() => {
        const head = getSnakeHead(snake)
        let newHeadPosition
        switch (direction) {
          case 'right':
            newHeadPosition = {x: head.x + 1, y: head.y}
          break;
          case 'left':
            newHeadPosition = {x: head.x - 1, y: head.y}
          break;
          case 'up':
            newHeadPosition = {x: head.x, y: head.y - 1}
          break;
          case 'down':
            newHeadPosition = {x: head.x, y: head.y + 1}
          break;
          default:
          break;
        }
        const copySnake = [...snake]
        copySnake.push(newHeadPosition)
        if (isFoodEaten()) {
          setScore(prevScore => prevScore + 10);
          setFood(getRandomCoordinates(GRID_WIDTH, GRID_HEIGHT))
          if (speed > MAX_SPEED) {
              incrementSpeed()
          }
        } else {
          copySnake.shift();
          if (isCollapsedBorder(copySnake) || isCollapsedBody(copySnake)) {
            setIsGameOver(true)
          }
        }  
        setSnake(copySnake)
        update()
      }, [snake, direction, isFoodEaten, setIsGameOver, update, speed])
  
  
    const setup = useCallback(() => {
      const interval = setInterval(loop, speed)
      
      return () => {
        clearInterval(interval)
      }
    }, [loop, speed])
  
    const isCollapsedBorder = (snake) => {
        const head = getSnakeHead(snake)
        return head.x >= GRID_WIDTH || head.x < 0 || head.y >= GRID_HEIGHT || head.y < 0
      }
  
    const isCollapsedBody = (snake) => {
        if (snake.length < 4) {
          return false;
        }
        const head = getSnakeHead(snake)
        for(let i = 0; i <= snake.length - 3; i++) {
          if (snake[i].x === head.x && snake[i].y === head.y) {
            return true
          }
        }
        return false
      }

    const incrementSpeed = () => {
      setSpeed(prevSpeed => prevSpeed - 10);
    }
  
    useEffect(() => {
      return setup()
    }, [snake, grid, direction, speed])
  
    useEffect(() => {
      const updateDirection = e => {
        if (hasChangedDirection) return;
        switch (e.key) {
          case LEFT:
            if (direction === 'up' || direction === 'down') {
              setDirection('left')
            }
          break;
          case RIGHT:
            if (direction === 'up' || direction === 'down') {
              setDirection('right')
            }
          break;
          case UP:
            if (direction === 'left' || direction === 'right') {
              setDirection('up')
            }
          break;
          case DOWN:
            if (direction === 'left' || direction === 'right') {
              setDirection('down')
            }
          break;
          default:
          break;
        }
        setHasChangedDirection(true)
      }
      document.addEventListener('keydown', updateDirection)
      return () => {
        document.removeEventListener('keydown', updateDirection)
      }
    }, [direction, setDirection, hasChangedDirection])
  
    
    return (
      <div className="game-container">
        <div className="grid" style={{width: `${GRID_WIDTH * CELL_WIDTH}px`, height: `${GRID_HEIGHT * CELL_HEIGHT}px`}}>  
          {grid && grid.map((row, y) => {
            return row.map((_, x) => (
              <div className={`cell ${grid[y][x]}`} key={`y${y}x${x}`} style={{width: `${CELL_WIDTH}px`, height: `${CELL_HEIGHT}px`}}></div>
            ))
          })}
        </div>
        <h1 style={{textAlign: 'center'}}>Score : {score}</h1>
      </div>
    );
}

export default Game