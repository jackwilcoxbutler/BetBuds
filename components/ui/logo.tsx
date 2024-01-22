interface logoProps{
    height : 64,
    weight : 64
}

export const TrophyLogo:React.FC<logoProps> = ({height, weight} : logoProps) =>{
    return(
        <div className={"h-" + height + " w-" + weight}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path fill="#E49A61" d="M51.999 58.003H28a2 2 0 0 0-2 2v4h27.999v-4a2 2 0 0 0-2-2z" /><path fill="#F1BB6B" d="M22 62.003h36v2H22z" /><path fill="#FDDC85" d="M31 58.003c.562-12.502-8-25.004-8-25.004h7.997S36.542 42.177 35 58.003h-4zM42.5 58.003C40.875 45.091 46 28.999 46 28.999H34.004s5.125 16.092 3.5 29.004H42.5zM44.999 58.003s-1.337-12.119 3.003-21.004h7.997c-7.997 9.76-7 21.004-7 21.004h-4z" /><path fill="#FFBD66" d="m40.002 15.997 1.971 3.996 4.409.641-3.19 3.109.754 4.392-3.944-2.074-3.944 2.074.753-4.392-3.19-3.109 4.409-.641z" /></svg>
            </div>
    )
}