import React from "react"

interface ScoreTextProps{
    score : number
}

export const ScoreText : React.FC<ScoreTextProps> = ({score} : ScoreTextProps) => {
    return(
        <>
            {score > 0 && 
            (<div className='flex flex-row justify-center align-middle items-center'>
                +{score}
            </div>)}
            {score < 0 && 
            (<div className='flex flex-row justify-center align-middle items-center'>
                {score}
            </div>)}
            {score == 0 && (
                <div className='flex flex-row justify-center align-middle items-center'>
                {score}
              </div>
            )}
            
        </>
    )
}