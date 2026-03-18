import { useState } from "react"
import './App.css'

const WINNING_LINES  = [
  [0,1,2],[3,4,5],[6,7,8], //lignes
  [0,3,6],[1,4,7],[2,5,8], //colonnes
  [0,4,8],[2,4,6]          //diagonales
]

function getWinner(board){
  //Parcourir chaque ligne gagnante possible définie dans WINNING_LINES
  //Chaque ligne est un tableau de 3 indices [a,b,c] représentant les positions à vérifier.

  for (const [a,b,c] of WINNING_LINES) {
    //Vérifie si les trois conditios sont remplies pour une victoire
    // 1. board[a] n'est pas null
    // 2. board[a] === board[b] === board[c]
    if(board[a] && board[a]===board[b] && board[a]===board[c]) //Si les trois cases contiennent le même symbole
      return board[a] //On retourne le symbole gagnant

  }
  return null
}

export default function App(){
  
  //utilisation de useState pour le plateau pour déclancher un nouveau rendu à chaque changement.

  const [board,setBoard] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)

  const winner = getWinner(board)
  const isDraw = !winner && board.every(Boolean)

  function reset(){
    setBoard(Array(9).fill(null))
    setIsX(true)
  }

  function handleClick(i){
    //Vérificaiton case

    if(board[i] || winner)
      return
    //Est-ce qu'il y a un vainqueur?
    // Case sélectionné 
    // Joueur qui joue

    const newBoard = [...board] //copie du tableau pour le modifier
    newBoard[i]=isX?'X':'0'
    setBoard(newBoard)
    setIsX(!isX)
  }

  return (
    <div className="game">
      <h1>Morpion</h1>
      <p className="status">
        {winner ? 
        <span>Gagnant : <img className="status-img" src={winner==='X'?'/autobot.png':'/decepticon.png'}/></span>
        : isDraw? "Match Null !"
        :<span>Tour du joueur : <img className="status-img" src={isX?'/autobot.png':'/decepticon.png'}/></span>
        }
      </p>
      <div className="board">
        {board.map((cell,i)=>(
          <button key={i} className="cell" onClick={()=>handleClick(i)}>
            {cell && <img src={cell==='X'?'/autobot.png':'/decepticon.png'}/>}
          </button>
        ))}
      </div>
      <button className="reset" onClick={reset}>Rejouer</button>
    </div>
  )
}