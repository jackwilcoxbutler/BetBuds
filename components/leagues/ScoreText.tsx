import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import React from "react"

interface ScoreTextProps{
    score : number
}

export const ScoreText : React.FC<ScoreTextProps> = ({score} : ScoreTextProps) => {
    return(
        <>
            {score > 0 && 
            (<div className='flex flex-row justify-center align-middle items-center'>
                +{score}<ChevronUpIcon className=""/>
            </div>)}
            {score < 0 && 
            (<div className='flex flex-row justify-center align-middle items-center'>
                {score}<ChevronDownIcon/>
            </div>)}
            {score == 0 && (
                <div className='flex flex-row justify-center align-middle items-center'>
                {score}
              </div>
            )}
            
        </>
    )
}